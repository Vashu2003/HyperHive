import { useState } from "react";
import { createMeeting } from "../../services/meetingService";
import Modal from "../Modal";

const CreateMeeting = ({ groupId, onMeetingCreated, isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const newMeeting = await createMeeting({ groupId, title, scheduledAt });
      onMeetingCreated?.(newMeeting);
      setTitle("");
      setScheduledAt("");
      onClose(); // Close modal after success
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create meeting");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark py-6 px-8 rounded-2xl shadow-2xl w-full max-w-md text-text-light dark:text-text-dark font-mono space-y-4">
        <h2 className="text-xl font-semibold">Create New Meeting</h2>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          {/* Title input */}
          <div>
            <label className="block text-sm mb-1">Meeting Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-muted-light dark:bg-muted-dark w-full px-3 py-2 rounded-xl border border-border-light dark:border-border-dark text-text-light dark:text-text-dark focus:outline-none focus:ring focus:ring-primary font-semibold"
              required
            />
          </div>

          {/* Date/time input */}
          <div>
            <label className="block text-sm mb-1">Scheduled At</label>
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="bg-muted-light dark:bg-muted-dark w-full px-3 py-2 rounded-xl border border-border-light dark:border-border-dark text-text-light dark:text-text-dark focus:outline-none focus:ring focus:ring-primary font-semibold"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="font-semibold bg-error dark:bg-error-dark border border-border-light dark:border-border-dark text-text-dark dark:text-text-light px-4 py-2 rounded-xl transition-colors duration-200 hover:bg-error/70 dark:hover:bg-error-dark/70"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="font-semibold bg-primary dark:bg-primary-dark border border-border-light dark:border-border-dark text-text-dark dark:text-text-light px-4 py-2 rounded-xl transition-colors duration-200 hover:bg-primary-hover dark:hover:bg-primary-hover-dark"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default CreateMeeting;
