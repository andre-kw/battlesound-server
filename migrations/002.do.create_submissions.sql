CREATE TABLE contest_submissions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER, -- TODO: make this a foreign key
  href TEXT NOT NULL,
  date_created TIMESTAMP DEFAULT now() NOT NULL
);

 ALTER TABLE contest_submissions
  ADD COLUMN
    contest_id INTEGER REFERENCES contests(id)
    ON DELETE SET NULL;