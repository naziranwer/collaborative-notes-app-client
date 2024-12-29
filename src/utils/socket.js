import { io } from "socket.io-client";

const socket = io("https://collaborative-notes-app-server.onrender.com", {
  transports: ["websocket"], // Ensures WebSocket transport is used
});

export default socket;
