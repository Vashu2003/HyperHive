import React from "react";

const statusColors = {
  pending: "text-yellow-500",
  inProgress: "text-blue-500",
  completed: "text-green-500",
};

const TaskItem = ({ task }) => {
  const status = task.status || "pending";
  const statusColor = statusColors[status] || "text-gray-500";

  return (
    <div className="bg-background-light dark:bg-background-dark p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex flex-col">
        <h3 className="font-mono font-semibold text-text-light dark:text-text-dark">{task.title}</h3>
        <p className="text-sm text-text-light dark:text-text-dark">{task.description}</p>
        <p className="text-xs font-mono font-semibold text-text-light dark:text-text-dark mt-1">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      </div>
      <div className="flex items-center gap-4 mt-2 sm:mt-0">
        <span className={`font-mono text-sm font-semibold ${statusColor}`}>
          {status}
        </span>
        <span className="font-mono text-sm font-semibold text-text-light dark:text-text-dark">
          Assigned to: {task.assignedTo?.name || "Unassigned"}
        </span>
      </div>
    </div>
  );
};

export default TaskItem;
