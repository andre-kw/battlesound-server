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
    const contestId = xss(req.body.contest_id);

    if(isUrl(url)) {
      res.send(200);
    } else {
      res.send(400);
    }
  });

module.exports = submissionsRouter;