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
  ('What is your name', 'Juan' , 1),
  ('How old are you', 'I`m 21 years old.', 1),
  ('Who are you, really?', 'Oh, don`t ask!', 1),
  ('Is there a question that you can`t answer?', '', 1);
  ('What is your name', 'Juan' , 1),
  ('How old are you', 'I`m 21 years old.', 1),
  ('Who are you, really?', 'Oh, don`t ask!', 1),
  ('Is there a question that you can`t answer?', '', 1);
  ('What is your name', 'Juan' , 1),
  ('How old are you', 'I`m 21 years old.', 1),
  ('Who are you, really?', 'Oh, don`t ask!', 1),
  ('Is there a question that you can`t answer?', '', 1);
  ('What is your name', 'Juan' , 1),
  ('How old are you', 'I`m 21 years old.', 1),
  ('Who are you, really?', 'Oh, don`t ask!', 1),
  ('Is there a question that you can`t answer?', '', 1);
  ('What is your name', 'Juan' , 1),
  ('How old are you', 'I`m 21 years old.', 1),
  ('Who are you, really?', 'Oh, don`t ask!', 1),
  ('Is there a question that you can`t answer?', '', 1);
  ('What is your name', 'Juan' , 1),
  ('How old are you', 'I`m 21 years old.', 1),
  ('Who are you, really?', 'Oh, don`t ask!', 1),
  ('Is there a question that you can`t answer?', '', 1);

COMMIT;