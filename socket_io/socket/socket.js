const SocketIO = require("socket.io");

module.exports = (server) => {
  // 서버 연결, path는 프론트와 일치시켜준다.
  const io = SocketIO(server, { path: "/socket.io" });

  //* 웹소켓 연결 시
  io.on("connection", (socket) => {
    // console.log(socket);
    const req = socket.request; // 웹소켓과는 달리 req객체를 따로 뽑아야함

    // console.log(socket.request.headers);
    //* ip 정보 얻기
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    // console.log("새로운 클라이언트 접속!", ip, socket.id, req.ip);
    console.log("새로운 클라이언트 접속!", socket.id);
    // socket.id 는 소켓 연결된 고유한 클라이언트 식별자라고 보면된다. 채팅방의 입장한 고유한 사람

    //* 연결 종료 시
    socket.on("disconnect", () => {
      console.log("클라이언트 접속 해제", ip, socket.id);
      clearInterval(socket.interval);
    });

    //* 에러 시
    socket.on("error", (error) => {
      console.error(error);
    });

    //* 클라이언트로부터 메시지 //reply와 news는 임의로 지정한 이름이다. 클라이언트와 서버에 각각 똑같은 변수가 있어야 함
    socket.on("reply", (data) => {
      console.log(socket.id, data);
      //보내기
      io.emit("news", `${socket.id}:${data}`);
    });

    // //* 클라이언트로 메세지 보내기
    // socket.interval = setInterval(() => {
    //   // 3초마다 클라이언트로 메시지 전송
    //   socket.emit("news", "Hello Socket.IO");
    // }, 3000);
  });
};
