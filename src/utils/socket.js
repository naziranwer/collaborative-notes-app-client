import { io } from "socket.io-client";
import { socketURL } from "./constant";

const socket = io(socketURL, {
  transports: ["websocket"], // Ensures WebSocket transport is used
});

export default socket;
