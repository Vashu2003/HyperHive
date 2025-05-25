import React, { useState, useEffect } from "react";
import { X, Check, Plus, Loader } from "lucide-react";
const NotesUploadModal = ({ isOpen, onClose, onSubmit, initialData = null, loading = false, error = "" }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setContent(initialData.content || "");
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) formData.append("file", file); // Only include file if a new one is selected

    await onSubmit(formData);

    setTitle("");
    setContent("");
    setFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background-light dark:bg-background-dark rounded-2xl w-full max-w-md p-6 mx-4 shadow-lg">
        <h2 className="text-xl font-semibold text-text-light dark:text-text-dark mb-4">
          {initialData ? "Edit Attachment" : "Upload Attachment"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-text-light dark:text-text-dark mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-border-light dark:border-border-dark rounded-xl bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-text-light dark:text-text-dark mb-1">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border border-border-light dark:border-border-dark rounded-xl bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={5}
              required
            />
          </div>
          <div>
            <label className="block text-text-light dark:text-text-dark mb-1">File (optional)</label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.md,.txt"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-text-light dark:text-text-dark"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="font-semibold font-mono px-4 py-2 rounded-xl bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark hover:bg-background-light dark:hover:bg-background-dark transition"
            >
              <X
                className="w-5 h-5"
                color="red"
              />
            </button>
            <button
              type="submit"
              className="font-semibold font-mono px-4 py-2 rounded-xl bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark hover:bg-background-light dark:hover:bg-background-dark transition"
              disabled={loading}
            >
              {loading ? (
                <Loader
                  className="w-5 h-5"
                  color="blue"
                />
              ) : initialData ? (
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotesUploadModal;
