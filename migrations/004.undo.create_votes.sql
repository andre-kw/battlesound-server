ALTER TABLE submission_votes
  DROP COLUMN IF EXISTS user_id,
  DROP COLUMN IF EXISTS contest_id,
  DROP COLUMN IF EXISTS submission;

DROP TABLE IF EXISTS submission_votes;