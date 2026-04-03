// backend/models/health.model.js
import mongoose from "mongoose";

const HealthSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: "GLOBAL_HEALTH_DOC"
    },
    visits: {
        type: Number,
        default: 0
    },
    lastVisit: {
        type: Date,
        default: Date.now
    },
    visitsAt: {
        type: [Date],
        default: []
    }

}, { timestamps: false });

export const Health = mongoose.model("Health", HealthSchema);