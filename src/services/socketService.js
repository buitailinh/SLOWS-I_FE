import { io } from "socket.io-client";


class SocketService {
  constructor() {
    this.socket = io(import.meta.env.VITE_SOCKET_HOST, {
      autoConnect: false,
    });
  }

  connectWithAuthToken(token) {
    this.socket.auth = { token };
    this.socket.connect();
  }

  getSocket() {
    return this.socket();
  }
  
  disconnect() {
    this.socket.disconnect();
  }

  sendMessage(data) {
    this.socket.emit("message", data);
  }

  notifyTyping(roomId) {
    this.socket.emit("isTyping", roomId);
  }

  subscribeToMessages(messageHandler) {
    this.socket.on("message", messageHandler);
  }

  subscribeToTypingNotifications(typingNotificationsHandler) {
    this.socket.on("isTyping", typingNotificationsHandler);
  }

  joinRoom(roomId) {
    this.socket.emit("join", roomId);
  }

  leaveRoom(roomId) {
    this.socket.emit("leave", roomId);
  }
}

export const socketService = new SocketService();
