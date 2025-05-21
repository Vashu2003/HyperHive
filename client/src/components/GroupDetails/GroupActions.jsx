import React from "react";

const GroupActions = ({ isEditing, setIsEditing, handleUpdateGroup, handleDeleteGroup }) => (
  <div className="flex space-x-4 mt-4">
    {isEditing ? (
      <button
        onClick={handleUpdateGroup}
        className="font-mono font-semibold px-4 py-2 dark:bg-background-light dark:text-text-light bg-muted-dark text-text-dark rounded-xl border hover:border-muted-dark dark:hover:border-muted-light transition-all"
      >
        Save
      </button>
    ) : (
      <button
        onClick={() => setIsEditing(true)}
        className="font-mono font-semibold px-4 py-2 dark:bg-background-light dark:text-text-light bg-muted-dark text-text-dark rounded-xl border hover:border-muted-dark dark:hover:border-muted-light transition-all"
      >
        Edit
      </button>
    )}
    <button
      onClick={handleDeleteGroup}
      className="font-mono font-semibold px-4 py-2 dark:bg-background-light dark:text-text-red-400 bg-muted-dark text-red-500 rounded-xl border hover:border-muted-dark dark:hover:border-muted-light transition-all"
      >
      Delete
    </button>
  </div>
);

export default GroupActions;
