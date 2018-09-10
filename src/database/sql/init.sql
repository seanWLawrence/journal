/* THIS WILL ONLY BE RUN ONE TIME TO CREATE THE JOURNAL DATABASE */

/* DELETE journal database if it already exists */
DROP DATABASE IF EXISTS journal;

/* CREATE new journal database */
CREATE DATABASE journal;

/* Connect to journal database */
\c journal;

/* Create pages table */

CREATE TABLE pages (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  content VARCHAR
);

/* Insert one example page for testing */

INSERT INTO pages (name, content)
  VALUES ('test', '# Hello, world!')