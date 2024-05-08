const SocketIO = require("socket.io");

const rooms = [{ id: 1 }, { id: 2 }, { id: 3 }]; //나중에 디비에서 뽑아옴

module.exports = (server) => {
  const io = SocketIO(server, { path: "/socket.io" });

  for (const { id } of rooms) {
    // 네임스페이스 등록
    const room = io.of(`/room/${id}`);

    // chat 네임스페이스 전용 이벤트
    room.on("connection", (socket) => {
      console.log(`chat${id} 네임스페이스에 접속`);

      socket.on("disconnect", () => {
        console.log(`chat${id} 네임스페이스 접속 해제`);
        socket.leave(`/room/${id}`);
      });

      socket.on("chatReply", (data) => {
        //보내기
        room.emit("chat", `${socket.id}:${data}`);
      });
    });
  }
};
