import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import meetingRoutes from "./routes/meetingRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import timelineRoutes from "./routes/timelineRoutes.js";

const app = express();
const allowedOrigins = [
  "https://hyperhive-frontend.onrender.com",
  "http://localhost:5173",
  "http://localhost",
];
// Middlewares
app.use(express.json());

// app.use((req, res, next) => {
//   console.log("Incoming Origin:", req.headers.origin);
//   next();
// });

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
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
app.use("/api/timeline", timelineRoutes);

export default app;
