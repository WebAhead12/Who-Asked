BEGIN;

DROP TABLE IF EXISTS users, posts CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) NOT NULL,
  password VARCHAR(25) NOT NULL,
  imageId VARCHAR(10)
);

CREATE TABLE posts (
 id SERIAL PRIMARY KEY,
 question TEXT NOT NULL,
 answer TEXT, 
 user_id INTEGER REFERENCES users(id),
 date TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO users (username, password, imageId)  VALUES
  ('Julio', '123', '');

INSERT INTO posts (question, answer, user_id) VALUES
  ('(1) What is your name', 'Juan' , 1),
  ('(2) How old are you', 'I`m 21 years old.', 1),
  ('(3) Who are you, really?', 'Oh, don`t ask!', 1),
  ('(4) Is there a question that you can`t answer?', '', 1),
  ('(5) What is your name', 'Juan' , 1),
  ('(6) How old are you', 'I`m 21 years old.', 1),
  ('(7) Is there a question that you can`t answer?', '', 1),
  ('(8) Who are you, really?', 'Oh, don`t ask!', 1),
  ('(9) What is your name', 'Juan' , 1),
  ('(10) How old are you', 'I`m 21 years old.', 1),
  ('(11) Who are you, really?', 'Oh, don`t ask!', 1),
  ('(12) Is there a question that you can`t answer?', '', 1),
  ('(13) What is your name', 'Juan' , 1),
  ('(14) How old are you', 'I`m 21 years old.', 1),
  ('(15) Who are you, really?', 'Oh, don`t ask!', 1),
  ('(16) Is there a question that you can`t answer?', '', 1),
  ('(17) What is your name', 'Juan' , 1),
  ('(18) How old are you', 'I`m 21 years old.', 1),
  ('(19) Who are you, really?', 'Oh, don`t ask!', 1),
  ('(20) Is there a question that you can`t answer?', '', 1),
  ('(21) What is your name', 'Juan' , 1),
  ('(22) How old are you', 'I`m 21 years old.', 1),
  ('(23) Who are you, really?', 'Oh, don`t ask!', 1),
  ('(24) Is there a question that you can`t answer?', '', 1);

COMMIT;