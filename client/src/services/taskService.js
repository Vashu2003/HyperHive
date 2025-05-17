import axiosInstance from "../api/axios";

// Create a new task in a group
export const createTask = async (groupId, taskData) => {
  const response = await axiosInstance.post(`/api/tasks/create`, {
    groupId,
    ...taskData,
  });
  return response.data;
};

// Get all tasks for a specific group
export const getTasks = async (groupId) => {
  const response = await axiosInstance.get(`/api/tasks/${groupId}`);
  return response.data;
};

// Update the status (or other properties) of a task
export const updateTask = async (taskId, updatedData) => {
  const response = await axiosInstance.patch(`/api/tasks/update/${taskId}`, updatedData);
  return response.data;
};

// Delete a task
export const deleteTask = async (taskId) => {
  const response = await axiosInstance.delete(`/api/tasks/delete/${taskId}`);
  return response.data;
};
