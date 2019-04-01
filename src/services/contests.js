const xss = require('xss');

const contestsService = {
  getAllContests(db) {
    return db
      .from('contests')
      .orderBy('date_created', 'desc')
      .select('*');
  },

  getCountsForContests(db, contests) {
    let ids = contests.map(c => parseInt(c.id));

    return Promise.all([
      db
        .from('contest_submissions')
        .groupBy('contest_id')
        .select('contest_id')
        .count('id as subs'),
      db
        .from('submission_votes')
        .groupBy('contest_id')
        .select('contest_id')
        .count('id as votes')
    ]);
  },

  getContestById(db, contestId) {
    return db
      .from('contests')
      .select('*')
      .where('id', contestId);
  },

  getUserVotes(db, user_id) {
    return db
      .from('submission_votes')
      .select('*')
      .where({user_id});
  },

  createContest(db, data) {
    return db('contests')
      .insert({
        title: xss(data.title),
        creator: data.creator
      })
      .returning('id');
  },
};

module.exports = contestsService;