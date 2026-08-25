import { Router } from "express";
import { getVideoAnalytics } from "../controllers/analyticsController.js";

const router = Router();
router.get("/videos", getVideoAnalytics);

export default router;
