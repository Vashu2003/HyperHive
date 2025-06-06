import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
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
    if (isGuest) return setShowGuestDialog(true);
    if (user._id !== group.createdBy._id)
      return setShowUnauthorizedDialog(true);
    setIsEditing((prev) => !prev);
  };

  const fetchNonMembersHandler = async (groupId) => {
    try {
      const data = await fetchNonMembers(groupId);
      setNonMembers(data);
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
      fetchNonMembersHandler(group._id);
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
      fetchNonMembersHandler(group._id);
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
    <>
      <motion.aside
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 30 }}
        transition={{ duration: 0.3 }}
        className="w-full md:w-80 p-4 font-mono space-y-4 relative z-1100"
      >
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
        <MemberList
          members={group.members}
          isEditing={isEditing}
          handleRemoveMember={handleRemoveMember}
          group={group}
        />

        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <NonMemberList
                nonMembers={nonMembers}
                handleAddMember={handleAddMember}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <GroupActions
          isEditing={isEditing}
          setIsEditing={handleEditToggle}
          handleUpdateGroup={handleUpdateGroup}
          handleDeleteGroup={handleDeleteGroup}
        />
      </motion.aside>

      <AnimatePresence>
        {showGuestDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GuestRestrictionDialog
              isOpen={showGuestDialog}
              onClose={() => setShowGuestDialog(false)}
            />
          </motion.div>
        )}

        <AnimatePresence>
          {showUnauthorizedDialog && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              role="alertdialog"
              aria-modal="true"
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
              onClick={() => setShowUnauthorizedDialog(false)}
            >
              <div
                className="bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark p-6 rounded-2xl shadow-2xl w-full max-w-sm text-center space-y-5"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-semibold text-error font-mono select-none">
                  Permission Denied
                </h2>
                <p className="text-sm text-text-light dark:text-text-dark leading-relaxed font-mono select-none">
                  Only the <strong>Admin</strong> of this group can edit or delete it.
                </p>
                <button
                  onClick={() => setShowUnauthorizedDialog(false)}
                  className="px-5 py-2 text-sm text-text-light dark:text-text-dark bg-muted-light dark:bg-muted-dark rounded-xl hover:bg-muted-light/70 dark:hover:bg-muted-dark/70 transition font-mono"
                  autoFocus
                >
                  Got it
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatePresence>
    </>
  );
};

export default GroupDetails;
