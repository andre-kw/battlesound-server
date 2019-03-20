const express = require('express');
const authService = require('../services/auth');
const authRouter = express.Router();

authRouter
  .post('/login', express.json(), (req, res, next) => {
    const { username, password } = req.body;
    const attemptedUser = { username, password };

    if(! attemptedUser.username || ! attemptedUser.password) {
      return res.status(400).json({error: 'Invalid login request'});
    }

    authService.getUserWithUsername(req.app.get('db'), attemptedUser.username)
      .then(dbUser => {
        if(! dbUser) {
          return res.status(400).json({error: 'Invalid login credentials'});
        }

        return authService.comparePasswords(attemptedUser.password, dbUser.password)
          .then(verdict => {
            if(! verdict) {
              return res.status(400).json({error: 'Invalid login credentials'});
            }

            const sub = dbUser.username;
            const payload = { user_id: dbUser.id };

            res.send({
              authToken: authService.createJwt(sub, payload)
            });
          });
      })
      .catch(next);
  });

module.exports = authRouter;