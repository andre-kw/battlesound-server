ALTER TABLE contest_submissions
  DROP COLUMN IF EXISTS user_id;

DROP TABLE IF EXISTS users;