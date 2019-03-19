const contestsService = {
  getAllContests(db) {
    return db
      .from('contests')
      .select('*');
  }
};

module.exports = contestsService;