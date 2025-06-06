import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const GroupDescription = ({ isEditing, groupData, setGroupData, group }) => (
  <AnimatePresence mode="wait">
    {isEditing ? (
      <motion.textarea
        key="textarea"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        value={groupData.description}
        onChange={(e) =>
          setGroupData({ ...groupData, description: e.target.value })
        }
        className="w-full p-2 rounded-xl text-sm bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark"
      />
    ) : (
      <motion.p
        key="paragraph"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6 }}
        transition={{ duration: 0.2 }}
        className="text-sm text-text-light dark:text-text-dark"
      >
        {group.description || "No description provided."}
      </motion.p>
    )}
  </AnimatePresence>
);

export default GroupDescription;
