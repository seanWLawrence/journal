/**
 * Package imports
 */
import express from 'express';

/**
 * Script imports
 */
import {
	createPage,
	getCreatePageForm,
	readPage,
	readAllPages,
	updatePage,
	getUpdatePageForm,
	deletePage,
	getDeletePageButton,
	incorrectIDMiddleware,
} from '../models/pages';

/**
 * Create a new express router instance
 */
const pages = express.Router();

/**
 * Route middleware
 * ----------------------------------------------
 */

/**
 * Attaches the incorrect ID middleware function to the router
 */
pages.param('id', incorrectIDMiddleware);

/**
 * Single routes
 * ----------------------------------------------
 */

/**
 * Gets a single page
 */
pages.get('/:id', readPage);

/**
 * Gets all pages
 */
pages.get('/', readAllPages);

/**
 * Grouped routes
 * ----------------------------------------------
 */

/**
 * Routes for creating a new page and getting the form to create a new page
 */

pages
	.route('/new')
	.post(createPage)
	.get(getCreatePageForm);

/**
 * Routes for updating a page and getting the form to update a page
 */
pages
	.route('/edit/:id')
	.put(updatePage)
	.get(getUpdatePageForm);

/**
 * Routes for deleting a page and getting the form to delete a page
 */
pages
	.route('/delete/:id')
	.delete(deletePage)
	.get(getDeletePageButton);

/**
 * Exports the pages router as default
 */
export default pages;
