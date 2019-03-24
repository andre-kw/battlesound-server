const xss = require('xss');

const contestsService = {
  getAllContests(db) {
    return db
      .from('contests')
      .select('*');
  },

  getContestById(db, contestId) {
    return db
      .from('contests')
      .select('*')
      .where('id', contestId);
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