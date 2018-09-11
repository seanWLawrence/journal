// @flow strict

import express from 'express';
import {
  createPage,
  getCreatePageForm,
  readPage,
  readAllPages,
  updatePage,
  getUpdatePageForm,
  deletePage,
  getDeletePageButton,
} from '../database/pages';

const router = express.Router();

/**
 * Creates a new page
 */

router.post('/new', createPage);

/**
 * Displays form to create a new page
 */
router.get('/new', getCreatePageForm);

/**
 * Gets a single page
 */
router.get('/:id', readPage);

/**
 * Gets all pages
 */
router.get('/', readAllPages);

/**
 * Updates a page
 */
router.put('/edit/:id', updatePage);

/**
 * Displays the update page form
 */
router.get('/edit/:id', getUpdatePageForm);

/**
 * Deletes a page
 */
router.delete('/delete/:id', deletePage);

/**
 * Deletes a page
 */
router.get('/delete/:id', getDeletePageButton);

export default router;
