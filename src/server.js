const express = require('express');
const { resolve } = require('path');
const { promisify } = require('util');
const initControllers = require('./controllers');

const server = express();
const port = parseInt(process.env.PORT || '9000');
const publicDir = resolve('public');

async function bootstrap() {
  // 静态资源
  server.use(express.static(publicDir));

  // 动态数据
  server.use(await initControllers());

  // 启动
  await promisify(server.listen.bind(server, port))();
  console.log(`===> Node started on port ${port}`);
}

bootstrap();
