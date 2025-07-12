import ApiError from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
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
