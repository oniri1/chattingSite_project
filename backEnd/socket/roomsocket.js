import { Server } from "socket.io";
import { mongoAddData, mongoGetData } from "../mongoDB/mongoClient.js";

const rooms = [{ id: 1 }, { id: 2 }, { id: 3 }]; //나중에 디비에서 뽑아옴

export default (server) => {
  const io = new Server(server, { path: "/socket.io" });

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

      //채팅 뽑아오기 이벤트
      socket.on("chatLoad", async (data) => {
        try {
          let { time } = data;
          const { roomId } = data;

          // console.log(time, roomId);
          //test code

          let dataFromMongo = [];
          for (
            ;
            dataFromMongo[0] == undefined && time > 1715565537840;
            time -= 3600000
          ) {
            // console.log("start", roomId, time);
            dataFromMongo = await mongoGetData({
              $and: [
                { roomId: roomId },
                {
                  $and: [
                    { createdAt: { $gte: time - 3600000 } }, //기준 - 1hour
                    { createdAt: { $lte: time } }, //Date now 기준
                  ],
                },
              ],
            });

            dataFromMongo.reverse();
            // console.log(test);
          }

          dataFromMongo.forEach((temp) => {
            // console.log({ ...temp });
            room.emit("chatloading", temp);
          });

          dataFromMongo = [];
          // console.log(test);
        } catch (err) {
          console.log("roomsocket.js err@@@@", err);
        }
      });
    });
  }
};
