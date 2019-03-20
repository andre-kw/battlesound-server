const fetch = require('node-fetch');
const { SC_CLIENT_ID } = require('../config');

const submissionsService = {
  getAllSubmissions(db, contestId) {
    return db
      .from('contest_submissions')
      .select('*')
      .where('contest_id', contestId);
  },

  getSoundCloudTracks(submissions) {
    return Promise.all(
      submissions.map(s => fetch(`http://api.soundcloud.com/resolve?url=${s.href}&client_id=${SC_CLIENT_ID}`))
    )
      .then(([tracks]) => tracks.json());

    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(submissions);
    //   }, 100);
    // }); 
  },
};

module.exports = submissionsService;