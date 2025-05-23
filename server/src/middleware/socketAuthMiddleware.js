// server/src/middleware/socketAuthMiddleware.js

import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectSocket = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authentication token missing"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(new Error("User not found"));
    }

    socket.user = user; // attach user to socket
    next();
  } catch (error) {
    console.error("Socket auth error:", error);
    return next(new Error("Authentication failed"));
  }
};
