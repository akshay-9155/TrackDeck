// backend/routes/admin.routes.js
import express from 'express';
import { deleteUserById, getAllUsers, getUserById, updateUserRole } from '../controllers/admin.controller.js';
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware.js';

export const adminRouter = express.Router();

// 👤 Authenticated admin routes
adminRouter.use(authenticate);

// 👑 Admin-only routes
adminRouter.get('/all', authorizeRoles('admin'), getAllUsers);
adminRouter.get('/:id', authorizeRoles('admin'), getUserById);
adminRouter.delete('/:id', authorizeRoles('admin'), deleteUserById);
adminRouter.put('/:id/role', authorizeRoles('admin'), updateUserRole);

