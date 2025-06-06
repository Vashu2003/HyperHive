import React, { useState } from "react";
import { useGroups } from "../context/GroupContext";

const CreateGroupModal = ({ isOpen, onClose }) => {
  const { createGroup } = useGroups();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Project name is required.");
      return;
    }

    try {
      await createGroup({ name, description });
      setName("");
      setDescription("");
      onClose();
    } catch (err) {
      setError("Failed to create project. Try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-background-light dark:bg-background-dark rounded-2xl shadow-2xl w-full max-w-md p-6 relative border border-border-light dark:border-border-dark"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-text-light dark:text-text-dark mb-4 select-none">
          Create New Project
        </h2>

        {error && (
          <p className="text-sm text-error bg-red-100 dark:bg-red-900/20 rounded-md px-3 py-2 mb-4 select-none">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="projectName"
              className="block text-sm font-medium text-text-light dark:text-text-dark mb-1 select-none"
            >
              Project Name <span className="text-error">*</span>
            </label>
            <input
              id="projectName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
              placeholder="Enter project name"
              required
              autoFocus
              aria-describedby={error ? "projectName-error" : undefined}
            />
          </div>

          <div>
            <label
              htmlFor="projectDescription"
              className="block text-sm font-medium text-text-light dark:text-text-dark mb-1 select-none"
            >
              Description
            </label>
            <textarea
              id="projectDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary/60 transition resize-none"
              placeholder="Enter project description (optional)"
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-error hover:text-red-600 bg-muted-light dark:bg-muted-dark rounded-xl hover:bg-muted-light/70 dark:hover:bg-muted-dark/70 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-primary hover:bg-primary-hover rounded-xl transition"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
