import { io } from "socket.io-client";

const socket = io("http://localhost:8888",{
    auth: {
      accessToken: localStorage.getItem(import.meta.env.REACT_APP_NAME_AT_KEY)
    }
  });

  socket.on("connect", () => {
    console.log("Connected to socket.io server");
  });

  socket.on("disconnect", (reason) => {
    console.log(`Disconnected from socket.io server. Reason: ${reason}`);
  });

export default socket;