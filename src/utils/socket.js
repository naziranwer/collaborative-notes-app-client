import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"], // Ensures WebSocket transport is used
});

export default socket;
