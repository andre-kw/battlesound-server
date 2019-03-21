BEGIN;

TRUNCATE
  contests,
  users,
  contest_submissions
  RESTART IDENTITY CASCADE;

INSERT INTO contests (title, creator, date_ending) VALUES
  ('Metro boomin official contest', 2, '2019-03-30 03:03:03'),
  ('House battle royale', 3, '2019-03-30 03:03:03'),
  ('Darude Sandstorm remix battle', 1, '2019-03-30 03:03:03');

INSERT INTO users (username, password, sc_username, acc_type) VALUES
  ('offset', '$2a$12$lHK6LVpc15/ZROZcKU00QeiD.RyYq5dVlV/9m4kKYbGibkRc5l4Ne', 'offset-sc', 1),
  ('coleworld', '$2a$12$lHK6LVpc15/ZROZcKU00QeiD.RyYq5dVlV/9m4kKYbGibkRc5l4Ne', 'jcole', 1),
  ('andre', '$2a$12$lHK6LVpc15/ZROZcKU00QeiD.RyYq5dVlV/9m4kKYbGibkRc5l4Ne', 'adonis.will', 1),
  ('yk_osiris', '$2a$12$lHK6LVpc15/ZROZcKU00QeiD.RyYq5dVlV/9m4kKYbGibkRc5l4Ne', 'yk-osiris', 1),
  ('lilbaby', '$2a$12$lHK6LVpc15/ZROZcKU00QeiD.RyYq5dVlV/9m4kKYbGibkRc5l4Ne', 'lil-baby-4pf', 1);

INSERT INTO contest_submissions (user_id, contest_id, href) VALUES
  (2, 1, 'https://soundcloud.com/j-cole/middle-child'),
  (4, 1, 'https://soundcloud.com/yk-osiris/worth-it'),
  (5, 1, 'https://soundcloud.com/lil-baby-4pf/close-friends'),
  (1, 3, 'https://soundcloud.com/offset-sc/how-did-i-get-here-feat-j-cole');

COMMIT;