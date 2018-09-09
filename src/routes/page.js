import express from 'express';
import { readPage } from '../queries';

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
// router.get('/all', readAllPages);

/**
 * Updates a page
 */
// router.put('/:id', updatePage);

/**
 * Deletes a page
 */
// router.delete('/:id', deletePage);

export default router;
