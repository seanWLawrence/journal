/* Create pages table */

CREATE TABLE pages (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  content VARCHAR
);

/* Insert one example page for testing */

INSERT INTO pages (name, content)
  VALUES ('test', 'Example text')