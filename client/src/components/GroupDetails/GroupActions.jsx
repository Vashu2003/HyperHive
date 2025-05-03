import React from "react";

const GroupActions = ({ isEditing, setIsEditing, handleUpdateGroup, handleDeleteGroup }) => (
  <div className="flex space-x-4 mt-4">
    {isEditing ? (
      <button
        onClick={handleUpdateGroup}
        className="px-4 py-2 bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark rounded-xl hover:bg-muted-light/70 dark:hover:bg-muted-dark/70 transition"
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
);

export default GroupActions;
