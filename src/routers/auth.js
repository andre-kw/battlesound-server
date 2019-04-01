const express = require('express');
const authService = require('../services/auth');
const { requireAuth } = require('../middleware/basic-auth');
const authRouter = express.Router();

authRouter
  .use(express.json())
  .post('/register', (req, res, next) => {
    authService.createUser(req.app.get('db'), req.body)
      .then(response => {
        return res.send(204);
      })
      .catch(next);
  });

authRouter
  .use(express.json())
  .use(requireAuth)
  .post('/login', (req, res, next) => {
    const sub = req.user.username;
    const payload = { user_id: req.user.id };

    res.send({
      authToken: authService.createJwt(sub, payload),
      id: req.user.id,
      username: req.user.username
    });
  });

module.exports = authRouter;