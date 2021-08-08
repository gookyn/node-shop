const { Router } = require('express');

class LoginController {
  async init() {
    const router = Router();
    router.post('/', this.post);
    return router;
  }

  post = (req, res) => {
    req.session.logined = true;
    res.redirect('/');
  };
}

module.exports = async () => {
  const controller = new LoginController();
  return await controller.init();
};
