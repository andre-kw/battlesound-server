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
        contestsService.getCountsForContests(req.app.get('db'), contests)
          .then(withCounts => {
            console.log(withCounts);
            let obj = contests.map(c => {
              let promise1 = withCounts[0].find(wc => wc.contest_id === c.id) || [];
              let promise2 = withCounts[1].find(wc => wc.contest_id === c.id) || [];
              c.count_subs = promise1.subs || 0;
              c.count_votes = promise2.votes || 0;
              return c;
            });

            res.json(obj);
          });
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
            contest[0].subs = subs;
            res.json(contest[0]);
          })
          .catch(err => { console.log(err); });
      })
      .catch(next);
  });

contestsRouter
  .use(express.json())
  .use(requireAuth)
  .route('/create')
  .post((req, res, next) => {
    contestsService.createContest(req.app.get('db'), req.body)
      .then(id => {
        return res.json({id});
      });
  });

module.exports = contestsRouter;