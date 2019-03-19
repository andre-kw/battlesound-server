const express = require('express');
const contestsService = require('../services/contests');
const contestsRouter = express.Router();

contestsRouter
  .route('/')
  .get((req, res, next) => {
    contestsService.getAllContests(req.app.get('db'))
      .then(contests => {
        res.json(contests);
      })
      .catch(next);
  });

module.exports = contestsRouter;