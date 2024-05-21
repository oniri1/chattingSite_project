(async () => {
  try {
    const localhost = location.href;
    const roomIdStr = localhost.slice(localhost.lastIndexOf("/") + 1);

    console.log(roomIdStr);

    const roomId = await (
      await axios.post(
        `http://localhost:8080/room/${roomIdStr}`,
        {},
        {
          withCredentials: true,
        }
      )
    ).data.roomId;

    //소켓 통신
    let time = Date.now();

    const socket = io(`http://localhost:8080/room${roomIdStr}`, {}); // chat 네임스페이스

    //보낼 때
    document.getElementById("sendBtn").onclick = () => {
      const talk = document.getElementById("talk");
      socket.emit("chatReply", talk.value);
      talk.value = null;
    };

    document.getElementById("loadBtn").onclick = () => {
      //이전 채팅을 불러오는 함수
      socket.emit("chatLoad", {
        time: time,
        roomId: +roomId,
      });
    };

    //받을 때
    socket.on("chat", (data) => {
      // const ele = document.createElement("div")
      // ele.innerText = data;

      console.log("<div></div>");
      console.log(document.createElement("div"));

      document.getElementById("chats").innerHTML += data;
    });

    socket.on("chatload", (data) => {
      // const ele = document.createElement("div")
      // ele.innerText = data;
      console.log(data);

      document.getElementById("chats").innerHTML =
        data + document.getElementById("chats").innerHTML;
    });

    socket.on("CliTimeReset", (data) => {
      time = --data;
    });

    //메인
    console.log(roomId);
    console.log(roomId == true, roomId == false);

    // if (user.result == "ok") {
    //   location.href = "/"
    // }
  } catch (err) {
    //코어 값
    // console.log(err.response.data.error)
    document.getElementsByTagName("body")[0].innerHTML =
      err.response.data.error;
  }
})();
