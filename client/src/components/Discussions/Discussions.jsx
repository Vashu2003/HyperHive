import React, { useEffect, useRef, useState } from "react";
import createSocketConnection from "../../socket";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../api/axios";

const Discussions = ({ groupId }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [typingUsers, setTypingUsers] = useState([]);
  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  // Fetch existing messages on groupId change
  useEffect(() => {
    const fetchMessages = async () => {
      if (!groupId) return;
      try {
        const res = await axiosInstance.get(`/api/chat/${groupId}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };
    fetchMessages();
  }, [groupId]);

  // Setup socket connection and listeners
  useEffect(() => {
    if (!user || !groupId) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    // If socket already exists, leave previous room & reuse
    if (!socketRef.current) {
      socketRef.current = createSocketConnection(token);
      socketRef.current.connect();
    }
    const socket = socketRef.current;

    socket.emit("leaveRoom", groupId); // leave previous if any
    socket.emit("joinRoom", groupId);

    // Remove previous listeners before adding new ones
    socket.off("receiveMessage");
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.off("userTyping");
    socket.on("userTyping", (typingUser) => {
      if (typingUser._id === user._id) return;
      setTypingUsers((prev) => {
        if (prev.find((u) => u._id === typingUser._id)) return prev;
        return [...prev, typingUser];
      });
      setTimeout(() => {
        setTypingUsers((prev) => prev.filter((u) => u._id !== typingUser._id));
      }, 3000);
    });

    return () => {
      if (socketRef.current && socketRef.current.connected) {
        socketRef.current.emit("leaveRoom", groupId);
        socketRef.current.disconnect();
      }
      socketRef.current = null;
    };
  }, [user, groupId]);

  // Emit typing event while typing
  const handleTyping = () => {
    if (!socketRef.current) return;
    socketRef.current.emit("typing", { groupId });
  };

  // Send message (server echoes back)
  const sendMessage = () => {
    if (!newMessage.trim() || !socketRef.current) return;

    socketRef.current.emit("sendMessage", {
      groupId,
      message: newMessage,
    });

    setNewMessage("");
  };

  const userColors = {};
  const getUserColor = (userId) => {
    if (!userId) return "#888";
    if (!userColors[userId]) {
      const colors = [
        "#ef4444",
        "#f97316",
        "#eab308",
        "#22c55e",
        "#3b82f6",
        "#a855f7",
        "#ec4899",
      ];
      let hash = 0;
      for (let i = 0; i < userId.length; i++) {
        hash = userId.charCodeAt(i) + ((hash << 5) - hash);
      }
      const index = Math.abs(hash) % colors.length;
      userColors[userId] = colors[index];
    }
    return userColors[userId];
  };

  // Auto scroll to bottom on messages update
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-mono flex flex-col h-fit rounded-xl">
      <div className="relative p-4 font-mono max-h-[490px] overflow-y-auto scrollbar-thin scrollbar-thumb-muted-dark dark:scrollbar-thumb-muted-light scrollbar-track-muted-light dark:scrollbar-track-muted-dark space-y-4">
        {messages.length === 0 ? (
          <p className="text-muted-light dark:text-muted-dark italic">
            No messages yet.
          </p>
        ) : (
          messages.map((msg, index) => {
            const isCurrentUser = msg.sender?._id === user._id;
            const userColor = getUserColor(msg.sender?._id);

            return (
              <div
                key={index}
                className={`flex h-fit ${
                  isCurrentUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className="p-3 rounded-xl max-w-[70%] bg-muted-light dark:bg-muted-dark"
                  // style={{ backgroundColor: userColor}}
                >
                  <strong
                    className="block text-xs font-mono mb-1 text-text-light dark:text-text-dark"
                    style={{ color: userColor }}
                  >
                    {isCurrentUser ? "You" : msg.sender?.name || "Anonymous"}
                  </strong>
                  <p className="text-m font-mono">{msg.text}</p>
                  <span className="text-xs font-mono ml-2 text-gray-500">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            );
          })
        )}
        {typingUsers.length > 0 && (
          <div className="italic text-xs font-mono px-2">
            {typingUsers.map((u, idx) => (
              <span key={u._id} style={{ color: getUserColor(u._id) }}>
                {u.name}
                {idx < typingUsers.length - 1 ? ", " : " "}
              </span>
            ))}
            {typingUsers.length === 1 ? "is" : "are"} typing...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-3 mt-4 p-4">
        <input
          type="text"
          className="flex-grow border border-border-light dark:border-border-dark rounded-xl px-4 py-2 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            handleTyping();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          className="bg-muted-light dark:bg-muted-dark hover:bg-muted-light/70 dark:hover:bg-muted-dark/70 text-text-light dark:text-text-dark px-6 py-2 rounded-xl transition"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Discussions;
