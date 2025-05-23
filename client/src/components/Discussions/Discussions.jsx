import React, { useEffect, useState, useRef } from "react";
import createSocketConnection from "../../socket";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../api/axios";

const Discussions = ({ groupId }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [typingUsers, setTypingUsers] = useState([]); // Track who is typing
  const [socket, setSocket] = useState(null);
  const typingTimeoutRef = useRef(null);

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

    const socketConnection = createSocketConnection(token);
    setSocket(socketConnection);
    socketConnection.connect();

    socketConnection.emit("joinRoom", groupId);

    // Receive new messages
    const handleReceiveMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    // Receive typing info
    const handleUserTyping = (typingUser) => {
      if (typingUser._id === user._id) return; // Ignore yourself

      setTypingUsers((prev) => {
        if (prev.find((u) => u._id === typingUser._id)) {
          return prev; // already in list
        }
        return [...prev, typingUser];
      });

      // Remove typing user after 3 seconds if no new typing events
      setTimeout(() => {
        setTypingUsers((prev) => prev.filter((u) => u._id !== typingUser._id));
      }, 3000);
    };

    socketConnection.on("receiveMessage", handleReceiveMessage);
    socketConnection.on("userTyping", handleUserTyping);

    return () => {
      socketConnection.off("receiveMessage", handleReceiveMessage);
      socketConnection.off("userTyping", handleUserTyping);
      if (socketConnection && socketConnection.connected) {
        socketConnection.disconnect();
      }
      setSocket(null);
      setTypingUsers([]);
    };
  }, [user, groupId]);

  // Send message
  const sendMessage = () => {
    if (!newMessage.trim() || !socket) return;

    socket.emit("sendMessage", {
      groupId,
      message: newMessage,
    });

    setNewMessage("");
  };

  // Emit typing event while user types
  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    if (!socket) return;

    // Emit typing event with groupId info
    socket.emit("typing", { groupId });

    // Optional: You can debounce or throttle this emit if needed
  };

  return (
    <div className="p-4 text-text-light dark:text-text-dark font-mono flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-2">Discussions</h2>
      <div className="flex-grow overflow-auto border p-2 mb-2">
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <strong>
                {msg.sender?._id === user._id
                  ? "You"
                  : msg.sender?.name || "Anonymous"}
                :
              </strong>{" "}
              {msg.text}
              <div className="text-xs text-gray-500">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Typing indicator */}
      {typingUsers.length > 0 && (
        <div className="mb-2 italic text-gray-500">
          {typingUsers.map((u) => u.name).join(", ")} {typingUsers.length === 1 ? "is" : "are"} typing...
        </div>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-grow border rounded px-2 py-1"
          placeholder="Type your message..."
          value={newMessage}
          onChange={handleTyping}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          className="bg-blue-500 text-white px-4 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Discussions;
