// controllers/auth.controller.js

import { validationResult } from "express-validator";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";
import {
  createToken,
  generateAccessAndRefreshTokens,
} from "../utils/helper.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { generateCloudinarySignature } from "../utils/cloudinary.js";
import {
  generateEmailTemplate,
  sendEmail,
} from "../utils/emailHelper.js";
import { Token } from "../models/token.model.js";

export const registerUser = asyncHandler(async (req, res) => {
  // Run express-validator result check
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(422, errors.array()[0].msg);
  }

  const { name, email, password, phoneNumber, gender } = req.body;

  // Check for existing user
  const existingUser = await User.findOne({
    $or: [{ email }, { phoneNumber }],
  });

  if (existingUser && existingUser.isEmailVerified) {
    throw new ApiError(
      409,
      "User already exists with this email or phone number",
    );
  }
  const role = "user";
  // Create new user
  const newUser = await User.create({
    name,
    email,
    password,
    phoneNumber,
    gender,
    role,
  });

  const rawToken = await createToken(newUser._id, "EMAIL_VERIFY", 60 * 24);

  const verifyUrl = `${process.env.CORS_ORIGIN}/verify-email/${rawToken}`;

  const emailTemplate = generateEmailTemplate({
    linkUrl: verifyUrl,
    name: name,
    title: "Thank you for signing up.",
    subtitle1: "Verify Your Email Address",
    subtitle2: "Please click the button below to verify your email address.",
    buttonText: "Verify Email",
    warning: "If you did not create an account, you can safely ignore this email.",
    instruction: "This verification link will expire in 24 hours.",
  });

  try {
    await sendEmail({
      to: newUser.email,
      subject: "Verify your email address",
      html: emailTemplate,
    });
  } catch (error) {
    await User.findByIdAndDelete(newUser._id);
    await Token.deleteMany({ userId: newUser._id });
    throw new ApiError(500, "Failed to send verification email");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        null,
        "Registration successful. Please verify your email.",
      ),
    );
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const tokenDoc = await Token.findOne({
    tokenHash: hashedToken,
    type: "EMAIL_VERIFY",
    used: false,
    expiresAt: { $gt: Date.now() },
  });

  if (!tokenDoc) {
    throw new ApiError(400, "Token is invalid or expired");
  }

  const user = await User.findById(tokenDoc.userId);

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  user.isEmailVerified = true;

  // Generate tokens AFTER verification
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );

  user.refreshToken = refreshToken;

  await user.save();

  tokenDoc.used = true;
  await tokenDoc.save();

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          accessToken,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
        "Email verified successfully",
      ),
    );
});

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

  if (!user.isEmailVerified) {
    throw new ApiError(401, "Please verify your email first");
  }

  // Verify password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Generate access & refresh tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );

  // Save new refreshToken in DB
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const userData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    gender: user.gender,
    role: user.role,
  };

  const cookieOptions = {
    httpOnly: true,
    secure: true, // enable for HTTPS
    sameSite: "Strict", // or 'None' for cross-site with secure=true
  };

  // Send response
  return res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          user: userData,
          accessToken,
        },
        "Login successful",
      ),
    );
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;

  // No need to query DB again since middleware already validated user and stripped sensitive info
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
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
    { new: true },
  );

  // Clear cookie options
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  };

  // Clear cookie and send response
  return res
    .status(200)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized access. Refresh token missing.");
  }

  try {
    // Decode the token
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token — user not found.");
    }

    // Check if token matches the one in DB
    if (user.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, "Refresh token has expired or is already used.");
    }

    // Generate new tokens
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    // Save new refresh token in DB (rotating)
    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    // Set secure HTTP-only cookie
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    };

    return res
      .status(200)
      .cookie("refreshToken", newRefreshToken, cookieOptions)
      .json(
        new ApiResponse(
          200,
          { accessToken: newAccessToken },
          "Access token refreshed",
        ),
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

export const changePassword = asyncHandler(async (req, res) => {
  // Run express-validator result check
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(422, errors.array()[0].msg);
  }
  const userId = req.user._id;
  const { currentPassword, newPassword } = req.body;

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

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Password updated successfully"));
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          null,
          "If the email exists, a reset link has been sent",
        ),
      );
  }

  await Token.deleteMany({
    userId: user._id,
    type: "PASSWORD_RESET",
  });
  const rawToken = await createToken(user._id, "PASSWORD_RESET", 10);
  const resetUrl = `${process.env.CORS_ORIGIN}/password-reset/${rawToken}`;
  const emailTemplate = generateEmailTemplate({
    linkUrl: resetUrl,
    name: user.name,
    title: "Forgot your Password?",
    subtitle1: "We received a request to reset it.",
    subtitle2: "Click the link below to reset your password.",
    buttonText: "Reset Password",
    warning: "If you didn’t request this, ignore this email.",
    instruction: "This link expires in 10 minutes.",
  });
  try {
    await sendEmail({
      to: user.email,
      subject: "Your password reset link (valid for 10 min)",
      html: emailTemplate,
      text: null,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Token sent to email"));
  } catch (error) {
    await Token.deleteMany({
      userId: user._id,
      type: "PASSWORD_RESET",
    });
    throw new ApiError(
      500,
      "There was an error sending the email. Try again later.",
    );
  }
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (!token) {
    throw new ApiError(400, "Token is missing");
  }

  if (password !== confirmPassword) {
    throw new ApiError(400, "Passwords do not match");
  }

  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters long");
  }
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const tokenDoc = await Token.findOne({
    tokenHash: hashedToken,
    type: "PASSWORD_RESET",
    used: false,
    expiresAt: { $gt: Date.now() },
  });

  if (!tokenDoc) {
    throw new ApiError(400, "Token is invalid or has expired");
  }

  const user = await User.findById(tokenDoc.userId);

  if (!user) {
    throw new ApiError(400, "User not found");
  }
  user.password = password;
  user.refreshToken = undefined;
  await user.save();
  tokenDoc.used = true;
  await tokenDoc.save();
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Password reset successfully"));
});

const allowedFolders = {
  rating: "TrackDeck/ratingScreenshot",
  review: "TrackDeck/reviewScreenshot",
  sellerfeedback: "TrackDeck/sellerfeedbackScreenshot",
  refund: "TrackDeck/refundproofScreenshot",
};

export const getSignature = asyncHandler(async (req, res) => {
  const { type } = req.query;

  if (!type || !allowedFolders[type]) {
    throw new ApiError(400, "Invalid or missing 'type' parameter.");
  }

  const folder = allowedFolders[type];
  const signatureData = generateCloudinarySignature(folder);

  return res
    .status(200)
    .json(
      new ApiResponse(200, signatureData, "Signature generated successfully."),
    );
});
