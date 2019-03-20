const express = require('express');
const submissionsService = require('../services/submissions');
const submissionsRouter = express.Router();

submissionsRouter
  .route('/:contest_id')
  .get((req, res, next) => {
    submissionsService.getAllSubmissions(req.app.get('db'), req.params.contest_id)
      .then(subs => {
        res.json(subs);
      })
      .catch(next);
  });

module.exports = submissionsRouter;