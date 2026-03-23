import { Token } from "../models/token.model.js";
import { User } from "../models/user.model.js";
import ApiError from "./ApiError.js";
import crypto from "crypto";

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
    throw new ApiError(
      500,
      "Someting went wrong while generating refresh and access token",
    );
  }
};

export const createToken = async (userId, type, expiryMinutes) => {
  await Token.deleteMany({
    userId,
    type,
    used: false,
  });
  const rawToken = crypto.randomBytes(32).toString("hex");

  const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

  const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);

  await Token.create({
    userId,
    type,
    tokenHash,
    expiresAt,
    used: false,
  });

  return rawToken; // send this via email
};
