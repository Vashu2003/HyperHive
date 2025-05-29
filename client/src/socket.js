import { io } from "socket.io-client";

// Function to create a new socket connection with the given token
const createSocketConnection = (token) => {
  return io("https://hyperhive-backend.onrender.com", {
    transports: ["websocket"],
    reconnectionAttempts: 5,
    autoConnect: false, // manual connect
    auth: {
      token,
    },
  });
};

export default createSocketConnection;
