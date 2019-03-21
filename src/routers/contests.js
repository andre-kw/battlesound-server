const express = require('express');
const contestsService = require('../services/contests');
const submissionsService = require('../services/submissions');
const { requireAuth } = require('../middleware/jwt-auth');
const contestsRouter = express.Router();

//contestsRouter.use(requireAuth);

contestsRouter
  .route('/')
  .get((req, res, next) => {
    contestsService.getAllContests(req.app.get('db'))
      .then(contests => {
        res.json(contests);
      })
      .catch(next);
  });

contestsRouter
  .route('/:contest_id')
  .get((req, res, next) => {
    // get contest
    contestsService.getContestById(req.app.get('db'), req.params.contest_id)
      .then(contest => {
        // append submissions
        submissionsService.getAllSubmissions(req.app.get('db'), req.params.contest_id)
          .then(subs => {
            // get data from soundcloud api
            submissionsService.getSoundCloudTracks(subs)
              .then(json => {
                // TODO: manually making this an array might be an issue in the future
                contest[0].subs = json ? json : [];
                res.json(contest[0]);
              })
              .catch(err => { console.log(err); });
          })
          .catch(err => { console.log(err); });
      })
      .catch(next);
  });

module.exports = contestsRouter;