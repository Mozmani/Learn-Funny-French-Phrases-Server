BEGIN;

TRUNCATE
  "word",
  "language",
  "user";

INSERT INTO "user" ("id", "username", "name", "password")
VALUES
  (
    1,
    'admin',
    'Dunder Mifflin Admin',
    -- password = "pass"
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
  );

INSERT INTO "language" ("id", "name", "user_id")
VALUES
  (1, 'French', 1);

INSERT INTO "word" ("id", "language_id", "original", "translation", "next")
VALUES
  (1, 1, 'Ah, la vache!', 'Oh, my cow', 2),
  (2, 1, 'Devenir chêvre', 'To become a goat', 3),
  (3, 1, 'Arrête ton char!', 'Stop your chariot', 4),
  (4, 1, 'Faire l’andouille', 'to make the sausage', 5),
  (5, 1, 'En avoir ras le bol', 'To have a bowl full of it', 6),
  (6, 1, 'Donner un coup de main', 'To give a knock of hand', 7),
  (7, 1, 'Être au taquet', 'To be a piece of wood', 8),
  (8, 1, 'Tomber dans les pommes', 'Fall in apples', null);

UPDATE "language" SET head = 1 WHERE id = 1;

-- because we explicitly set the id fields
-- update the sequencer for future automatic id setting
SELECT setval('word_id_seq', (SELECT MAX(id) from "word"));
SELECT setval('language_id_seq', (SELECT MAX(id) from "language"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));

COMMIT;
