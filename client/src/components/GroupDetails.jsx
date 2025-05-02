import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useGroups } from "../context/GroupContext";
import axiosInstance from "../api/axios";

const GroupDetails = ({ group, memberData }) => {
  const { fetchGroups } = useGroups();
  const [isEditing, setIsEditing] = useState(false);
  const [groupData, setGroupData] = useState({ name: "", description: "" });
  const [nonMembers, setNonMembers] = useState([]);
  const [memberNames, setMemberNames] = useState([]);

  useEffect(() => {
    if (group && group._id) {
      setGroupData({ name: group.name, description: group.description });
      fetchNonMembers(group._id);
    }
  }, [group]);

  useEffect(() => {
    if (group?.members && Array.isArray(group.members) && memberData) {
      const names = group.members.map((id) => {
        const member = memberData.find((m) => m._id === id);
        return member ? member.name : "Unknown Member";
      });
      setMemberNames(names);
    }
  }, [group?.members, memberData]);

  const fetchNonMembers = async (groupId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(
        `/api/groups/${groupId}/non-members`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNonMembers(response.data);
    } catch (error) {
      console.error("Error fetching non-members", error);
    }
  };

  const handleAddMember = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.put(
        `/api/groups/${group._id}/add-member`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchGroups();
      fetchNonMembers(group._id);
    } catch (err) {
      console.error("Error adding member:", err);
    }
  };

  const handleUpdateGroup = async () => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.put(
        `/api/groups/update/${group._id}`,
        groupData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsEditing(false);
      fetchGroups();
    } catch (err) {
      console.error("Error updating group:", err);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(`/api/groups/delete/${group._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchGroups();
    } catch (err) {
      console.error("Error deleting group:", err);
    }
  };

  if (!group) {
    return (
      <div className="p-4 text-sm font-mono text-muted-foreground">
        No group selected.
      </div>
    );
  }

  let createdDate = "Unknown date";
  try {
    createdDate = format(new Date(group.createdAt), "PP");
  } catch {}

  return (
    <aside className="w-full md:w-80 border-r border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark p-4 font-mono space-y-4">
      {/* Title */}
      <div>
        <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">
          {isEditing ? (
            <input
              type="text"
              value={groupData.name}
              onChange={(e) =>
                setGroupData({ ...groupData, name: e.target.value })
              }
              className="w-full p-2 rounded-xl text-sm text-text-light dark:text-text-dark bg-muted-light dark:bg-muted-dark"
            />
          ) : (
            group.name
          )}
        </h2>
        <p className="text-xs text-muted-foreground">
          Created on {createdDate}
        </p>
      </div>

      {/* Description */}
      <div>
        {isEditing ? (
          <textarea
            value={groupData.description}
            onChange={(e) =>
              setGroupData({ ...groupData, description: e.target.value })
            }
            className="w-full p-2 rounded-xl text-sm text-text-light dark:text-text-dark bg-muted-light dark:bg-muted-dark"
          />
        ) : (
          <p className="text-sm text-text-light dark:text-text-dark">
            {group.description || "No description provided."}
          </p>
        )}
      </div>

      {/* Metadata */}
      <div className="space-y-1 text-xs text-muted-foreground">
        <p>
          <span className="font-semibold">Group ID:</span> {group._id}
        </p>
        <p>
          <span className="font-semibold">Owner Name:</span>{" "}
          {group.createdBy.name}
        </p>
        <p>
          <span className="font-semibold">Members:</span>{" "}
          {Array.isArray(group.members) ? group.members.length : "Unknown"}
        </p>

        {/* Member names */}
        {memberNames.length > 0 && (
          <ul className="list-disc pl-5 text-[11px] text-text-light dark:text-text-dark">
            {memberNames.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Add Members Section (only in edit mode) */}
      {isEditing && (
        <div>
          <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mt-4">
            Add Members:
          </h3>
          <ul className="list-disc pl-5 text-sm text-text-light dark:text-text-dark space-y-2">
            {nonMembers.map((user) => (
              <li key={user._id} className="flex justify-between items-center">
                <span>{user.name} ({user.email})</span>
                <button
                  onClick={() => handleAddMember(user._id)}
                  className="ml-4 px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Buttons */}
      <div className="flex space-x-4 mt-4">
        {isEditing ? (
          <button
            onClick={handleUpdateGroup}
            className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark rounded-xl hover:bg-muted-light/70 dark:hover:bg-muted-dark/70 transition"
          >
            Edit
          </button>
        )}
        <button
          onClick={handleDeleteGroup}
          className="px-4 py-2 bg-muted-light dark:bg-muted-dark text-red-500 dark:text-red-400 hover:text-red-600 rounded-xl hover:bg-muted-light/70 dark:hover:bg-muted-dark/70 transition"
        >
          Delete
        </button>
      </div>
    </aside>
  );
};

export default GroupDetails;
