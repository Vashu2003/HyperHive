import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useGroups } from "../../context/GroupContext";

import GroupHeader from "./GroupHeader";
import GroupDescription from "./GroupDescription";
import GroupMetadata from "./GroupMetadata";
import MemberList from "./MemberList";
import NonMemberList from "./NonMemberList";
import GroupActions from "./GroupActions";

import {
  fetchNonMembers,
  addMemberToGroup,
  removeMemberFromGroup,
  updateGroup,
  deleteGroup,
} from "../../services/groupService";

const GroupDetails = ({ group }) => {
  const { fetchGroups } = useGroups();
  const [isEditing, setIsEditing] = useState(false);
  const [groupData, setGroupData] = useState({ name: "", description: "" });
  const [nonMembers, setNonMembers] = useState([]);

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

  const fetchNonMembersHandler = async (groupId) => {
    try {
      const data = await fetchNonMembers(groupId);
      setNonMembers(data); // Set non-members data (with name and email)
    } catch (error) {
      console.error("Error fetching non-members", error);
    }
  };

  const handleAddMember = async (userId) => {
    try {
      await addMemberToGroup(group._id, userId);
      fetchGroups();
      fetchNonMembersHandler(group._id); // Refetch non-members
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  const handleRemoveMember = async (userId) => {
    try {
      await removeMemberFromGroup(group._id, userId);
      fetchGroups();
      fetchNonMembersHandler(group._id); // Refetch non-members
    } catch (error) {
      console.error("Error removing member:", error);
    }
  };

  const handleUpdateGroup = async () => {
    try {
      await updateGroup(group._id, groupData);
      setIsEditing(false);
      fetchGroups();
    } catch (err) {
      console.error("Error updating group:", err);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      await deleteGroup(group._id);
      fetchGroups();
    } catch (err) {
      console.error("Error deleting group:", err);
    }
  };

  if (!group) {
    return <div className="p-4 text-sm font-mono text-muted-foreground">No group selected.</div>;
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
        setIsEditing={setIsEditing}
        handleUpdateGroup={handleUpdateGroup}
        handleDeleteGroup={handleDeleteGroup}
      />
    </aside>
  );
};

export default GroupDetails;
