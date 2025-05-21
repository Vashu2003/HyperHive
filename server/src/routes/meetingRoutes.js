import express from "express";
import {
  createMeeting,
  getMeetingsForGroup,
  endMeeting,
  removeParticipant,
  requestToJoin,
  approveJoinRequest,
  rejectJoinRequest,
  muteParticipant,
  unmuteParticipant,
  getMeetingById,
} from "../controllers/meetingController.js";
import { protect } from "../middleware/authMiddleware.js";
import { verifyHost } from "../middleware/hostAuthMiddleware.js";

const router = express.Router();

router.post("/create", protect, createMeeting); 
router.get("/group/:groupId", protect, getMeetingsForGroup);
router.get("/:meetingId", protect, getMeetingById);
router.patch("/end/:meetingId", protect, verifyHost, endMeeting);
router.patch("/:meetingId/remove/:userId", protect, verifyHost, removeParticipant);
router.post("/:meetingId/request", protect, requestToJoin);
router.post("/:meetingId/approve/:userId", protect, verifyHost, approveJoinRequest);
router.post("/:meetingId/reject/:userId", protect, verifyHost, rejectJoinRequest);
router.patch("/:meetingId/mute/:userId", protect, verifyHost, muteParticipant);
router.patch("/:meetingId/unmute/:userId", protect, verifyHost, unmuteParticipant);


export default router;
