// server/src/routes/chatRoutes.js

import express from "express";
import { sendMessage, getMessages } from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/chat/:groupId — Send message
router.post("/:groupId", protect, sendMessage);

// GET /api/chat/:groupId — Fetch group messages
router.get("/:groupId", protect, getMessages);

export default router;
