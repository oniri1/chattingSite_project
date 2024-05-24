import { Server } from "socket.io";
import {
  mongoAddData,
  mongoGetData,
  mongoGetDataOne,
} from "../mongoDB/mongoClient.js";

const chatEleCreater = (data) => {
  console.log("data", data);
  return `<div>${data.user}:${data.chat} , createdAt : ${data.createdAt}</div>`;
};

export default (server) => {
  const io = new Server(server, {
    cors: { origin: "http://localhost" },
    path: "/socket.io",
  });

  // 네임스페이스 등록
  const room = io.of("/room");

  // chat 네임스페이스 전용 이벤트
  room.on("connection", (socket) => {
    const roomIdStr = socket.handshake.query.roomId;
    const id = +roomIdStr;

    //룸에 접속
    socket.join(id);
    console.log(socket.rooms);
    console.log(`chat${id} 네임스페이스에 접속`);

    socket.on("disconnect", () => {
      console.log(`chat${id} 네임스페이스 접속 해제`);

      //접속 해제
      socket.leave(id);
      console.log(socket.rooms);
    });

    //쓰기
    socket.on("chatReply", async (data) => {
      try {
        // console.log(`${socket.id}:${data}`);
        // console.log(JSON.stringify(`"${socket.id":${data}}`));

        //유저일 경우
        const MongoData = await mongoGetDataOne({
          _id: (
            await mongoAddData(
              JSON.stringify({
                roomId: id,
                userId: socket.id,
                ghostId: null,
                content: data.chat,
                createdAt: Date.now(),
                deletedAt: false,
                fileName: data.fileName,
              })
            )
          ).insertedId,
        });

        // mongoAddData(`{${socket.id}:${data}}`);
        //보내기
        room.to(id).emit("chat", chatEleCreater(MongoData));
        //유저일경우 여기까지
      } catch (err) {
        console.log("roomsocket.js err@@@@", err);
      }
    });

    //몽고에서 채팅기록 뽑아오기 이벤트
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
          console.log("start", roomId, time);
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
          // console.log(dataFromMongo);
        }

        dataFromMongo.forEach((temp) => {
          console.log({ ...temp });
          socket.emit("chatload", chatEleCreater(temp));
          socket.emit("CliTimeReset", temp.createdAt);
        });

        dataFromMongo = [];
        // console.log(test);
      } catch (err) {
        console.log("roomsocket.js err@@@@", err);
      }
    });
  });
};
