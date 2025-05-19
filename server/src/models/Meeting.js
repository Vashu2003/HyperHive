// models/Meeting.js
import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  scheduledAt: {
    type: Date,
  }, // optional: for scheduling
  createdAt: {
    type: Date,
    default: Date.now,
  },
  waitingList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  mutedParticipants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],    
  active: {
    type: Boolean,
    default: true,
  },
  jitsiRoomId: {
    type: String,
    required: true,
  }, // unique room name or id
}, { timestamps: true });

export default mongoose.model("Meeting", meetingSchema);
