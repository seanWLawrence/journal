// @flow strict

/**
 * Import and export all routes for a single import function
 * in the Express init file
 */
import pages from './pages';
import { getLoginForm, getHomePage } from './root';

export { pages, getLoginForm, getHomePage };
