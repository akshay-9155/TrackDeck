import { Health } from "../models/health.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";

export const healthCheck = asyncHandler(async (req, res) => {
  const now = new Date();

  try {
    const health = await Health.findByIdAndUpdate(
      "GLOBAL_HEALTH_DOC",
      {
        $inc: { visits: 1 },
        $set: { lastVisit: now },
        $push: { visitsAt: now },
      },
      {
        new: true,
        upsert: true, // create if not exists
      },
    );
    res.status(200).json(
      new ApiResponse(
        200,
        {
          visits: health.visits,
          lastVisit: formatDate(health.lastVisit),
        },
        "Health check successful",
      ),
    );
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Failed to update health data");
  }
});

const formatDate = (date) =>
  new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
