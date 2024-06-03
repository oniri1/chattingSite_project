(async () => {
  try {
    //소켓용 쿠키
    const userName = await (
      await axios.post(
        `http://localhost:8080/cookieCheck`,
        {},
        {
          withCredentials: true,
        }
      )
    ).data;
    console.log(userName);

    //소켓
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
        await axios.post(`http://localhost:8080/img`, formData, {
          withCredentials: true,
          headers: { "Content-type": "multipart/form-data" },
        })
      ).data.fileName;

      console.log(imgName);

      socket.emit("chatReply", {
        chat: talk.value,
        fileName: imgName,
        userName: userName,
      });
    };

    // socket.emit("chatLoad", {
    //   time: time,
    //   roomId: +roomId,
    // });

    //받을 때
    socket.on("chat", (data) => {
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

    //Observer
    // const lastroomObserver = new IntersectionObserver(
    //   async (entries) => {
    //     console.log("obs 실행 중");
    //     if (roomData[0] == undefined) {
    //       roomData = await (
    //         await axios.post(
    //           "http://localhost:8080/api/room/ran",
    //           { roomValue: roomValue, tag: tagValueForServer },
    //           { withCredentials: true }
    //         )
    //       ).data;

    //       roomValue = roomData[0].roomValue;
    //     }

    //     if (roomData[0] == undefined) {
    //       lastroom = entries[0];
    //       lastroomObserver.unobserve(lastroom.target);
    //     } else {
    //       lastroom = entries[0];
    //       if (!lastroom.isIntersecting) return;
    //       roomData.forEach(() => {
    //         console.log(roomData[0]);
    //         loadNewRoom(roomData[0]);

    //         roomData.splice(0, 1);
    //       });

    //       lastroomObserver.unobserve(lastroom.target);

    //       const a = document.getElementsByClassName("room");
    //       const lastRoomElem = a[a.length - 1];

    //       lastroomObserver.observe(lastRoomElem);
    //     }
    //   },
    //   { threshold: 0.3 }
    // );
  } catch (err) {
    console.log(err);
    document.getElementsByTagName("body")[0].innerHTML = "방 없음";
  }
})();
