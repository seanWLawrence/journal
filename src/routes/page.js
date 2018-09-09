import express from 'express';
import { readPage, readAllPages } from '../queries';

const router = express.Router();

/**
 * Creates a new page
 */

// router.post('/:id', createPage);

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
// router.put('/:id', updatePage);

/**
 * Deletes a page
 */
// router.delete('/:id', deletePage);

export default router;
