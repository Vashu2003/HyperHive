import Meeting from "../models/Meeting.js";

export const verifyHost = async (req, res, next) => {
  try {
    const meetingId = req.params.meetingId;
    const meeting = await Meeting.findById(meetingId);

    if (!meeting) return res.status(404).json({ message: "Meeting not found" });

    if (!meeting.host.equals(req.user._id)) {
      return res.status(403).json({ message: "Only the host can perform this action" });
    }

    // Attach meeting to req for downstream use if needed
    req.meeting = meeting;

    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
