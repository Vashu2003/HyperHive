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
      setError("Group name is required.");
      return;
    }

    try {
      await createGroup({ name, description });
      setName("");
      setDescription("");
      onClose(); // Close modal
    } catch (err) {
      setError("Failed to create group. Try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-background-light dark:bg-background-dark rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-lg font-semibold font-mono mb-4 text-text-light dark:text-text-dark">
          Create New Project
        </h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-mono mb-1 text-text-light dark:text-text-dark">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="font-mono w-full px-3 py-2 rounded-md bg-muted-light dark:bg-muted-dark border border-border-light dark:border-border-dark focus:outline-none"
              placeholder="Enter project name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-mono mb-1 text-text-light dark:text-text-dark">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="font-mono w-full px-3 py-2 rounded-md bg-muted-light dark:bg-muted-dark border border-border-light dark:border-border-dark focus:outline-none"
              placeholder="Enter project description"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="font-mono px-4 py-2 bg-muted-light dark:bg-muted-dark text-red-500 hover:text-red-600 rounded-xl hover:bg-muted-light/70 dark:hover:bg-muted-dark/70 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="font-mono px-4 py-2 bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark rounded-xl hover:bg-muted-light/70 dark:hover:bg-muted-dark/70 transition"
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
