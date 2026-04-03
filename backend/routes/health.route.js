import { Router } from "express";
import { healthCheck } from "../controllers/health.controller.js";

const healthRouter = Router();

healthRouter.get("/check", healthCheck);

export default healthRouter;