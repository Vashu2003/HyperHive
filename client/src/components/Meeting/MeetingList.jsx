const MeetingList = ({
    meetings,
    loading,
    error,
    currentUserId,
    onEndMeeting,
    onJoinMeeting,
  }) => {
    const now = new Date();
    
    // Exclude ended meetings explicitly
    const activeMeetings = meetings.filter((m) => m.active);

    const liveMeetings = activeMeetings.filter(
      (m) => m.status === "live" || new Date(m.scheduledAt) <= now
    );
  
    const upcomingMeetings = activeMeetings.filter(
      (m) => m.status === "scheduled" && new Date(m.scheduledAt) > now
    );
  
    const renderMeeting = (meeting, isLive) => {
      const isHost = currentUserId === meeting.host?._id;
  
      return (
        <li
          key={meeting._id}
          className={`p-4 rounded-xl font-mono ${
            isLive
              ? "bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark border border-border-dark dark:border-border-light hover:bg-transparent dark:hover:bg-transparent transition-all duration-300 ease-in-out hover:shadow-md"
              : "bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark border border-border-dark dark:border-border-light hover:bg-transparent dark:hover:bg-transparent transition-all duration-300 ease-in-out hover:shadow-md"
          }`}
        >
          <p className="font-semibold">{meeting.title}</p>
          <p className="text-sm">
            {isLive
              ? `Started at: ${new Date(meeting.scheduledAt).toLocaleString()}`
              : `Scheduled for: ${new Date(meeting.scheduledAt).toLocaleString()}`}
          </p>
      
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => onJoinMeeting(meeting)}
              className="bg-primary dark:bg-primary-dark text-text-dark dark:text-text-light px-3 py-1 rounded-xl hover:opacity-90 transition-colors duration-200"
            >
              Join
            </button>
      
            {/* {isHost && isLive && meeting.active && (
              <button
                onClick={() => onEndMeeting(meeting._id)}
                className="bg-border-light dark:bg-border-dark text-background-light dark:text-background-dark px-3 py-1 rounded-xl hover:opacity-90 transition-colors duration-200"
              >
                End
              </button>
            )} */}
          </div>
        </li>
      );
    };
  
    return (
      <div className="mt-6 space-y-6 font-mono text-text-light dark:text-text-dark">
        {loading && <p className="text-sm text-gray-500">Loading meetings...</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {!loading && meetings.length === 0 && (
          <p className="text-sm text-gray-500">No meetings found for this group.</p>
        )}
    
        {liveMeetings.length > 0 && (
          <div>
            <h3 className="text-md font-semibold mb-2">Live / Ongoing</h3>
            <ul className="space-y-2">
              {liveMeetings.map((m) => renderMeeting(m, true))}
            </ul>
          </div>
        )}
    
        {upcomingMeetings.length > 0 && (
          <div>
            <h3 className="text-md font-semibold mb-2">Upcoming</h3>
            <ul className="space-y-2">
              {upcomingMeetings.map((m) => renderMeeting(m, false))}
            </ul>
          </div>
        )}
      </div>
    );
    
  };
  
  export default MeetingList;
  