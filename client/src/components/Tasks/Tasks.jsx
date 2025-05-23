import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import { useGroups } from "../../context/GroupContext";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask as deleteTaskService,
} from "../../services/taskService";
import { Plus } from "lucide-react";
const Tasks = ({ groupId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const { nonMembers, fetchNonMembers } = useGroups();
  const [users, setUsers] = useState([]);

  // Fetch tasks and users
  const loadTasks = async () => {
    if (!groupId) return;
    setLoading(true);
    setError(null);

    try {
      const data = await getTasks(groupId);
      // Sort by dueDate ascending
      data.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!groupId) return;
    loadTasks();
    fetchNonMembers(groupId);
  }, [groupId]);

  useEffect(() => {
    setUsers(nonMembers);
  }, [nonMembers]);

  const handleSubmit = async (taskData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask._id, taskData);
      } else {
        await createTask(groupId, taskData);
      }
      setShowForm(false);
      setEditingTask(null);
      loadTasks();
    } catch (err) {
      console.error(err);
      setError("Failed to save task.");
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTaskService(taskId);
      loadTasks();
    } catch (err) {
      console.error(err);
      setError("Failed to delete task.");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="relative p-4 font-mono text-text-light dark:text-text-dark max-h-[580px] overflow-y-auto scrollbar-thin scrollbar-thumb-muted-dark dark:scrollbar-thumb-muted-light scrollbar-track-muted-light dark:scrollbar-track-muted-dark">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Tasks</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingTask(null);
          }}
          className="p-2 border bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark rounded-lg hover:bg-muted-light/70 dark:hover:bg-muted-dark/70 transition"
        >
          <Plus className="w-5 h-5" color="blue" />
        </button>
      </div>

      {showForm && (
        <div className="absolute inset-0 bg-black/50 flex flex-col gap-2 z-10">
          <TaskForm
            initialData={editingTask || {}}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            users={users}
          />
        </div>
      )}

      <TaskList
        tasks={tasks}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Tasks;
