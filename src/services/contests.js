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
};

module.exports = contestsService;