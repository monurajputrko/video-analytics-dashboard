import { Router } from "express";
import eventRoutes from "./eventRoutes.js";
import analyticsRoutes from "./analyticsRoutes.js";

const router = Router();
router.use("/events", eventRoutes);
router.use("/analytics", analyticsRoutes);

export default router;
