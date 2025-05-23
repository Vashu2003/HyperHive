// server/server.js

import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";
import connectDB from "./src/config/db.js";
import app from "./src/app.js";
import { protectSocket } from "./src/middleware/socketAuthMiddleware.js"; // JWT socket auth middleware
import ChatMessage from "./src/models/ChatMessage.js";

const PORT = process.env.PORT || 5000;

// 1. Create HTTP server with Express app
const server = http.createServer(app);

// 2. Attach Socket.io to the HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // adjust your frontend URL
    credentials: true,
  },
});

// 3. Middleware to authenticate/authorize socket connections using JWT
io.use(protectSocket);

// 4. Socket event handling
io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.user.name);

  // Join a group room
  socket.on("joinRoom", (groupId) => {
    socket.join(groupId);
    console.log(`${socket.user.name} joined group ${groupId}`);
  });

  // Handle sending a message
  socket.on("sendMessage", async ({ groupId, message }) => {
    try {
      // Save message to DB
      const savedMessage = await ChatMessage.create({
        groupId,
        sender: socket.user._id,
        text: message,
      });

      // Populate sender info
      const populatedMsg = await savedMessage.populate("sender", "name email");

      // Emit message to others in the room (except sender)
      io.to(groupId).emit("receiveMessage", populatedMsg);
    } catch (err) {
      console.error("Error saving message:", err);
    }
  });

  // Handle typing event
  socket.on("typing", ({ groupId }) => {
    // Broadcast to others in the same room except the sender
    socket.to(groupId).emit("userTyping", {
      _id: socket.user._id,
      name: socket.user.name,
    });
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.user.name);
  });
});

// 5. Connect to MongoDB then start the server
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });
