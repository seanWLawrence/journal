import express from 'express';
import {
  createUser,
  readUser,
  readAllUsers,
  updateUser,
  deleteUser,
} from '../database';

const router = express.Router();

/**
 * Creates a new User
 */

router.post('/:id', createUser);

/**
 * Gets a single User
 */
router.get('/:id', readUser);

/**
 * Gets all Users
 */
router.get('/all', readAllUsers);

/**
 * Updates a User
 */
router.put('/:id', updateUser);

/**
 * Deletes a User
 */
router.delete('/:id', deleteUser);

export default router;
