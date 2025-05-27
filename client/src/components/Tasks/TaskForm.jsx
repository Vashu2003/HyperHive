import React, { useState } from "react";
import { Check, Plus, X } from "lucide-react";
const TaskForm = ({ onSubmit, onCancel, initialData = {}, users = [] }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [dueDate, setDueDate] = useState(
    initialData.dueDate ? initialData.dueDate.slice(0, 10) : ""
  );
  const [assignedTo, setAssignedTo] = useState(
    initialData.assignedTo?._id || ""
  );
  const [status, setStatus] = useState(initialData.status || "pending");

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!dueDate) newErrors.dueDate = "Due date is required";
    if (!assignedTo) newErrors.assignedTo = "Assignee is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await onSubmit({ title, description, dueDate, assignedTo, status });
    } catch (err) {
      console.error(err);
      setSubmitError("Failed to save task. Please try again.");
    }
  };

  // console.log(users);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 m-4 bg-muted-light dark:bg-muted-dark rounded-lg"
    >
      {submitError && (
        <p className="text-red-500 text-sm font-mono">{submitError}</p>
      )}

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-mono mb-1 text-text-light dark:text-text-dark"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setErrors((prev) => ({ ...prev, title: "" }));
          }}
          className="w-full px-3 py-2 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark font-mono focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.title && (
          <p className="text-red-500 text-xs font-mono mt-1">{errors.title}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-mono mb-1 text-text-light dark:text-text-dark"
        >
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark font-mono focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="dueDate"
            className="block text-sm font-mono mb-1 text-text-light dark:text-text-dark"
          >
            Due Date
          </label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => {
              setDueDate(e.target.value);
              setErrors((prev) => ({ ...prev, dueDate: "" }));
            }}
            className="w-full px-3 py-2 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark font-mono focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.dueDate && (
            <p className="text-red-500 text-xs font-mono mt-1">
              {errors.dueDate}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="assignedTo"
            className="block text-sm font-mono mb-1 text-text-light dark:text-text-dark"
          >
            Assign To
          </label>
          <select
            id="assignedTo"
            value={assignedTo}
            onChange={(e) => {
              setAssignedTo(e.target.value);
              setErrors((prev) => ({ ...prev, assignedTo: "" }));
            }}
            className="w-full px-3 py-2 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark font-mono focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Unassigned</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
          {errors.assignedTo && (
            <p className="text-red-500 text-xs font-mono mt-1">
              {errors.assignedTo}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-mono mb-1 text-text-light dark:text-text-dark"
        >
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark font-mono focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="pending">Pending</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button
        type="submit"
        className="p-2 mr-4 w-fit border bg-muted-light dark:bg-muted-dark text-text-dark dark:text-text-light font-bold rounded-lg hover:bg-background-light dark:hover:bg-background-dark transition"
      >
        {initialData._id ? (
          <Check
            className="w-5 h-5"
            color="green"
          />
        ) : (
          <Plus
            className="w-5 h-5"
            color="blue"
          />
        )}
      </button>
      {onCancel && (
        <button
          onClick={onCancel}
          className="p-2 w-fit border bg-muted-light dark:bg-muted-dark text-text-dark dark:text-text-light font-bold rounded-lg hover:bg-background-light dark:hover:bg-background-dark transition"
          >
          <X
            className="w-5 h-5"
            color="red"
          />
        </button>
      )}
    </form>
  );
};

export default TaskForm;
