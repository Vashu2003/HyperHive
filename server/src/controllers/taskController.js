import Task from "../models/Task.js";

// @desc    Create a new Task inside a Group
export const createTask = async (req, res) => {
  const { title, description, dueDate, groupId, assignedTo } = req.body;

  try {
    if (!title || !groupId) {
      return res
        .status(400)
        .json({ message: "Title and Group ID are required" });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      group: groupId,
      assignedTo,
      createdBy: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get all Tasks for a Group
import mongoose from "mongoose";

export const getTasks = async (req, res) => {
  const { groupId } = req.params;

  try {
    // Validate groupId
    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      return res.status(400).json({ message: "Invalid Group ID" });
    }

    const tasks = await Task.find({ group: groupId }).populate(
      "assignedTo",
      "name email"
    );

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// @desc    Update Task Status (Complete / Incomplete)
export const updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { isCompleted } = req.body;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.isCompleted = isCompleted;
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
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
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
