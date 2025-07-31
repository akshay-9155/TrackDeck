// routes/auth.route.js

import { Router } from "express";
import { registerUser, loginUser, getCurrentUser, refreshAccessToken, logoutUser, getSignature } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validateLogin, validateRegister } from "../middlewares/validations/authValidation.middleware.js";
import { cloudinaryLimiter } from "../middlewares/cloudinaryLimiter.middleware.js";

const authRouter = Router();

// @route   POST /api/auth/register
// @desc    Register new user (Seeker or Owner)
// @access  Public
authRouter.post("/register", validateRegister, registerUser);

// @route   POST /api/auth/login
// @desc    Login user and return token
// @access  Public
authRouter.post("/login", validateLogin, loginUser);

// @route   POST /api/auth/login
// @desc    logout user, clear cookies and set refresh token to undefined in db
// @access  Private
authRouter.post("/logout", authenticate, logoutUser);

// @route   GET /api/auth/me
// @desc    Get current logged-in user profile
// @access  Private
authRouter.get("/me", authenticate, getCurrentUser);

// @route   POST /api/auth/refreshAccessToken
// @desc    Refresh Access Token
// @access  Private
authRouter.post("/refreshAccessToken", refreshAccessToken);

// @route   POST /api/auth/cloudinary/signature
// @desc    get cloudinary signature
// @access  Private
authRouter.get("/cloudinary/signature", authenticate, cloudinaryLimiter, getSignature);

export default authRouter;
