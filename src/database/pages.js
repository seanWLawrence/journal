// @flow strict

import MarkdownIt from 'markdown-it';

import db from './index';

import type { $Request, $Response, NextFunction } from 'express';

/**
 * Creates a single page
 * @param {$Request} req
 * @param {$Response} res
 * @param {NextFunction} next
 */
export function createPage(req: $Request, res: $Response, next: NextFunction) {
  /**
   * Creates a new page in the database
   */
  db.none(
    'INSERT into pages (name, content) VALUES (${name}, ${content})',
    req.body,
  )
    .then(function sendResponse() {
      res.status(200).json({
        status: 'Success',
        message: 'Inserted one page',
      });
    })
    .catch(function catchError(err) {
      return next(err);
    });
}

/**
 * Gets a page using the ID from the URL parameter
 */
export function readPage(req: $Request, res: $Response, next: NextFunction) {
  /**
   * Gets ID from the URL params
   * @const id
   * @type {number}
   */
  const id = parseInt(req.params.id);

  /**
   * Gets the format from the URL
   * Example:
   * /pages/1&format=html
   * /pages/1&format=markdown
   * /pages/1 or /pages/1&format=json
   */
  const format = req.query.format;

  const markdown: MarkdownIt = new MarkdownIt();

  /**
   * Queries the pages table for the page with the ID from the request parameter
   */
  db.one('SELECT * from pages WHERE ID = $1', id)
    .then(function sendData(data) {
      /**
       * Changes the output based on the query
       * Example:
       * /pages/1&format=html
       * /pages/1 or /pages/1&format=json
       */
      switch (format) {
        case 'html':
          res.json({
            status: 'success',
            data: markdown.render(data.content),
            message: `Retrieved page ${id}`,
          });
          break;
        default:
          res.json({
            status: 'success',
            data,
            message: `Retrieved page ${id}`,
          });
          break;
      }
    })
    .catch(function catchError(err) {
      return next(err);
    });
}

/**
 * Gets all pages from the database
 * @param {$Request} req
 * @param {$Response} res
 * @param {NextFunction} next
 */
export function readAllPages(
  req: $Request,
  res: $Response,
  next: NextFunction,
) {
  /**
   * Query the database and get all pages
   */
  db.any('SELECT * from pages')
    .then(function sendData(data) {
      res.json({
        status: 'Success',
        data,
        message: 'Retrieved all pages',
      });
    })
    .catch(function catchError(err) {
      return next(err);
    });
}

/**
 * Updates a page in the database
 */
export function updatePage(req: $Request, res: $Response, next: NextFunction) {
  /**
   * Destructures the params for more concise database query
   */
  const {
    params: { id },
  } = req;

  db.none('UPDATE pages SET name=$1, content=$2 WHERE ID = $3', [
    req.params.name,
    req.params.content,
    id,
  ])
    .then(function send$Response() {
      res.status(200).json({
        status: 'success',
        message: 'Updated page',
      });
    })
    .catch(function catchError(err) {
      return next(err);
    });
}

/**
 * Deletes a page
 */
export function deletePage(req: $Request, res: $Response, next: NextFunction) {
  /**
   * Gets the page id
   */
  const id = parseInt(req.params.id);

  /**
   * Deletes the page with the specified ID  from the database
   */
  db.result('DELETE from pages WHERE ID = $1', id)
    .then(function sendResult(result) {
      res.status(200).json({
        status: 'success',
        message: `Removed ${result.rowCount} page`,
      });
    })
    .catch(function catchError(err) {
      return next(err);
    });
}
