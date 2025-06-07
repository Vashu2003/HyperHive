import React, { useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../Modal"; // make sure this exists and handles `children` properly

const TaskFormModal = ({
  visible,
  onClose,
  onSubmit,
  initialData = {},
  users = [],
}) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [dueDate, setDueDate] = useState(
    initialData.dueDate ? initialData.dueDate.slice(0, 10) : ""
  );
  const [assignedTo, setAssignedTo] = useState(
    initialData.assignedTo?._id || ""
  );
  const [status, setStatus] = useState(initialData.status || "Pending");
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
      onClose(); // close after success
    } catch (err) {
      console.error(err);
      setSubmitError("Failed to save task. Please try again.");
    }
  };

  // 🔎 Keyword to role mapping
  const roleKeywords = {
    frontend: ["frontend", "ui", "css", "react", "html"],
    backend: ["backend", "api", "server", "node", "express"],
    "full stack": ["full stack", "fullstack"],
    devops: ["devops", "docker", "kubernetes", "pipeline", "ci/cd"],
    qa: ["test", "qa", "quality assurance"],
    mobile: ["mobile", "android", "ios", "flutter", "react native"],
    security: ["security", "auth", "authorization", "jwt", "encryption"],
    database: ["database", "sql", "mongo", "db"],
  };

  const getMatchingRoles = (title) => {
    const titleLower = title.toLowerCase();
    const matchedRoles = new Set();

    Object.entries(roleKeywords).forEach(([roleKey, keywords]) => {
      if (keywords.some((keyword) => titleLower.includes(keyword))) {
        matchedRoles.add(roleKey);
      }
    });

    return [...matchedRoles];
  };

  // Normalize string helper (lowercase, remove spaces)
  const normalize = (str) => str.toLowerCase().replace(/\s+/g, "");

  // 🧠 Suggest users based on title input
  const suggestedRoles = getMatchingRoles(title);

  // Debug consoles
  // console.log("Suggested Roles:", suggestedRoles);
  // console.log(
  //   "All Users:",
  //   users.map((u) => ({ name: u.name, role: u.role }))
  // );

  const suggestedUsers = users.filter((user) => {
    if (!user.role || user.name.toLowerCase() === "guest") return false;
    const normalizedUserRole = normalize(user.role);
    return suggestedRoles.some((role) => normalizedUserRole.includes(normalize(role)));
  });

  const otherUsers = users.filter((user) => {
    if (!user.role || user.name.toLowerCase() === "guest") return false;
    const normalizedUserRole = normalize(user.role);
    return !suggestedRoles.some((role) => normalizedUserRole.includes(normalize(role)));
  });

  return (
    <AnimatePresence>
      {visible && (
        <Modal isOpen={visible} onClose={onClose}>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9997]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed z-[9998] top-[15%] left-[28%] -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-xl"
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-4 p-6 bg-background-light dark:bg-background-dark rounded-xl border border-border-light dark:border-border-dark shadow-xl relative"
              onClick={(e) => e.stopPropagation()} // prevent modal close on click inside
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-mono font-semibold text-text-light dark:text-text-dark">
                  {initialData._id ? "Edit Task" : "New Task"}
                </h2>
              </div>

              {submitError && (
                <p className="text-red-500 text-sm font-mono">{submitError}</p>
              )}

              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-mono mb-1 text-text-light dark:text-text-dark"
                >
                  Title
                </label>
                <input
                  id="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setErrors((prev) => ({ ...prev, title: "" }));
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-muted-light dark:bg-muted-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark font-mono focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs font-mono mt-1">
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Description */}
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
                  className="w-full px-3 py-2 rounded-lg bg-muted-light dark:bg-muted-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark font-mono focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark resize-none"
                />
              </div>

              {/* Due Date & Assign To */}
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
                    className="w-full px-3 py-2 rounded-lg bg-muted-light dark:bg-muted-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark font-mono focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
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
                    className="w-full px-3 py-2 rounded-lg bg-muted-light dark:bg-muted-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Unassigned</option>
                    {suggestedUsers.length > 0 && (
                      <optgroup label="Suggested">
                        {suggestedUsers.map((user) => (
                          <option key={user._id} value={user._id}>
                            {user.name} ({user.role})
                          </option>
                        ))}
                      </optgroup>
                    )}

                    <optgroup label="All Members">
                      {otherUsers.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.name} ({user.role})
                        </option>
                      ))}
                    </optgroup>
                  </select>
                  {errors.assignedTo && (
                    <p className="text-red-500 text-xs font-mono mt-1">
                      {errors.assignedTo}
                    </p>
                  )}
                </div>
              </div>

              {/* Status */}
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
                  className="w-full px-3 py-2 rounded-lg bg-muted-light dark:bg-muted-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark font-mono focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
                >
                  <option value="pending">Pending</option>
                  <option value="inProgress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="submit"
                  className="p-2 px-4 font-semibold font-mono bg-primary dark:bg-primary-dark rounded-xl transition text-text-dark dark:text-text-light"
                >
                  {initialData._id ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 px-4 font-semibold font-mono bg-error dark:bg-error-dark rounded-xl transition text-text-dark dark:text-text-light"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default TaskFormModal;
