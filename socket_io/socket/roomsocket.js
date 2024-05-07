const SocketIO = require("socket.io");

module.exports = (server) => {
  const io = SocketIO(server, { path: "/socket.io" });

  // 네임스페이스 등록
  const chat = io.of("/chat");

  // chat 네임스페이스 전용 이벤트
  chat.on("connection", (socket) => {
    console.log("chat 네임스페이스에 접속");

    socket.on("disconnect", () => {
      console.log("chat 네임스페이스 접속 해제");
      socket.leave("chat");
    });

    socket.on("chatReply", (data) => {
      //보내기
      chat.emit("chat", `${socket.id}:${data}`);
      // room.emit("room", "room hi");
    });

    // chat.emit("chat", "chat socket"); // 같은 chat 네임스페이스 소켓으로만 이벤트가 날라간다.
  });
};

// const room = io.of("/room");

// // room 네임스페이스 전용 이벤트
// room.on("connection", (socket) => {
//   console.log("room 네임스페이스에 접속");

//   socket.on("disconnect", () => {
//     console.log("room 네임스페이스 접속 해제");
//     socket.leave("room");
//   });

//   room.emit("room", "room socket"); // 같은 room 네임스페이스 소켓으로만 이벤트가 날라간다.

//   // room.emit("chat", "room chat");
// });
