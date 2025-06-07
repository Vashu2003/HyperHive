import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import TaskFormModal from "./TaskFormModal";
import { useGroups } from "../../context/GroupContext";
import { useAuth } from "../../context/AuthContext";
import GuestRestrictionDialog from "../GuestRestrictionDialog";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask as deleteTaskService,
} from "../../services/taskService";
import { Plus, ClipboardList } from "lucide-react";
const Tasks = ({ groupId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const { groupMembers, fetchGroupMembers } = useGroups();
  const [users, setUsers] = useState([]);
  const [showGuestDialog, setShowGuestDialog] = useState(false);
  const { isGuest } = useAuth();

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
    fetchGroupMembers(groupId);
    // console.log(groupMembers);
  }, [groupId]);

  useEffect(() => {
    setUsers(groupMembers);
  }, [groupMembers]);

  const handleSubmit = async (taskData) => {
    if (isGuest) return setShowGuestDialog(true);

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
    if (isGuest) return setShowGuestDialog(true);
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
    if (isGuest) return setShowGuestDialog(true);
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancel = () => {
    if (isGuest) return setShowGuestDialog(true);
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="relative p-2 font-mono text-text-light dark:text-text-dark h-[650px] overflow-y-auto scrollbar-thin scrollbar-thumb-muted-dark dark:scrollbar-thumb-muted-light scrollbar-track-muted-light dark:scrollbar-track-muted-dark">
      <div className="flex justify-between items-center mb-4 p-2">
        <h2 className="text-xl font-bold flex font-mono items-center gap-2 text-text-light dark:text-text-dark">
          <ClipboardList className="w-6 h-6 text-primary dark:text-primary-dark" />
          Tasks
        </h2>
        <button
          onClick={() => {
            if (isGuest) return setShowGuestDialog(true);
            setShowForm(true);
            setEditingTask(null);
          }}
          className="p-2 bg-primary text-background-light dark:bg-primary-dark dark:text-background-dark rounded-lg hover:bg-primary/70 dark:hover:bg-primary-dark/70 transition"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {showForm && (
        <div className="">
          <TaskFormModal
            visible={showForm}
            onClose={handleCancel}
            onSubmit={handleSubmit}
            initialData={editingTask || {}}
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
      {/* ✅ Guest Restriction Dialog */}
      <GuestRestrictionDialog
        isOpen={showGuestDialog}
        onClose={() => setShowGuestDialog(false)}
      />
    </div>
  );
};

export default Tasks;
