import axiosInstance from "../api/axios";

export const fetchNonMembers = async (groupId) => {
  const token = localStorage.getItem("token");
  const response = await axiosInstance.get(
    `/api/groups/${groupId}/non-members`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const addMemberToGroup = async (groupId, userId) => {
  const token = localStorage.getItem("token");
  await axiosInstance.put(
    `/api/groups/${groupId}/add-member`,
    { userId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const removeMemberFromGroup = async (groupId, userId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axiosInstance.post(
      `/api/groups/${groupId}/remove-member`,
      { userId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data; // Return the updated group or success message
  } catch (error) {
    throw new Error("Error removing member from group");
  }
};

export const updateGroup = async (groupId, data) => {
  const token = localStorage.getItem("token");
  await axiosInstance.put(`/api/groups/update/${groupId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteGroup = async (groupId) => {
  const token = localStorage.getItem("token");
  await axiosInstance.delete(`/api/groups/delete/${groupId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
