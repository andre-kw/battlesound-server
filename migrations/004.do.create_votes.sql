CREATE TABLE submission_votes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  contest_id INTEGER REFERENCES contests(id) ON DELETE CASCADE,
  submission INTEGER REFERENCES contest_submissions(id) ON DELETE CASCADE
);