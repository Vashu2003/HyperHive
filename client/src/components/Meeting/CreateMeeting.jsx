import { useState } from "react";
import { createMeeting } from "../../services/meetingService";

const CreateMeeting = ({ groupId, onMeetingCreated }) => {
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
      onMeetingCreated?.(newMeeting); // callback to parent
      setTitle("");
      setScheduledAt("");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create meeting");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-muted-light dark:bg-muted-dark p-6 rounded-xl shadow-md w-full max-w-md mx-auto font-mono">
      <h2 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">
        Create New Meeting
      </h2>
  
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
  
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-text-light dark:text-text-dark mb-1">
            Meeting Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
  
        <div>
          <label className="block text-sm text-text-light dark:text-text-dark mb-1">
            Scheduled At
          </label>
          <input
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
  
        <button
          type="submit"
          disabled={loading}
          className="bg-background-dark dark:bg-background-light border border-border-light dark:border-border-dark text-text-dark dark:text-text-light px-4 py-2 rounded-xl transition-colors duration-200 hover:bg-muted-dark hover:dark:bg-muted-ligh"
        >
          {loading ? "Creating..." : "Create Meeting"}
        </button>
      </form>
    </div>
  );  
};

export default CreateMeeting;
