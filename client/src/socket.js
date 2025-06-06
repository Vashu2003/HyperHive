import { io } from "socket.io-client";

// Function to create a new socket connection with the given token
const createSocketConnection = (token) => {
  return io(import.meta.env.VITE_API_BASE_URL, {
    transports: ["websocket"],
    reconnectionAttempts: 5,
    autoConnect: false, // manual connect
    auth: {
      token,
    },
  });
};

export default createSocketConnection;
