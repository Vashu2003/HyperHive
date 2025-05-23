import React from "react";

const GroupActions = ({ isEditing, setIsEditing, handleUpdateGroup, handleDeleteGroup }) => (
  <div className="flex space-x-4 mt-4">
    {isEditing ? (
      <button
        onClick={handleUpdateGroup}
        className="font-mono font-semibold px-4 py-2 dark:bg-muted-dark dark:text-text-dark bg-muted-light text-text-light rounded-xl transition-all"
      >
        Save
      </button>
    ) : (
      <button
        onClick={() => setIsEditing(true)}
        className="font-mono font-semibold px-4 py-2 dark:bg-muted-dark dark:text-text-dark bg-muted-light text-text-light rounded-xl transition-all"
      >
        Edit
      </button>
    )}
    <button
      onClick={handleDeleteGroup}
      className="font-mono font-semibold px-4 py-2 dark:bg-muted-dark dark:text-text-red-400 bg-muted-light text-red-500 rounded-xl transition-all"
      >
      Delete
    </button>
  </div>
);

export default GroupActions;
