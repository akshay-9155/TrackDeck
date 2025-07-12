// backend/routes/user.routes.js
import express from 'express';
import {
    getUserProfile,
    updateUserProfile,
    updateUserPassword,
    deleteUserAccount
} from '../controllers/user.controller.js';

import { authenticate, authorizeRoles } from '../middlewares/auth.middleware.js';
import { validateUpdatePassword, validateUpdateProfile } from '../middlewares/validations/userValidation.middleware.js';

const userRouter = express.Router();

// 👤 Authenticated user routes
userRouter.use(authenticate);

userRouter.get('/profile', getUserProfile);
userRouter.put('/profile', validateUpdateProfile, updateUserProfile);
userRouter.put('/password', validateUpdatePassword, updateUserPassword);
userRouter.delete('/delete', deleteUserAccount);


export default userRouter;
