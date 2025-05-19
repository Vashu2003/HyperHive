import React from "react";

const GroupActions = ({ isEditing, setIsEditing, handleUpdateGroup, handleDeleteGroup }) => (
  <div className="flex space-x-4 mt-4">
    {isEditing ? (
      <button
        onClick={handleUpdateGroup}
        className="px-4 py-2 dark:bg-background-dark dark:text-text-dark bg-muted-light text-text-light rounded-lg border hover:border-muted-dark dark:hover:border-muted-light transition-all"
      >
        Save
      </button>
    ) : (
      <button
        onClick={() => setIsEditing(true)}
        className="px-4 py-2 dark:bg-background-dark dark:text-text-dark bg-muted-light text-text-light rounded-lg border hover:border-muted-dark dark:hover:border-muted-light transition-all"
      >
        Edit
      </button>
    )}
    <button
      onClick={handleDeleteGroup}
      className="px-4 py-2 dark:bg-background-dark dark:text-text-red-700 bg-muted-light text-red-500 rounded-lg border hover:border-muted-dark dark:hover:border-muted-light transition-all"
    >
      Delete
    </button>
  </div>
);

export default GroupActions;
