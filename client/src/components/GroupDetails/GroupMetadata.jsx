import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const GroupMetadata = ({ group }) => (
  <AnimatePresence>
    <motion.div
      key={group._id} // Animate on group change
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.3 }}
      className="space-y-1 text-m text-text-light dark:text-text-dark font-mono"
    >
      <p className="text-m mb-4">
        <span className="text-m font-mono">ID:</span>
        <span className="font-bold px-2 py-1 border border-border-light dark:border-border-dark rounded-full bg-muted-light dark:bg-muted-dark">
          {group._id}
        </span>
      </p>
      <p className="text-m mb-4">
        <span className="text-m font-mono">Admin:</span>
        <span className="font-bold px-2 py-1 border border-border-light dark:border-border-dark rounded-full bg-muted-light dark:bg-muted-dark">
          {group.createdBy?.name}
        </span>
      </p>
    </motion.div>
  </AnimatePresence>
);

export default GroupMetadata;
