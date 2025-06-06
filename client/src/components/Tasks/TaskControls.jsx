import React from "react";
import { Edit, Trash2 } from "lucide-react";

const TaskControls = ({ onEdit, onDelete }) => {
  return (
    <div className="flex gap-3">
      <button
        onClick={onEdit}
        className="text-primary dark:text-primary-dark transition"
        aria-label="Edit task"
      >
        <Edit className="w-5 h-5" />
      </button>

      <button
        onClick={onDelete}
        className="text-error dark:text-error-dark transition"
        aria-label="Delete task"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default TaskControls;
