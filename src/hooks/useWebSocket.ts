import { io, Socket } from "socket.io-client";

let socket: Socket;

export const initiateSocket = (chatId: string) => {
  socket = io("http://localhost:4000");
  socket.emit("join", { chatId });
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

export const sendMessage = (chatId: string, message: string) => {
  if (socket) socket.emit("message", { chatId, message });
};

export const subscribeToMessages = (callback: (message: string) => void) => {
  if (!socket) return;
  socket.on("message", callback);
};
