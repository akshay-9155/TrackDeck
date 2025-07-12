// backend/controllers/admin.controller.js
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { validationResult } from "express-validator";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import { validateObjectId } from "../utils/helper.js";
export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
        .select('-password -refreshToken -__v')
        .sort({ createdAt: -1 }); // Newest first

    return res.status(200).json(
        new ApiResponse(200, users, "All users fetched successfully")
    );
});

export const getUserById = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    if (!validateObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    const user = await User.findById(userId).select('-password -refreshToken -__v');
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(
        new ApiResponse(200, user, "User fetched successfully")
    );
});

export const deleteUserById = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    if (!validateObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    await Order.deleteMany({ user: userId });
    await User.findByIdAndDelete(userId);

    return res.status(200).json(
        new ApiResponse(200, null, "User and their orders deleted successfully")
    );
});


export const updateUserRole = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const { role } = req.body;

    if (!validateObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    if (!['user', 'admin'].includes(role)) {
        throw new ApiError(400, "Invalid role value");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    user.role = role;
    await user.save();

    return res.status(200).json(
        new ApiResponse(200, { _id: user._id, role: user.role }, "User role updated")
    );
});
