import React, { useState, useEffect } from "react";
import CreateMeeting from "./CreateMeeting";
import MeetingList from "./MeetingList";
import { getMeetingsForGroup, endMeeting } from "../../services/meetingService";
import { useAuth } from "../../context/AuthContext";
import JitsiMeeting from "./JitsiMeeting";
import { Plus, X } from "lucide-react";
const Meeting = ({ groupId }) => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [activeMeeting, setActiveMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const toggleForm = () => setShowForm((prev) => !prev);

  const fetchMeetings = async () => {
    setLoading(true);
    try {
      const data = await getMeetingsForGroup(groupId);
      setMeetings(data);
    } catch (err) {
      console.error("Failed to fetch meetings:", err);
      setError("Failed to load meetings.");
    } finally {
      setLoading(false);
    }
  };

  const handleMeetingCreated = () => {
    setShowForm(false);
    fetchMeetings();
  };

  const handleEndMeeting = async (meetingId) => {
    try {
      setMeetings((prev) => {
        const filtered = prev.filter((m) => m._id !== meetingId);
        return filtered;
      });
    } catch (err) {
      console.error("Failed to end meeting:", err);
    }
  };

  const handleJoinMeeting = (meeting) => {
    setActiveMeeting(meeting);
  };

  useEffect(() => {
    if (groupId) fetchMeetings();
  }, [groupId]);

  return (
    <div className="bg-background-light dark:bg-background-dark p-6 text-text-light dark:text-text-dark rounded-xl  font-mono">
      {!activeMeeting ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Meetings</h2>
            <button
              onClick={toggleForm}
              className="bg-muted-light dark:bg-muted-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark p-2 rounded-xl transition-colors duration-200 hover:bg-muted hover:dark:bg-border-dark"
              >
              {showForm ? (
                <>
                <X className="w-5 h-5" color="red" />
                </>
              ) : (
                <>
                <Plus className="w-5 h-5" color="blue" />
                </>
              )}
            </button>
          </div>
  
          {showForm && (
            <CreateMeeting
              groupId={groupId}
              onMeetingCreated={handleMeetingCreated}
            />
          )}
  
          <MeetingList
            meetings={meetings}
            loading={loading}
            error={error}
            currentUserId={user?._id}
            onEndMeeting={handleEndMeeting}
            onJoinMeeting={handleJoinMeeting}
          />
        </>
      ) : (
        <JitsiMeeting
          jitsiRoomId={activeMeeting.jitsiRoomId}
          meeting={activeMeeting}
          currentUserId={user._id}
          hostId={activeMeeting.host ? activeMeeting.host._id : null}
          isHost={
            activeMeeting.host ? user._id === activeMeeting.host._id : false
          }
          onClose={() => setActiveMeeting(null)}
        />
      )}
    </div>
  );  
};

export default Meeting;
