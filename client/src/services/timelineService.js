import axiosInstance from "./axios.js"; // import your axios instance

const getTimelineByGroup = async (groupId) => {
  try {
    const response = await axiosInstance.get(`/api/timeline/${groupId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching timeline:", error);   
    throw error;
  }
};

export { getTimelineByGroup };
