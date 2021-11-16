BEGIN;

DROP TABLE IF EXISTS users, posts CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) NOT NULL,
  password VARCHAR(25) NOT NULL,
  imageId VARCHAR(10), 
);

CREATE TABLE posts (
 id SERIAL PRIMARY KEY,
 question TEXT NOT NULL,
 answer TEXT, 
 date DATE NOT NULL 
 user_id INTEGER REFERENCES users(id),
);

INSERT INTO users (username, password, imageId)  VALUES
  ('notJulio', '123', "")
;

INSERT INTO posts (question, answer, date, user_id) VALUES
  ('What is your name', 'Juan',  , 1),
  ('How old are you', 1),
  ('Who are you, really?', 1)


COMMIT;