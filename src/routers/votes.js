const express = require('express');
const votesService = require('../services/votes');
const contestsService = require('../services/contests');
const { requireAuth } = require('../middleware/jwt-auth');
const votesRouter = express.Router();

votesRouter
  .use(express.json())
  .use(requireAuth)
  .route('/:contest_id')
  .post((req, res, next) => {
    let db = req.app.get('db');

    contestsService.getContestById(db, req.body.contest_id)
      .then(contest => {
        // check if contest is active
        if(contest[0].status === 1) {
          return db
            .from('contest_submissions')
            .select('*')
            .where('user_id', req.body.user_id)
            .then(participants => {
              // check if voter is not participating
              let isParticipating = false;
              console.log(participants);

              participants.forEach(p => {
                if(p.user_id === req.body.user_id) 
                  isParticipating = true;
              });

              if(! isParticipating) {
                // check if voter hasn't voted before
                return db
                  .from('submission_votes')
                  .select('*')
                  .where('user_id', req.body.user_id)
                  .then(voter => {
                    console.log(voter);
                    if(voter.length === 0) {
                      votesService.createVote(req.app.get('db'), contest[0].id, req.body.user_id, req.body.submission_id)
                        .then(response => {
                          return res.json({success: true});
                        });                     
                    } else {
                      return res.json({error: 'You have already voted in this contest.'});
                    }
                  });
              } else {
                // can't vote when you are participating
                return res.json({error: 'You cannot vote in a contest you\'re participating in.'});
              }
            });
        } else {
          // contest is not active
          return res.json({error: 'This contest is not active.'});
        }
      });
  });

module.exports = votesRouter;