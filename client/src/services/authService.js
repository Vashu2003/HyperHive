import axios from "../api/axios";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post("/api/auth/login", { email, password });
    return response.data; // returns user info + token
  } catch (error) {
    throw error; // Ensure errors are propagated correctly
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post("/api/auth/register", { name, email, password });
    return response.data; // returns new user info + token
  } catch (error) {
    throw error; // Ensure errors are propagated correctly
  }
};
