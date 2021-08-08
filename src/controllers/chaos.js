const { Router } = require('express');

const ASYNC_MS = 800;

class ChaosController {
  async init() {
    const router = Router();

    router.get('/sync-error-handle', this.getSyncErrorHandle);
    router.get('/sync-error-throw', this.getSyncErrorThrow);
    router.get('/thunk-error-handle', this.getThunkErrorHandle);
    router.get('/thunk-error-throw', this.getThunkErrorThrow);
    router.get('/promise-error-handle', this.getPromiseErrorHandle);
    router.get('/promise-error-throw', this.getPromiseErrorThrow);

    return router;
  }

  // 结果：异常被捕获并处理
  getSyncErrorHandle = (req, res, next) => {
    next(new Error('Chaos test - sync error handle'));
  };

  // 结果：异常被捕获并处理
  getSyncErrorThrow = (req, res, next) => {
    next(new Error('Chaos test - sync error throw'));
  };

  // 结果：引起进程异常关闭
  getThunkErrorHandle = (req, res, next) => {
    setTimeout(() => {
      throw new Error('Chaos test - thunk error handle');
    }, ASYNC_MS);
  };

  // 结果：引起进程异常关闭
  getThunkErrorThrow = (req, res, next) => {
    setTimeout(() => {
      throw new Error('Chaos test - thunk error throw');
    }, ASYNC_MS);
  };

  // 结果：异常被捕获并处理
  getPromiseErrorHandle = async (req, res, next) => {
    await new Promise((r) => setTimeout(r, ASYNC_MS));
    next(new Error('Chaos test - promise error handle'));
  };

  // 结果：异常被捕获并处理
  getPromiseErrorThrow = async (req, res, next) => {
    await new Promise((r) => setTimeout(r, ASYNC_MS));
    next(new Error('Chaos test - promise error throw'));
  };
}

module.exports = async () => {
  const controller = new ChaosController();
  return await controller.init();
};
