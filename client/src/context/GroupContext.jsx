import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axios";

const GroupContext = createContext();

export const useGroups = () => {
  return useContext(GroupContext);
};

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch groups on mount
  useEffect(() => {
    const fetchGroups = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get("/api/groups", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGroups(response.data);
      } catch (err) {
        console.error(err);
        setError("Error fetching groups.");
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  // Create group function
  const createGroup = async ({ name, description }) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");

    const response = await axiosInstance.post(
      "/api/groups/create",
      { name, description },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Update local state with new group
    setGroups((prev) => [response.data, ...prev]);
  };

  return (
    <GroupContext.Provider value={{ groups, loading, error, createGroup }}>
      {children}
    </GroupContext.Provider>
  );
};
