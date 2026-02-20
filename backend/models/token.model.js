// backend/models/token.model.js
import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    type: {
        type: String,
        enum: ["PASSWORD_RESET", "EMAIL_VERIFY"],
        required: true
    },

    tokenHash: {
        type: String,
        required: true
    },

    expiresAt: {
        type: Date,
        required: true
    },

    used: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

// Auto delete expired tokens
TokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Token = mongoose.model("Token", TokenSchema);