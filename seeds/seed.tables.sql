BEGIN;

TRUNCATE
  contests,
  contest_submissions
  RESTART IDENTITY CASCADE;

INSERT INTO contests (title, creator, date_ending) VALUES
  ('Metro boomin official contest', 2, '2019-03-30 03:03:03'),
  ('House battle royale', 3, '2019-03-30 03:03:03'),
  ('Darude Sandstorm remix battle', 1, '2019-03-30 03:03:03');

INSERT INTO contest_submissions (user_id, contest_id, href) VALUES
  (5, 1, 'https://soundcloud.com/j-cole/middle-child'),
  (4, 3, 'https://soundcloud.com/offset-sc/how-did-i-get-here-feat-j-cole');

COMMIT;