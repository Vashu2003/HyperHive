import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useGroups } from "../../context/GroupContext";
import { useAuth } from "../../context/AuthContext";
import GroupHeader from "./GroupHeader";
import GroupDescription from "./GroupDescription";
import GroupMetadata from "./GroupMetadata";
import MemberList from "./MemberList";
import NonMemberList from "./NonMemberList";
import GroupActions from "./GroupActions";
import GuestRestrictionDialog from "../GuestRestrictionDialog";

import {
  fetchNonMembers,
  addMemberToGroup,
  removeMemberFromGroup,
  updateGroup,
  deleteGroup,
} from "../../services/groupService";

const GroupDetails = ({ group }) => {
  const { fetchGroups } = useGroups();
  const { isGuest, user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [groupData, setGroupData] = useState({ name: "", description: "" });
  const [nonMembers, setNonMembers] = useState([]);
  const [showGuestDialog, setShowGuestDialog] = useState(false);
  const [showUnauthorizedDialog, setShowUnauthorizedDialog] = useState(false);
  // Set group data and fetch non-members when group changes
  useEffect(() => {
    if (group?._id) {
      setGroupData({
        name: group.name || "",
        description: group.description || "",
      });
      fetchNonMembersHandler(group._id);
    }
  }, [group]);

  const handleEditToggle = () => {
    if (isGuest) {
      return setShowGuestDialog(true);
    }

    // Only allow editing if the user is the creator/admin
    if (user._id !== group.createdBy._id) {
      return setShowUnauthorizedDialog(true);
    }

    setIsEditing((prev) => !prev);
  };

  const fetchNonMembersHandler = async (groupId) => {
    try {
      const data = await fetchNonMembers(groupId);
      setNonMembers(data); // Set non-members data (with name and email)
    } catch (error) {
      console.error("Error fetching non-members", error);
    }
  };

  const handleAddMember = async (userId) => {
    if (isGuest) return setShowGuestDialog(true);
    if (user._id !== group.createdBy._id)
      return setShowUnauthorizedDialog(true);
    try {
      await addMemberToGroup(group._id, userId);
      fetchGroups();
      fetchNonMembersHandler(group._id); // Refetch non-members
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  const handleRemoveMember = async (userId) => {
    if (isGuest) return setShowGuestDialog(true);
    if (user._id !== group.createdBy._id)
      return setShowUnauthorizedDialog(true);
    try {
      await removeMemberFromGroup(group._id, userId);
      fetchGroups();
      fetchNonMembersHandler(group._id); // Refetch non-members
    } catch (error) {
      console.error("Error removing member:", error);
    }
  };

  const handleUpdateGroup = async () => {
    if (isGuest) return setShowGuestDialog(true);
    if (user._id !== group.createdBy._id)
      return setShowUnauthorizedDialog(true);
    try {
      await updateGroup(group._id, groupData);
      setIsEditing(false);
      fetchGroups();
    } catch (err) {
      console.error("Error updating group:", err);
    }
  };

  const handleDeleteGroup = async () => {
    if (isGuest) return setShowGuestDialog(true);
    if (user._id !== group.createdBy._id)
      return setShowUnauthorizedDialog(true);
    const confirmed = window.confirm(
      "Are you sure you want to delete this group?"
    );
    if (!confirmed) return;

    try {
      await deleteGroup(group._id);
      alert("Group deleted successfully.");
      fetchGroups();
    } catch (err) {
      console.error("Error deleting group:", err);
      alert("Failed to delete group. Please try again.");
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
    <aside className="w-full md:w-80 bg-background-light dark:bg-background-dark p-4 font-mono space-y-4">
      <GroupHeader
        isEditing={isEditing}
        groupData={groupData}
        setGroupData={setGroupData}
        group={group}
        createdDate={createdDate}
      />
      <GroupDescription
        isEditing={isEditing}
        groupData={groupData}
        setGroupData={setGroupData}
        group={group}
      />
      <GroupMetadata group={group} />

      {/* Pass the full member data to the MemberList component */}
      <MemberList
        members={group.members} // Make sure group.members contains full user data (populated on the backend)
        isEditing={isEditing}
        handleRemoveMember={handleRemoveMember}
        group={group}
      />

      {isEditing && (
        <NonMemberList
          nonMembers={nonMembers} // Non-members list is populated from the backend
          handleAddMember={handleAddMember}
        />
      )}

      <GroupActions
        isEditing={isEditing}
        setIsEditing={handleEditToggle}
        handleUpdateGroup={handleUpdateGroup}
        handleDeleteGroup={handleDeleteGroup}
      />
      {showGuestDialog && (
        <GuestRestrictionDialog
          isOpen={showGuestDialog}
          onClose={() => setShowGuestDialog(false)}
        />
      )}
      {showUnauthorizedDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark p-6 rounded-xl shadow-xl max-w-md text-center">
            <h2 className="text-lg text-red-600 font-semibold mb-2 font-mono">
              Permission Denied
            </h2>
            <p className="mb-4 font-mono">
              Only the Admin of this group can edit or delete it.
            </p>
            <button
              onClick={() => setShowUnauthorizedDialog(false)}
              className="px-4 py-2 bg-muted-dark dark:bg-muted-light text-text-dark dark:text-text-light font-mono rounded-full hover:bg-background-dark dark:hover:bg-background-light transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default GroupDetails;
