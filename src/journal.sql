DROP DATABASE IF EXISTS journal;
CREATE DATABASE journal;

\c journal;

CREATE TABLE pages (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  content VARCHAR
);

INSERT INTO pages (name, content)
  VALUES ('test', 'Eaxmple text')