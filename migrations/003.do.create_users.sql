CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  sc_username TEXT,
  acc_type INTEGER DEFAULT 1 NOT NULL,
  date_created TIMESTAMP DEFAULT now() NOT NULL 
);

ALTER TABLE contest_submissions
  ADD COLUMN
    user_id INTEGER REFERENCES users(id)
    ON DELETE SET NULL;