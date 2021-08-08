const express = require('express');
const { resolve } = require('path');
const { promisify } = require('util');
const initMiddlewares = require('./middlewares');
const initControllers = require('./controllers');

const server = express();
const port = parseInt(process.env.PORT || '9000');
const publicDir = resolve('public');
const mouldsDir = resolve('src/moulds');

async function bootstrap() {
  // 静态资源
  server.use(express.static(publicDir));
  server.use('/moulds', express.static(mouldsDir));

  // 动态处理
  server.use(await initMiddlewares());
  server.use(express.json()); // for parsing application/json
  server.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  server.use(await initControllers());

  // 启动
  await promisify(server.listen.bind(server, port))();
  console.log(`===> Node started on port ${port}`);
}

// 监听未捕获的 Promise 异常，直接退出进程
process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

bootstrap();
