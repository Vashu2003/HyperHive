import React from "react";
import { Trash2, Pencil, Save } from "lucide-react";

const GroupActions = ({ isEditing, setIsEditing, handleUpdateGroup, handleDeleteGroup }) => (
  <div className="flex space-x-4 mt-4 font-mono">
    {isEditing ? (
      <button
        onClick={handleUpdateGroup}
        title="Save Changes"
        className="p-2 rounded-2xl bg-success hover:bg-green-600 dark:bg-success-dark dark:hover:bg-green-500 text-white shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95"
      >
        <Save className="w-5 h-5" />
      </button>
    ) : (
      <button
        onClick={() => setIsEditing(true)}
        title="Edit Group"
        className="p-2 rounded-2xl bg-primary hover:bg-primary-hover dark:bg-primary-dark dark:hover:bg-primary-hover-dark text-text-dark dark:text-text-light shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95"
      >
        <Pencil className="w-5 h-5" />
      </button>
    )}

    <button
      onClick={handleDeleteGroup}
      title="Delete Group"
      className="p-2 rounded-2xl bg-error hover:bg-red-600 dark:bg-error-dark dark:hover:bg-red-500 text-white shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  </div>
);

export default GroupActions;
