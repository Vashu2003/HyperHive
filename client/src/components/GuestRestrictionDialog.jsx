import React from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const GuestRestrictionDialog = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark p-6 rounded-2xl shadow-2xl w-full max-w-sm text-center space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-error select-none">
          Restricted Action
        </h2>
        <p className="text-sm text-text-light dark:text-text-dark leading-relaxed select-none">
          You're currently using a guest account with view-only access.
          <br />
          Log in to unlock full functionality.
        </p>
        <button
          onClick={onClose}
          className="px-5 py-2 text-sm text-text-light dark:text-text-dark bg-muted-light dark:bg-muted-dark rounded-xl hover:bg-muted-light/70 dark:hover:bg-muted-dark/70 transition"
          autoFocus
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default GuestRestrictionDialog;
