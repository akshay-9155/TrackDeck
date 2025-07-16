import { User } from "../models/user.model.js";
import ApiError from "./ApiError.js";

import mongoose from "mongoose";

export const validateObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};

export const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        // console.log(error);
        throw new ApiError(500, "Someting went wrong while generating refresh and access token")
    }
}

