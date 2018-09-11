// @flow strict

import express from 'express';
import {
  createPage,
  readPage,
  readAllPages,
  updatePage,
  deletePage,
} from '../database/pages';

const router = express.Router();

/**
 * Creates a new page
 */

router.post('/:id', createPage);

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
router.put('/:id', updatePage);

/**
 * Deletes a page
 */
router.delete('/:id', deletePage);

export default router;
