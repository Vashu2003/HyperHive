import React from "react";

const statusColors = {
  "Pending": "text-error dark:text-error-dark",
  "In-Progress": "text-primary dark:text-primary-dark",
  "Completed": "text-success dark:text-success-dark",
};

const getFormattedStatus = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "Pending";
    case "inprogress":
      return "In-Progress";
    case "completed":
      return "Completed";
    default:
      return status;
  }
};

const TaskItem = ({ task }) => {
  const status = getFormattedStatus(task.status) || "Pending";
  const statusColor = statusColors[status] || "text-gray-500";

  return (
    <div className="p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex flex-col">
        <h3 className="font-mono font-semibold text-text-light dark:text-text-dark">
          {task.title}
        </h3>
        <p className="text-sm text-text-light dark:text-text-dark">
          {task.description}
        </p>
        <p className="font-mono text-sm font-semibold text-text-light dark:text-text-dark">
          Assigned to: {task.assignedTo?.name || "Unassigned"}
        </p>
      </div>
      <div className="flex items-center gap-2 sm:mt-0 flex-col">
        <h3 className={`font-mono text-md font-semibold ${statusColor}`}>
          {status}
        </h3>
        <p className="text-xs font-mono text-text-light dark:text-text-dark">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default TaskItem;
