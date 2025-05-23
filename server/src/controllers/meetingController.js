import Meeting from "../models/Meeting.js";
import Group from "../models/Group.js";

import { customAlphabet } from "nanoid"; // add this import for generating unique IDs

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10); // 10 char room id

export const createMeeting = async (req, res) => {
  const { groupId, title, scheduledAt } = req.body;

  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    const isMember = group.members.includes(req.user._id);
    if (!isMember) {
      return res
        .status(403)
        .json({ message: "You must be a group member to create a meeting" });
    }

    // Generate a unique jitsiRoomId here
    const jitsiRoomId = nanoid();

    const newMeeting = new Meeting({
      group: groupId,
      title,
      scheduledAt,
      host: req.user._id,
      jitsiRoomId,
    });

    await newMeeting.save();

    res.status(201).json(newMeeting);
  } catch (error) {
    console.error("Error creating meeting:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMeetingsForGroup = async (req, res) => {
  const { groupId } = req.params;
  try {
    const meetings = await Meeting.find({ group: groupId }).populate(
      "host participants",
      "name email"
    );

    const now = new Date();

    const updatedMeetings = meetings.map((meeting) => {
      let status = "scheduled";

      if (!meeting.active) {
        status = "ended";
      } else if (new Date(meeting.scheduledAt) <= now) {
        status = "live";
      }

      return {
        ...meeting.toObject(),
        status,
      };
    });

    res.json(updatedMeetings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch meetings" });
  }
};

// Get single meeting by ID
export const getMeetingById = async (req, res) => {
  const { meetingId } = req.params;  // <-- get the ID from params

  try {
    const meeting = await Meeting.findById(meetingId);  // <-- use meetingId here
    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }
    res.json(meeting);
  } catch (error) {
    console.error("Error fetching meeting:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const endMeeting = async (req, res) => {
  try {
    const meeting = req.meeting; // from verifyHost middleware

    meeting.active = false;
    await meeting.save();

    res.json(meeting);
  } catch (err) {
    res.status(500).json({ message: "Failed to end meeting" });
  }
};

export const removeParticipant = async (req, res) => {
  const { userId } = req.params;
  try {
    const meeting = req.meeting; // from verifyHost middleware

    meeting.participants = meeting.participants.filter(
      (id) => id.toString() !== userId
    );
    await meeting.save();

    res.json(meeting);
  } catch (err) {
    res.status(500).json({ message: "Failed to remove participant" });
  }
};

export const requestToJoin = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.meetingId);
    if (!meeting) return res.status(404).json({ message: "Meeting not found" });

    const alreadyInWaiting = meeting.waitingList.includes(req.user._id);
    const alreadyParticipant = meeting.participants.includes(req.user._id);

    if (alreadyInWaiting || alreadyParticipant)
      return res.status(400).json({ message: "Already requested or joined" });

    meeting.waitingList.push(req.user._id);
    await meeting.save();

    res.status(200).json({ message: "Request sent, awaiting approval" });
  } catch (err) {
    res.status(500).json({ message: "Failed to request to join" });
  }
};

export const approveJoinRequest = async (req, res) => {
  const { userId } = req.params;
  try {
    const meeting = req.meeting; // from verifyHost middleware

    meeting.waitingList = meeting.waitingList.filter(
      (id) => id.toString() !== userId
    );
    meeting.participants.push(userId);

    await meeting.save();
    res.status(200).json({ message: "User added to meeting" });
  } catch (err) {
    res.status(500).json({ message: "Failed to approve request" });
  }
};

export const rejectJoinRequest = async (req, res) => {
  const { userId } = req.params;
  try {
    const meeting = req.meeting; // from verifyHost middleware

    meeting.waitingList = meeting.waitingList.filter(
      (id) => id.toString() !== userId
    );

    await meeting.save();
    res.status(200).json({ message: "Request rejected" });
  } catch (err) {
    res.status(500).json({ message: "Failed to reject request" });
  }
};

export const muteParticipant = async (req, res) => {
  const { userId } = req.params;

  try {
    const meeting = req.meeting; // from verifyHost middleware

    const alreadyMuted = meeting.mutedParticipants.includes(userId);
    if (alreadyMuted) {
      return res.status(400).json({ message: "Participant is already muted" });
    }

    meeting.mutedParticipants.push(userId);
    await meeting.save();

    res.status(200).json({ message: "Participant muted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to mute participant" });
  }
};

export const unmuteParticipant = async (req, res) => {
  const { userId } = req.params;

  try {
    const meeting = req.meeting; // from verifyHost middleware

    meeting.mutedParticipants = meeting.mutedParticipants.filter(
      (id) => id.toString() !== userId
    );
    await meeting.save();

    res.status(200).json({ message: "Participant unmuted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to unmute participant" });
  }
};
