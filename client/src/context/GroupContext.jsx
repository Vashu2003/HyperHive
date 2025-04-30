import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axios";  // Import the custom axios instance

// Create a context for groups
const GroupContext = createContext();

// Custom hook to use the GroupContext
export const useGroups = () => {
  return useContext(GroupContext);
};

// Create the GroupProvider to wrap your app and provide the groups data
export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch groups data from the API
  useEffect(() => {
    const fetchGroups = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage

      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get("/api/groups", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        setGroups(response.data); // Assuming the response contains the group data
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error fetching groups.");
        setLoading(false);
      }
    };

    fetchGroups();
  }, []); // Empty dependency array to fetch once on mount

  return (
    <GroupContext.Provider value={{ groups, loading, error }}>
      {children}
    </GroupContext.Provider>
  );
};
