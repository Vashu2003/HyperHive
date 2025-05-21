import React, { useEffect, useRef, useState } from "react";
import {
  endMeeting,
  muteParticipant,
  unmuteParticipant,
  removeParticipant,
  approveJoinRequest,
  rejectJoinRequest,
  getMeetingById,
} from "../../services/meetingService";

const domain = "meet.jit.si";

const JitsiMeeting = ({
  jitsiRoomId,
  meeting,
  currentUserId,
  hostId,
  onClose,
  isHost,
}) => {
  const jitsiContainerRef = useRef(null);
  const apiRef = useRef(null);
  const [participants, setParticipants] = useState([]);
  const [waitingList, setWaitingList] = useState([]);
  const [mutedParticipants, setMutedParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [jitsiReady, setJitsiReady] = useState(false);

  const getParticipantId = (p) => p._id || p.id || p;

  const fetchMeetingData = async () => {
    try {
      const meetingData = await getMeetingById(meeting._id);
      if (!meetingData) {
        setError("Meeting not found");
        return;
      }
      setParticipants(meetingData.participants || []);
      setWaitingList(meetingData.waitingList || []);
      setMutedParticipants(meetingData.mutedParticipants || []);
    } catch {
      setError("Failed to fetch meeting data");
    }
  };

  const setupJitsiListeners = () => {
    if (!apiRef.current) return;

    const api = apiRef.current;

    const onParticipantJoined = (event) => {
      setParticipants((prev) => {
        if (prev.some((p) => getParticipantId(p) === event.id)) return prev;
        return [...prev, event];
      });
    };

    const onParticipantLeft = (event) => {
      setParticipants((prev) =>
        prev.filter((p) => getParticipantId(p) !== event.id)
      );
      setMutedParticipants((prev) => prev.filter((id) => id !== event.id));
    };

    const onAudioMuteStatusChanged = (event) => {
      setMutedParticipants((prev) => {
        if (event.muted)
          return prev.includes(event.id) ? prev : [...prev, event.id];
        return prev.filter((id) => id !== event.id);
      });
    };

    const onReadyToClose = () => {
      onClose();
    };

    api.addEventListener("participantJoined", onParticipantJoined);
    api.addEventListener("participantLeft", onParticipantLeft);
    api.addEventListener("audioMuteStatusChanged", onAudioMuteStatusChanged);
    api.addEventListener("readyToClose", onReadyToClose);

    return () => {
      api.removeEventListener("participantJoined", onParticipantJoined);
      api.removeEventListener("participantLeft", onParticipantLeft);
      api.removeEventListener(
        "audioMuteStatusChanged",
        onAudioMuteStatusChanged
      );
      api.removeEventListener("readyToClose", onReadyToClose);
    };
  };

  useEffect(() => {
    const loadJitsiScript = () => {
      return new Promise((resolve, reject) => {
        if (window.JitsiMeetExternalAPI) {
          setJitsiReady(true);
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = "https://meet.jit.si/external_api.js";
        script.async = true;
        script.onload = () => {
          setJitsiReady(true);
          resolve();
        };
        script.onerror = () => reject(new Error("Jitsi script failed to load"));
        document.body.appendChild(script);
      });
    };

    loadJitsiScript().catch((err) => {
      console.error(err);
      setError("Failed to load Jitsi");
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log("Ref check after DOM render:", jitsiContainerRef.current);

    if (!jitsiReady || !meeting) return;

    const timeout = setTimeout(() => {
      const container = jitsiContainerRef.current;

      console.log("Deferred container check:", {
        jitsiReady,
        container,
        meeting,
      });

      if (!container) {
        setError("Jitsi container not found in DOM.");
        setLoading(false);
        return;
      }

      const options = {
        roomName: jitsiRoomId,
        parentNode: container,
        configOverwrite: {
          enableWelcomePage: false,
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [
            "microphone",
            "camera",
            "desktop",
            "fullscreen",
            "hangup",
            "chat",
            "settings",
            "raisehand",
            "videoquality",
            "tileview",
          ],
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
        },
        userInfo: {
          email: currentUserId,
          displayName: isHost ? "Host (You)" : "Participant",
        },
        width: "100%",
        height: "480px",
      };

      try {
        apiRef.current = new window.JitsiMeetExternalAPI(domain, options);
        const cleanupListeners = setupJitsiListeners();
        setLoading(false);

        return () => {
          if (cleanupListeners) cleanupListeners();
          if (apiRef.current) {
            apiRef.current.dispose();
            apiRef.current = null;
          }
        };
      } catch (err) {
        console.error("Failed to initialize Jitsi:", err);
        setError("Failed to initialize Jitsi");
        setLoading(false);
      }
    }, 0); // defers to next JS tick

    return () => clearTimeout(timeout);
  }, [jitsiReady, meeting]);

  const handleEndMeeting = async () => {
    try {
      await endMeeting(meeting._id);
      apiRef.current.executeCommand("hangup");
      onClose();
    } catch {
      alert("Failed to end meeting");
    }
  };

  const handleMuteParticipant = async (userId) => {
    try {
      await muteParticipant(meeting._id, userId);
      apiRef.current.executeCommand("muteParticipant", userId);
      setMutedParticipants((prev) =>
        prev.includes(userId) ? prev : [...prev, userId]
      );
    } catch {
      alert("Failed to mute participant");
    }
  };

  const handleUnmuteParticipant = async (userId) => {
    try {
      await unmuteParticipant(meeting._id, userId);
      apiRef.current.executeCommand("unmuteParticipant", userId);
      setMutedParticipants((prev) => prev.filter((id) => id !== userId));
    } catch {
      alert("Failed to unmute participant");
    }
  };

  const handleKickParticipant = async (userId) => {
    try {
      await removeParticipant(meeting._id, userId);
      apiRef.current.executeCommand("kickParticipant", userId);
      setParticipants((prev) =>
        prev.filter((p) => getParticipantId(p) !== userId)
      );
    } catch {
      alert("Failed to kick participant");
    }
  };

  const handleApproveRequest = async (userId) => {
    try {
      await approveJoinRequest(meeting._id, userId);
      setWaitingList((prev) => prev.filter((id) => id !== userId));
      setParticipants((prev) => [
        ...prev,
        { _id: userId, name: `User ${userId}` },
      ]);
    } catch {
      alert("Failed to approve request");
    }
  };

  const handleRejectRequest = async (userId) => {
    try {
      await rejectJoinRequest(meeting._id, userId);
      setWaitingList((prev) => prev.filter((id) => id !== userId));
    } catch {
      alert("Failed to reject request");
    }
  };

  if (loading) {
    return (
      <div
        ref={jitsiContainerRef}
        style={{ display: loading ? "none" : "block" }}
        className="w-full h-[600px] rounded-xl overflow-hidden border border-border-light dark:border-border-dark"
      />
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-600 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="md:flex-row gap-4 p-4 bg-muted-light dark:bg-muted-dark rounded-xl text-text-light dark:text-text-dark">
      <div>
        <div
          ref={jitsiContainerRef}
          className="w-full h-full rounded-xl overflow-hidden border border-border-light dark:border-border-dark"
        />
        {isHost && (
          <button
            onClick={handleEndMeeting}
            className="mt-2 ml-2 bg-border-light dark:bg-border-dark text-text-light dark:text-text-dark px-4 py-2 rounded-xl hover:opacity-90 font-semibold transition duration-200 hover:bg-red-600 dark:hover:bg-red-400 hover:text-text-dark dark:hover:text-text-light"
          >
            End Meeting
          </button>
        )}
      </div>
    </div>
  );
};

export default JitsiMeeting;
