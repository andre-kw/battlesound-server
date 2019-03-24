const express = require('express');
const xss = require('xss');
const isUrl = require('is-url');
const submissionsService = require('../services/submissions');
const submissionsRouter = express.Router();
const { requireAuth } = require('../middleware/jwt-auth');


submissionsRouter
  .use(express.json())
  .use(requireAuth)
  .route('/')
  .post((req, res, next) => {
    const url = xss(req.body.sc_url);
    const contestId = req.body.contest_id;
    const userId = req.body.user_id;

    if(isUrl(url)) {
      submissionsService.postSubmission(req.app.get('db'), url, contestId, userId)
        .then(response => {
          res.send(204);
        });
    } else {
      res.send(400);
    }
  });

module.exports = submissionsRouter;