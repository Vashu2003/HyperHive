import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import { useAuth } from "./AuthContext";
const GroupContext = createContext();

export const useGroups = () => {
  return useContext(GroupContext);
};

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nonMembers, setNonMembers] = useState([]); // To store users not in the group
  const [groupMembers, setGroupMembers] = useState([]);
  const { user, loading: authLoading } = useAuth();

  // Fetch groups - now a reusable function
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

  const fetchGroupMembers = async (groupId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    try {
      const response = await axiosInstance.get(
        `/api/groups/${groupId}/members`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setGroupMembers(response.data);
    } catch (err) {
      console.error(err);
      setError("Error fetching group members.");
    }
  };
  // Fetch non-members of a group
  const fetchNonMembers = async (groupId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    try {
      const response = await axiosInstance.get(
        `/api/groups/${groupId}/non-members`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNonMembers(response.data); // Set the non-members
    } catch (err) {
      console.error(err);
      setError("Error fetching non-members.");
    }
  };

  // Add a member to the group
  const addMemberToGroup = async (groupId, userId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    try {
      const response = await axiosInstance.put(
        `/api/groups/${groupId}/add-member`,
        { userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Re-fetch the groups after the update
      fetchGroups();
    } catch (err) {
      console.error(err);
      setError("Error adding member to group.");
    }
  };

  useEffect(() => {
    if (authLoading || !user) return; // Wait for auth to load and user to be available
    fetchGroups();
  }, [authLoading, user]);

  // Create group
  const createGroup = async ({ name, description }) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");

    const response = await axiosInstance.post(
      "/api/groups/create",
      { name, description },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setGroups((prev) => [response.data, ...prev]);
  };

  return (
    <GroupContext.Provider
      value={{
        groups,
        loading,
        error,
        createGroup,
        fetchGroups,
        nonMembers,
        fetchNonMembers,
        groupMembers,
        fetchGroupMembers,
        addMemberToGroup,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};
