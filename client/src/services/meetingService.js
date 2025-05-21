import axios from "../api/axios";

// Create a new meeting
export const createMeeting = async (data) => {
  const response = await axios.post("/api/meetings/create", data);
  return response.data;
};

// Get all meetings for a group
export const getMeetingsForGroup = async (groupId) => {
  const response = await axios.get(`/api/meetings/group/${groupId}`);
  return response.data;
};

// Get single meeting data by ID
export const getMeetingById = async (meetingId) => {
  const response = await axios.get(`/api/meetings/${meetingId}`);
  return response.data;
};

// Request to join a meeting
export const requestToJoin = (meetingId) =>
  axios.post(`/api/meetings/${meetingId}/request`);

// Approve join request
export const approveJoinRequest = (meetingId, userId) =>
  axios.post(`/api/meetings/${meetingId}/approve/${userId}`);

// Reject join request
export const rejectJoinRequest = (meetingId, userId) =>
  axios.post(`/api/meetings/${meetingId}/reject/${userId}`);

// End a meeting
export const endMeeting = (meetingId) =>
  axios.patch(`/api/meetings/end/${meetingId}`);

// Remove participant
export const removeParticipant = (meetingId, userId) =>
  axios.patch(`/api/meetings/${meetingId}/remove/${userId}`);

// Mute participant
export const muteParticipant = (meetingId, userId) =>
  axios.patch(`/api/meetings/${meetingId}/mute/${userId}`);

// Unmute participant
export const unmuteParticipant = (meetingId, userId) =>
  axios.patch(`/api/meetings/${meetingId}/unmute/${userId}`);
