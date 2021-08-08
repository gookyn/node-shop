const { Router } = require('express');

class HealthController {
  async init() {
    const router = Router();
    router.get('/', this.get);
    return router;
  }

  get = (req, res) => {
    res.send({});
  };
}

module.exports = async () => {
  const controller = new HealthController();
  return await controller.init();
};
