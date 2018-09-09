// @flow strict

import express from 'express';
import { join } from 'path';
import page from './routes/page';
import compression from 'compression';

/**
 * Initialize Express app
 */
const app = express();

/**
 * Adds GZIP to express
 * For production, it's recommended to use a reverse proxy, see docs for details
 */
app.use(compression());
/**
 * Serves static assets from the public folder
 */
app.use('/static', express.static(join(__dirname, '..', 'public')));

/**
 * Example with mini app router for page
 */
app.use('/pages', page);

/**
 * Returns 404 message on routes that don't exist yet
 * Error handling middleware shuld always be placed last in the middleware chain
 */
app.use(function(err, req, res, next) {
  res.status(404).send('Sorry can\'t find that!');
  res.status(500).send('Something broke!');
  next();
});

/**
 * Gets home page with standard hello world
 */
app.get('/', (req, res) => res.send('Hello World!'));

/**
 * Example with query parameters
 */
app.get('/users/:userID', function(req, res) {
  res.send(req.params, 'yo');
});

/**
 * Example with multiple callbacks
 */
app.get(
  '/multiple',
  function(req, res, next) {
    next();
  },
  function(req, res) {
    res.send('Second callback');
  },
);

/**
 * Example with JSON response
 * Note: If you return a Javascript object it will automatically send it as an array
 */
app.get('/json', function(req, res) {
  const example = {
    data: 'yo',
  };

  res.json(example);
});

/**
 * Example with a template being rendered
 */

/**
 * Example with a download prompt
 */
app.get('/download', function(req, res) {
  res.download(join(__dirname, '..', 'public/portrait.jpg'));
});

/**
 * Example of a chainable route that does mutiple things
 */
app
  .route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });

/**
 * Example of a html response
 */
app.get('/html', function(req, res) {
  res.send('<h1>Hello world!</h1>');
});

/**
 * Starts the server on port 3000
 */

// eslint-disable-next-line
app.listen(3000, () => console.log('Listening on port 3000!'));
