import React from "react";
import TaskItem from "./TaskItem";
import TaskControls from "./TaskControls";

const TaskList = ({ tasks, loading, error, onEdit, onDelete }) => {
  if (loading) return <p className="p-4 font-mono text-muted-foreground">Loading tasks...</p>;
  if (error) return <p className="p-4 font-mono text-red-500">{error}</p>;
  if (!tasks || tasks.length === 0) return <p className="p-4 font-mono text-muted-foreground">No tasks found.</p>;

  return (
    <ul className="space-y-4 p-4">
      {tasks.map((task) => (
        <li key={task._id} className="border border-border-light dark:border-border-dark rounded-xl p-4 bg-background-light dark:bg-background-dark">
          <TaskItem task={task} />
          <div className="flex justify-end mt-2 gap-2">
            <TaskControls
              onEdit={() => onEdit(task)}
              onDelete={() => onDelete(task._id)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
