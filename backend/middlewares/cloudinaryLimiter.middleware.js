// middlewares/cloudinaryLimiter.middleware.js
import rateLimit from 'express-rate-limit';

export const cloudinaryLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // limit each IP to 10 requests per windowMs
    message: "Too many signature requests. Please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});
