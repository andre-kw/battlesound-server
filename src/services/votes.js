const contestsService = require('./contests');

const votesService = {
  createVote(db, contest_id, user_id, submission_id) {
    return db('submission_votes')
      .insert({contest_id, user_id, submission_id});
  },
};

module.exports = votesService;