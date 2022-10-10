-- id (unique, incrementing id)
-- author (string)
-- url (string that cannot be empty)
-- title (string that cannot be empty)
-- likes (integer with default value zero)


CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title) values ('Thomas Jones', 'http://www.roogle.com', 'Are you sure about that?');

INSERT INTO blogs (author, url, title) values ('Corb the Man', 'http://www.dingdingding.com', 'The Language of Trains');