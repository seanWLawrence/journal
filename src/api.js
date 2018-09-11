// @flow strict

/**
 * Standard library imports
 */
import path from 'path';

/**
 * Express imports and middleware
 */
import express from 'express';
import methodOverride from 'method-override';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import compression from 'compression';
import passport from 'passport';
const Strategy = require('passport-local').Strategy;

/**
 * Custom scripts imports
 */
import db from './database';
import { pages, getLoginForm, getHomePage } from './routes';
import { errorJSON } from './middleware';
import type { $Application } from 'express';

export default class Api {
  // annotate with the express $Application type
  express: $Application;

  /**
   * Creates Express instance, loads middleware and sets up routers
   */
  constructor() {
    /**
     * Initialize Express app
     */
    this.express = express();

    /**
     * Configures Passport.js authentication
     */
    this.passport();

    /**
     * Loads middleware
     */
    this.middleware();

    /**
     * Connects routes
     */
    this.routes();
  }

  /**
   * Sets up Passport.js
   */

  passport(): void {
    passport.use(
      new Strategy(function(username, password, cb) {
        db.one('SELECT * FROM users WHERE username = $1', username)
          .then((data) => {
            if (data.password === password) {
              cb(null, data);
              return;
            } else if (data.password !== password) {
              cb(null, false);
              return;
            }
          })
          //eslint-disable-next-line
          .catch((err) => console.log(err));
      }),
    );

    passport.serializeUser(function(data, cb) {
      cb(null, data.id);
    });

    passport.deserializeUser(function(id, cb) {
      db.one('SELECT * FROM users WHERE id = $1', id)
        .then((data) => {
          cb(null, data);
          return;
        })
        //eslint-disable-next-line
        .catch((err) => console.log(err));
    });
  }

  /**
   * Loads all middleware into Express
   */
  middleware(): void {
    /**
     * Adds method-override package to allow HTML forms to use PUT and DELETE requests
     */
    this.express.use(methodOverride('_method'));

    /**
     * Init Morgan for better logging during development
     */
    this.express.use(morgan('dev'));

    /**
     * Adds body parser package for getting form values
     */
    this.express.use(bodyParser.urlencoded({ extended: false }));

    /**
     * Adds GZIP to express
     * For production, it's recommended to use a reverse proxy, see docs for details
     */
    this.express.use(compression());

    /**
     * Serves static assets from the public folder
     */
    this.express.use(
      '/static',
      express.static(path.join(__dirname, '..', 'public')),
    );

    /**
     * Parses cookies
     * Used for Passport.js
     */
    this.express.use(cookieParser());

    /**
     * Parses the body
     * Used for Passport.js
     */
    this.express.use(bodyParser.urlencoded({ extended: false }));

    /**
     * Creates sessionID
     * Used for Passport.js
     */
    this.express.use(
      expressSession({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
      }),
    );
    /**
     * Initializes Passport.js as middleware
     */
    this.express.use(passport.initialize());

    /**
     * Creates a session for users using Passport.js
     */
    this.express.use(passport.session());

    /**
     * Returns 404 message on paths that don't exist
     */

    this.express.use(errorJSON);
  }

  /**
   * Connects Express routers
   */
  routes(): void {
    /**
     * Connects pages routes
     */
    this.express.use('/pages', pages);

    /**
     * Connects basic app data homepage
     */
    this.express.get('/', getHomePage);

    /**
     * Displays login form
     * TODO: Remove this and make in React.js
     */
    this.express.get('/login', getLoginForm);

    /**
     * Authenticates the user when submitting a form on the '/login' route
     */
    this.express.post(
      '/login',
      /**
       * Runs Passport.js' authenticate function with the
       * local (user/pass) Strategy
       */
      passport.authenticate('local', { failureRedirect: '/login' }),
      /**
       * Redirects user to root page on successful login
       * Note: this function is onyl run on successful login
       * @param {Request} req
       * @param {Response} res
       */
      function redirectUserOnSuccessfulLogin(req, res) {
        /**
         * Redirects to root page
         */
        res.redirect('/');
      },
    );
  }
}
