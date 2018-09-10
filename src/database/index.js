// @flow strict

import promise from 'bluebird';
import pgp from 'pg-promise';

/**
 * Set options object
 */
const options = {
  promiseLib: promise,
};

/**
 * Set configuration object
 */
const config = {
  host: 'localhost',
  port: 5432,
  database: 'journal',
  user: 'postgres',
};

/**
 * Pass configuration object into Postgres instance and connect to the database
 */
const db = pgp(options)(config);

export default db;
