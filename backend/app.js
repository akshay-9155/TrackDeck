import express from 'express'
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({
    limit: "16kb"
}));

app.use(cookieParser());

import authRouter from './routes/auth.route.js';
import orderRouter from './routes/order.route.js';
import userRouter from './routes/user.route.js';

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);

import pageNotFound from './middlewares/pageNotFound.middleware.js';
import errorHandler from './middlewares/error.middleware.js';
import { adminRouter } from './routes/admin.route.js';

app.use(pageNotFound);
app.use(errorHandler);

export { app };