import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import meetingRoutes from "./routes/meetingRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only your frontend
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("🚀 HyperHive API running...");
});

// Secured Routes
app.use("/api/groups", groupRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/chat", chatRoutes);

export default app;
