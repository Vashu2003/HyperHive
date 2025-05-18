import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/taskController.js";

const router = express.Router();

// Protected Routes
router.post("/create", protect, createTask);
router.get("/:groupId", protect, getTasks);
router.patch("/update/:taskId", protect, updateTask);
router.delete("/delete/:taskId", protect, deleteTask);

export default router;
