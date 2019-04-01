const fetch = require('node-fetch');
const { SC_CLIENT_ID } = require('../config');

const submissionsService = {
  getAllSubmissions(db, contestId) {
    return db
      .from('contest_submissions')
      .select('*')
      .where('contest_id', contestId);
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

    /* db
      .from('submission_votes')
      .select('*')
      .where({contest_id, user_id})
      .then(hasVoted => {
        // make sure user hasn't voted before submitting a link
        if(! hasVoted[0]) {
          
        } else {
          return res.json({error: 'You cannot participate in a contest you\'ve voted in.'});
        }
      })
      .catch(next); */
  },
};

module.exports = submissionsService;