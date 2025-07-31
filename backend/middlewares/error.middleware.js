import ApiError from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
    // 🟢 Handle Mongoose validation errors
    if (err.name === "ValidationError") {
        // Extract all messages from Mongoose
        const messages = Object.values(err.errors).map(e => e.message);

        // If ALL messages are the same (like your case), use just one
        const uniqueMessage = [...new Set(messages)][0];

        return res.status(400).json({
            success: false,
            message: uniqueMessage || "Validation Error"
        });
    }

    // 🟠 All other errors
    if (!(err instanceof ApiError)) {
        err = new ApiError(500, err.message || "Internal Server Error");
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        errors: err.errors || []
    });
};

export default errorHandler;
