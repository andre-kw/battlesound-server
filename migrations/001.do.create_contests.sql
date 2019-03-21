CREATE TABLE contests (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  creator INTEGER NOT NULL,
  date_created TIMESTAMP DEFAULT now() NOT NULL,
  date_ending TIMESTAMP NOT NULL,
  max_submissions INTEGER NOT NULL,
  max_participants INTEGER NOT NULL,
  official BOOLEAN DEFAULT FALSE NOT NULL
);