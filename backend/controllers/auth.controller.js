// controllers/auth.controller.js

import { validationResult } from "express-validator";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { generateAccessAndRefreshTokens } from "../utils/helper.js";
import jwt from 'jsonwebtoken';

export const registerUser = asyncHandler(async (req, res) => {
    // Run express-validator result check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(422, errors.array()[0].msg);
    }

    const { name, email, password, phoneNumber, gender } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({
        $or: [{ email }, { phoneNumber }]
    });

    if (existingUser) {
        throw new ApiError(409, "User already exists with this email or phone number");
    }
    const role = "user";
    // Create new user
    const newUser = await User.create({
        name,
        email,
        password,
        phoneNumber,
        gender,
        role
    });

    // Generate tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(newUser._id);

    // Save refreshToken in user (optional if needed later for token rotation)
    newUser.refreshToken = refreshToken;
    await newUser.save({ validateBeforeSave: false });

    const userData = {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        gender: newUser.gender,
        phoneNumber: newUser.phoneNumber
    };

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "Strict"
    };

    return res
        .status(201)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(201, "User registered successfully", {
            user: userData,
            accessToken
        }));
});


// controllers/auth.controller.js

export const loginUser = asyncHandler(async (req, res) => {
    // Run express-validator result check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(422, errors.array()[0].msg);
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new ApiError(401, "Invalid email or password");
    }

    // Generate access & refresh tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    // Save new refreshToken in DB
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        role: user.role
    };

    const cookieOptions = {
        httpOnly: true,
        secure: true,        // enable for HTTPS
        sameSite: 'Strict'   // or 'None' for cross-site with secure=true
    };

    // Send response
    return res
        .status(200)
        .cookie('refreshToken', refreshToken, cookieOptions)
        .json(new ApiResponse(200, 'Login successful', {
            user: userData,
            accessToken
        }));
});



export const getCurrentUser = asyncHandler(async (req, res) => {
    const user = req.user;

    // No need to query DB again since middleware already validated user and stripped sensitive info
    return res
        .status(200)
        .json(new ApiResponse(200, "User fetched successfully", user));
});

export const logoutUser = asyncHandler(async (req, res) => {
    // Ensure user is present in request (added by auth middleware)
    if (!req.user || !req.user._id) {
        throw new ApiError(401, "Unauthorized");
    }

    // Remove refreshToken from DB
    await User.findByIdAndUpdate(
        req.user._id,
        { $unset: { refreshToken: "" } }, // More semantic than $set: undefined
        { new: true }
    );

    // Clear cookie options
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "Strict"
    };

    // Clear cookie and send response
    return res
        .status(200)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});
  


export const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized access. Refresh token missing.");
    }

    try {
        // Decode the token
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token — user not found.");
        }

        // Check if token matches the one in DB
        if (user.refreshToken !== incomingRefreshToken) {
            throw new ApiError(401, "Refresh token has expired or is already used.");
        }

        // Generate new tokens
        const {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        } = await generateAccessAndRefreshTokens(user._id);

        // Save new refresh token in DB (rotating)
        user.refreshToken = newRefreshToken;
        await user.save({ validateBeforeSave: false });

        // Set secure HTTP-only cookie
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "Strict"
        };

        return res
            .status(200)
            .cookie("refreshToken", newRefreshToken, cookieOptions)
            .json(new ApiResponse(200, { accessToken: newAccessToken }, "Access token refreshed"));

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});


