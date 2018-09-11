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
 * Displays a form to create a new page
 * TODO: Replace with React.js
 * @param {Request} req
 * @param {Response} res
 */
export function getCreatePageForm(req: $Request, res: $Response) {
  /**
   * Displays the form if the res status was 200/good
   */
  res.status(200).send(`
    <form action="/pages/new" method="post">
      <div>
        <label>Name:</label>
        <input type="text" name="name" placeholder="Name your file"/><br/>
      </div>
      <div>
        <label>Content:</label>
        <textarea name="content" rows="40" cols="50"></textarea>
      </div>
      <div>
        <input type="submit" value="Submit"/>
      </div>
    </form>
  `);
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
  const { id } = req.params;

  db.none('UPDATE pages SET name=$1, content=$2 WHERE ID = $3', [
    req.body.name,
    req.body.content,
    id,
  ])
    .then(function sendResponse() {
      res.json({
        status: 'success',
        message: 'Updated page',
      });
    })
    .catch(function catchError(err) {
      return next(err);
    });
}

/**
 * Displays a form to update a page
 * TODO: Replace with React.js
 * @param {Request} req
 * @param {Response} res
 */
export function getUpdatePageForm(req: $Request, res: $Response) {
  /**
   * Gets the page's id from the URL
   * Example: /pages/1 has a req.params.id value of 1
   */
  const { id } = req.params;

  /**
   * Displays the form
   */
  res.status(200).send(`
    <form method="POST" action="/pages/edit/${id}?_method=PUT">
      <div>
        <label>Name:</label>
        <input type="text" name="name" placeholder="Name your file"/><br/>
      </div>
      <div>
        <label>Content:</label>
        <textarea name="content" rows="40" cols="50"></textarea>
      </div>
      <div>
        <input type="submit" value="Submit"/>
      </div>
    </form>
  `);
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

/**
 * Displays a delete page button
 * TODO: Replace this with React.js
 */
export function getDeletePageButton(req: $Request, res: $Response) {
  /**
   * Gets the page id
   */
  const id = parseInt(req.params.id);

  res.status(200).send(`
    <h1>Delete page ${id}?</h1>
    <form method="POST" action="/pages/delete/${id}?_method=DELETE">
      <input type="submit" value="Submit" />
    </form>
  `);
}
