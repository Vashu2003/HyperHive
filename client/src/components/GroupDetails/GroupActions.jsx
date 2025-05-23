import React from "react";
import { Trash2, Pencil, Save } from "lucide-react";
const GroupActions = ({ isEditing, setIsEditing, handleUpdateGroup, handleDeleteGroup }) => (
  <div className="flex space-x-4 mt-4">
    {isEditing ? (
      <button
        onClick={handleUpdateGroup}
        className="font-mono font-semibold p-2 dark:bg-muted-dark dark:text-text-dark bg-muted-light text-text-light rounded-xl transition-all"
      >
        <Save className="w-5 h-5" />
      </button>
    ) : (
      <button
        onClick={() => setIsEditing(true)}
        className="font-mono font-semibold p-2 dark:bg-muted-dark dark:text-text-dark bg-muted-light text-text-light rounded-xl transition-all"
      >
        <Pencil className="w-5 h-5" />
      </button>
    )}
    <button
      onClick={handleDeleteGroup}
      className="font-mono font-semibold p-2 dark:bg-muted-dark dark:text-text-red-400 bg-muted-light text-red-500 rounded-xl transition-all"
      >
      <Trash2 className="w-5 h-5" />
    </button>
  </div>
);

export default GroupActions;
