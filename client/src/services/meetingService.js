import axiosInstance from "../api/axios";

// Create a new meeting
export const createMeeting = async (data) => {
  const response = await axiosInstance.post("/api/meetings/create", data);
  return response.data;
};

// Get all meetings for a group
export const getMeetingsForGroup = async (groupId) => {
  const response = await axiosInstance.get(`/api/meetings/group/${groupId}`);
  return response.data;
};

// Get single meeting data by ID
export const getMeetingById = async (meetingId) => {
  const response = await axiosInstance.get(`/api/meetings/${meetingId}`);
  return response.data;
};

// Request to join a meeting
export const requestToJoin = (meetingId) =>
  axiosInstance.post(`/api/meetings/${meetingId}/request`);

// Approve join request
export const approveJoinRequest = (meetingId, userId) =>
  axiosInstance.post(`/api/meetings/${meetingId}/approve/${userId}`);

// Reject join request
export const rejectJoinRequest = (meetingId, userId) =>
  axiosInstance.post(`/api/meetings/${meetingId}/reject/${userId}`);

// End a meeting
export const endMeeting = (meetingId) =>
  axiosInstance.patch(`/api/meetings/end/${meetingId}`);

// Remove participant
export const removeParticipant = (meetingId, userId) =>
  axiosInstance.patch(`/api/meetings/${meetingId}/remove/${userId}`);

// Mute participant
export const muteParticipant = (meetingId, userId) =>
  axiosInstance.patch(`/api/meetings/${meetingId}/mute/${userId}`);

// Unmute participant
export const unmuteParticipant = (meetingId, userId) =>
  axiosInstance.patch(`/api/meetings/${meetingId}/unmute/${userId}`);
