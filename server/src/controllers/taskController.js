import Task from "../models/Task.js";
import mongoose from "mongoose";

// @desc    Create a new Task inside a Group
export const createTask = async (req, res) => {
  const { title, description, dueDate, groupId, assignedTo, status } = req.body;

  try {
    if (!title || !groupId) {
      return res.status(400).json({ message: "Title and Group ID are required" });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      group: groupId,
      assignedTo,
      status: status || "pending", // Default to pending
      createdBy: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get all Tasks for a Group
export const getTasks = async (req, res) => {
  const { groupId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      return res.status(400).json({ message: "Invalid Group ID" });
    }

    const tasks = await Task.find({ group: groupId }).populate("assignedTo", "name email");

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Get tasks error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ @desc    Update a Task (including status)
export const updateTask = async (req, res) => {
  // console.log("Update Task request body:", req.body);
  const { taskId } = req.params;
  const { title, description, dueDate, assignedTo, status } = req.body;

  try {
    const task = await Task.findById(taskId);
    // console.log("Task before update:", task);


    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (assignedTo !== undefined) task.assignedTo = assignedTo;
    if (status !== undefined) task.status = status;

    await task.save();
    // console.log("Task after update:", task);

    res.status(200).json(task);
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete a Task
export const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
