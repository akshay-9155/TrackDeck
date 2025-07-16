// backend/controllers/user.controller.js
import asyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { validationResult } from "express-validator";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import { validateObjectId } from "../utils/helper.js";

export const getUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId).select(
        "-password -refreshToken -__v"
    );

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(
        new ApiResponse(200, user, "User profile fetched successfully")
    );
});

export const updateUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    // 🔍 Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(422, errors.array()[0].msg);
    }

    const { name, gender, phoneNumber } = req.body;

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // 🔁 Uniqueness check for phone number
    if (phoneNumber && phoneNumber !== user.phoneNumber) {
        const existing = await User.findOne({ phoneNumber });
        if (existing) {
            throw new ApiError(409, "Phone number already in use");
        }
    }

    // ✅ Update allowed fields
    if (name) user.name = name;
    if (gender) user.gender = gender;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    await user.save();

    const updatedUser = await User.findById(userId).select("-password -refreshToken -__v");

    return res.status(200).json(
        new ApiResponse(200, updatedUser, "Profile updated successfully")
    );
});

export const updateUserPassword = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;

    // 🔍 Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(422, errors.array()[0].msg);
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // 🔐 Validate current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
        throw new ApiError(401, "Current password is incorrect");
    }

    // ✅ Update password
    user.password = newPassword;
    await user.save();

    return res.status(200).json(
        new ApiResponse(200, null, "Password updated successfully")
    );
});

export const deleteUserAccount = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    // Find user
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Delete all orders of this user
    await Order.deleteMany({ user: userId });

    // Delete the user
    await User.findByIdAndDelete(userId);

    // Clear refreshToken cookie
    const cookieOptions = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .clearCookie("refreshToken", cookieOptions)
        .json(
            new ApiResponse(200, null, "Account and all related orders deleted successfully")
        );
});
