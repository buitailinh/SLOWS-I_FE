import { io } from "socket.io-client";

const socket = io("http://localhost:8888",{
    auth: {
      accessToken: localStorage.getItem('access_token')
    }
  });

  socket.on("connect", () => {
    console.log("Connected to socket.io server");
  });

  socket.on("disconnect", (reason) => {
    console.log(`Disconnected from socket.io server. Reason: ${reason}`);
  });

export default socket;