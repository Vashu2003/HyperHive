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
        <li key={task._id} className="rounded-xl p-2 bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark border border-border-dark dark:border-border-light hover:bg-transparent dark:hover:bg-transparent transition-all duration-300 ease-in-out hover:shadow-md">
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
