/* global supertest */
const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('/contests endpoint', () => {
  let db;

  const {
    testUsers,
    testContests,
    testContestSubmissions,
  } = helpers.makeFixtures();

  before('Make knex instance and truncate tables', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });

    app.set('db', db);
    helpers.cleanTables(db);
  });

  after('Disconnect from db', () => db.destroy());


  context('Given the database is populated', () => {
    beforeEach('Insert data', () => {
      helpers.seedContestsTable(
        db,
        testUsers,
        testContests,
        testContestSubmissions
      );
    });
  });

  it('GET /contests responds with 200 containing contest info', () => {
    return supertest(app)
      .get('/api/contests')
      .expect(200, 'Hello, world!');
  });
});