const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [
    {
      id: 1,
      username: 'fakeacc1',
      password: 'password',
      sc_username: 'fake_soundclouduser1'
    },
    {
      id: 1,
      username: 'fakeacc1',
      password: 'password',
      sc_username: 'fake_soundclouduser1'
    },
  ];
}

function makeContestsArray(users) {
  return [
    {
      id: 1,
      title: 'fake contest 1',
      creator: users[0].id,
    },
    {
      id: 2,
      title: 'fake contest 2',
      creator: users[1].id,
    },
  ];
}

function makeContestSubmissionsArray(users, contests) {
  return [
    {
      id: 1,
      href: 'https://soundcloud.com/j-cole/middle-child',
      sc_username: 'J. Cole',
      sc_track_name: 'MIDDLE CHILD',
      sc_track_id: 239432,
      contest_id: contests[0].id,
      user_id: users[1].id
    }
  ];
}

function makeFixtures() {
  const testUsers = makeUsersArray();
  const testContests = makeContestsArray(testUsers);
  const testContestSubmissions = makeContestSubmissionsArray(testUsers, testContests);

  return { testUsers, testContests, testContestSubmissions };
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      users,
      contests,
      contest_submissions
      RESTART IDENTITY CASCADE`
  );
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))

  return db
    .into('users')
    .insert(preppedUsers)
}

function seedContestsTables(db, users, contests, subs=[]) {
  return seedUsers(db, users)
    .then(() =>
      db
        .into('contests')
        .insert(contests)
    )
    .then(() =>
      subs.length && db.into('contest_submissions').insert(subs)
    )
}


module.exports = {
  makeFixtures,
  cleanTables,
  seedUsers,
  seedContestsTables
};