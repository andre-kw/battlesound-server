ALTER TABLE contest_submissions
  DROP COLUMN IF EXISTS contest_id;

DROP TABLE IF EXISTS contest_submissions;