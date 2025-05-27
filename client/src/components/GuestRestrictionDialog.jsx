import React from "react";

const GuestRestrictionDialog = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="bg-background-light dark:bg-background-dark p-6 rounded-xl shadow-xl w-80 text-center">
        <h2 className="text-xl font-semibold mb-4 text-red-600 font-mono">Restricted Action</h2>
        <p className="text-sm text-text-light dark:text-text-dark mb-6 font-mono">
          You're currently using a guest account with view-only access. Log in to unlock full functionality.
        </p>
        <button
          onClick={onClose}
          className="bg-muted-dark dark:bg-muted-light text-text-dark dark:text-text-light px-4 py-2 rounded-full hover:bg-background-dark dark:hover:bg-background-light transition-all font-mono"
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default GuestRestrictionDialog;
