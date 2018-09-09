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
 * Pass configuration object int Postgres instance
 */
const db = pgp(options)(config);

/**
 * Creates a single page
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export function createPage(req, res, next) {}

/**
 * Gets a page using the ID from the URL parameter
 */
export function readPage(req, res, next) {
  /**
   * Gets ID from the URL params
   * @const id
   * @type {number}
   */
  const id = parseInt(req.params.id);

  /**
   * Queries the pages table for the page with the ID from the request parameter
   */
  db.one('SELECT * from pages WHERE ID = $1', [id])
    .then(function sendData(data) {
      res.status(200).json({
        status: 'success',
        data,
        message: `Retrieved page ${id}`,
      });
    })
    .catch(function catchError(err) {
      return next(err);
    });
}

/**
 * Gets all pages from the database
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export function readAllPages(req, res, next) {
  /**
   * Query the database and get all pages
   */
  db.any('SELECT * from pages')
    .then(function sendData(data) {
      res.status(200).json({
        status: 'Success',
        data,
        message: 'Retrieved all pages',
      });
    })
    .catch(function catchError(err) {
      return next(err);
    });
}

export function updatePage() {}
export function deletePage() {}
