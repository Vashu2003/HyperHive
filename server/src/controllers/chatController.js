// server/src/controllers/chatController.js

import ChatMessage from "../models/ChatMessage.js";
import User from "../models/User.js";

// POST /api/chat/:groupId
export const sendMessage = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { text } = req.body;
    const senderId = req.user._id;

    const message = await ChatMessage.create({
      groupId,
      sender: senderId,
      text,
    });

    const populatedMsg = await message.populate("sender", "name email");

    res.status(201).json(populatedMsg);
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
};

// GET /api/chat/:groupId
export const getMessages = async (req, res) => {
  try {
    const { groupId } = req.params;

    const messages = await ChatMessage.find({ groupId })
      .populate("sender", "name email")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    console.error("Get messages error:", error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};
