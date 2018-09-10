// @flow strict

import express from 'express';
import { join } from 'path';
import pages from './routes/pages';
import compression from 'compression';

import type { $Application, Middleware } from 'express';

/**
 * Initialize Express app
 */
const app: $Application = express();

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
app.use('/pages', pages);

/**
 * Returns 404 message on routes that don't exist yet
 * Error handling middleware shuld always be placed last in the middleware chain
 */
const errorHandler: Middleware = (
  err: Error,
  req: express$Request,
  res: express$Response,
  next: express$NextFunction,
) => {
  res.status(404).send('<h1>Page not found</h1>');
  res.status(500).send('Something broke!');
  next();
};
app.use(errorHandler);

// eslint-disable-next-line
app.listen(3000, () => console.log('Listening on port 3000!'));
