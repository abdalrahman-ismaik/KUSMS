import express from 'express';
import { verifyAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

const router = express.Router();

// All routes require authentication and ADMIN role
router.use(verifyAuth);
router.use(requireRole('ADMIN'));

router.get('/', getUsers);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
