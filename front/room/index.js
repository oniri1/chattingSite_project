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
    document.getElementById("sendBtn").onclick = async (e) => {
      e.preventDefault();
      //chat
      const talk = document.getElementById("talk");

      //img
      const form = document.forms.chatDatasForm;
      const formData = new FormData();

      formData.append("img", form.imgInputer.files[0]);

      const imgName = await (
        await axios.post(`http://localhost:8080/write`, formData, {
          withCredentials: true,
          headers: { "Content-type": "multipart/form-data" },
        })
      ).data.fileName;

      console.log(imgName);

      socket.emit("chatReply", { chat: talk.value, fileName: imgName });
    };

    document.getElementById("loadBtn").onclick = (e) => {
      e.preventDefault();
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

      document.getElementById("chats").innerHTML += data;
      document.getElementById("imgInputer").value = null;
      document.getElementById("talk").value = null;
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
    document.getElementsByTagName("body")[0].innerHTML = "방 없음";
  }
})();
