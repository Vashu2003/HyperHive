import React, { useState, useEffect } from "react";
import CreateMeeting from "./CreateMeeting";
import MeetingList from "./MeetingList";
import { getMeetingsForGroup } from "../../services/meetingService";
import { useAuth } from "../../context/AuthContext";
import JitsiMeeting from "./JitsiMeeting";
import { Plus, X, AppWindow } from "lucide-react";
import GuestRestrictionDialog from "../GuestRestrictionDialog";

const Meeting = ({ groupId }) => {
  const { user } = useAuth();
  const { isGuest } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [activeMeeting, setActiveMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showGuestDialog, setShowGuestDialog] = useState(false);

  const toggleForm = () => {
    if (isGuest) {
      setShowGuestDialog(true);
    } else {
      setShowModal((prev) => !prev);
    }
  };
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
    setShowModal(false);
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
    <div className="h-[700px] p-4 text-text-light dark:text-text-dark rounded-xl font-mono overflow-y-auto scrollbar-thin scrollbar-thumb-muted-dark dark:scrollbar-thumb-muted-light scrollbar-track-muted-light dark:scrollbar-track-muted-dark">
      {!activeMeeting ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex font-mono items-center gap-2">
              <AppWindow className="w-6 h-6 text-primary dark:text-primary-dark" />
              Meetings
            </h2>
            <button
              onClick={toggleForm}
              className="p-2 bg-primary dark:bg-primary-dark text-text-dark dark:text-text-light rounded-lg hover:bg-primary-hover/70 dark:hover:bg-primary-hover-dark/70 transition"
            >
              {showModal ? (
                <>
                  <X className="w-5 h-5" color="red" />
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" color="currentColor" />
                </>
              )}
            </button>
          </div>

          {showModal && (
            <CreateMeeting
              isOpen={showModal}
              groupId={groupId}
              onMeetingCreated={handleMeetingCreated}
              onClose={() => setShowModal(false)}
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

      {showGuestDialog && (
        <GuestRestrictionDialog
          isOpen={showGuestDialog}
          onClose={() => setShowGuestDialog(false)}
        />
      )}
    </div>
  );
};

export default Meeting;
