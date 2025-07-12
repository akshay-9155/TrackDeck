import ApiError from "../utils/ApiError.js";

const pageNotFound = (req, res, next) => {
    next(new ApiError(404, `Not Found - ${req.originalUrl}`));
};

export default pageNotFound;
