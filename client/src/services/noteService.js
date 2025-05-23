import axiosInstance from "../api/axios";

const noteService = {
  // Create a new note
  createNote: async (formData) => {
    const response = await axiosInstance.post("/api/notes/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Fetch notes for a specific group
  getGroupNotes: async (groupId) => {
    const response = await axiosInstance.get(`/api/notes/${groupId}`);
    return response.data;
  },

  // Update a note (by ID)
  updateNote: async (noteId, formData) => {
    const response = await axiosInstance.put(`/api/notes/update/${noteId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Delete a note (by ID)
  deleteNote: async (noteId) => {
    const response = await axiosInstance.delete(`/api/notes/delete/${noteId}`);
    return response.data;
  },
};

export default noteService;
