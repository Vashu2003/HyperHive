import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const GroupHeader = ({ isEditing, groupData, setGroupData, group, createdDate }) => (
  <motion.div
    className="font-mono"
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.2 }}
  >
    <AnimatePresence mode="wait">
      {isEditing ? (
        <motion.input
          key="input"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          type="text"
          value={groupData.name}
          onChange={(e) =>
            setGroupData({ ...groupData, name: e.target.value })
          }
          className="w-full p-2 rounded-xl text-lg mb-2 bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <motion.h2
          key="title"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="text-3xl font-bold mb-2 text-text-light dark:text-text-dark"
        >
          {group.name}
        </motion.h2>
      )}
    </AnimatePresence>

    <p className="text-sm font-mono border px-2 rounded-xl w-fit border-border-light dark:border-border-dark bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark">
      Created on {createdDate}
    </p>
  </motion.div>
);

export default GroupHeader;
