import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createTask, getTasks, updateTaskStatus, deleteTask } from "../controllers/taskController.js";

const router = express.Router();

// Protected Routes
router.post("/create", protect, createTask);
router.get("/:groupId", protect, getTasks);
router.patch("/update/:taskId", protect, updateTaskStatus);
router.delete("/delete/:taskId", protect, deleteTask);

export default router;
