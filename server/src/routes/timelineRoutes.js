import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getTimeline } from "../controllers/timelineController.js";

const router = express.Router();

// GET timeline for a group
router.get("/:groupId", protect, getTimeline);

export default router;
