const SocketIO = require("socket.io");
const { mongoAddData } = require("../mongoDB/mongoClient.js");
const { DATE } = require("sequelize");

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

      socket.on("chatReply", async (data) => {
        try {
          // console.log(`${socket.id}:${data}`);
          // console.log(JSON.stringify(`"${socket.id":${data}}`));

          mongoAddData(
            JSON.stringify({
              roomId: id,
              user: socket.id,
              chat: data,
              createdAt: Date.now(),
            })
          );

          // mongoAddData(`{${socket.id}:${data}}`);
          //보내기
          room.emit("chat", `${socket.id}:${data}`);
        } catch (err) {
          console.log("roomsocket.js err@@@@", err);
        }
      });
    });
  }
};
