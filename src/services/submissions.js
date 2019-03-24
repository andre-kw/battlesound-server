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
      submissions.map(s => fetch(`http://api.soundcloud.com/resolve?url=${s.href}&client_id=${SC_CLIENT_ID}`).then(res => res.json()))
    )
      .then(tracks => {
        if(typeof tracks !== 'undefined') {
          return tracks;
        } else {
          return false;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },

  postSubmission(db, href, contest_id, user_id) {
    return fetch(`http://api.soundcloud.com/resolve?url=${href}&client_id=${SC_CLIENT_ID}`)
      .then(res => res.json())
      .then(track => {
        return db('contest_submissions')
          .insert({
            href,
            contest_id,
            user_id,
            sc_username: track.user.username,
            sc_track_name: track.title,
            sc_track_id: track.id
          });
      })
      .catch(err => { console.log(err); });
  },
};

module.exports = submissionsService;