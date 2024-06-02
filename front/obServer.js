(async () => {
  try {
    //하이라이트 룸
    let roomData = [
      { roomId: 1, title: "HI32", tag: 1 },
      { roomId: 2, title: "HI34", tag: 2 },
      { roomId: 3, title: "HI35", tag: 3 },
      { roomId: 4, title: "HI36", tag: 3 },
      { roomId: 5, title: "HI37", tag: 3 },
    ];

    let roomValue = 0;
    let tagValueForServer = 0;

    let check = await axios.post(
      "http://localhost:8080/api/room/ran",
      { roomValue: roomValue, tag: tagValueForServer },
      { withCredentials: true }
    );

    roomValue = check.data.roomValue;

    console.log(check);

    let highLightRoom = await (
      await axios.post(
        "http://localhost:8080/api/highLight/rooms", //url
        {}, //body
        {
          //options
          withCredentials: true,
        }
      )
    ).data;

    //하이라이트 댓글
    let highLightChat = await (
      await axios.post(
        "http://localhost:8080/api/highLight/recomments",
        {},
        { withCredentials: true }
      )
    ).data;

    //옵저버 실행 조건
    // const observer = new IntersectionObserver(() => {}, {
    //   threshold: 0.3,
    // });

    let lastroom;

    //옵저버 실행 코드
    const lastroomObserver = new IntersectionObserver(
      async (entries) => {
        console.log("obs 실행 중");

        lastroom = entries[0];
        if (!lastroom.isIntersecting) return;
        roomData.forEach(() => {
          loadNewRoom(roomData[0]);

          roomData.splice(0, 1);
        });

        lastroomObserver.unobserve(lastroom.target);

        const a = document.getElementsByClassName("room");
        const lastRoomElem = a[a.length - 1];

        lastroomObserver.observe(lastRoomElem);

        // console.log(document.querySelector(".room:last-child"));
      },
      { threshold: 0.3 }
    );

    //클릭 이벤트
    const tag1 = document.getElementById("tab01");
    const tag2 = document.getElementById("tab02");
    const tag3 = document.getElementById("tab03");
    const tag4 = document.getElementById("tab04");

    tag1.onclick = (e) => {
      tagValueForServer = 0;
      if (roomData[0] == undefined) {
        roomData = [
          { roomId: 1, title: "HI32", tag: 1 },
          { roomId: 2, title: "HI34", tag: 2 },
          { roomId: 3, title: "HI35", tag: 3 },
          { roomId: 4, title: "HI36", tag: 3 },
          { roomId: 5, title: "HI37", tag: 3 },
        ];
      }

      const roombox = document.getElementById("roomShower");

      lastroomObserver.unobserve(lastroom.target);

      while (roombox.children[1]) {
        roombox.removeChild(roombox.lastChild);
      }

      lastroomObserver.observe(document.querySelector(".room:last-child"));

      // rooms.forEach((room) => {
      //   observer.observe(room);
      // });
    };
    tag2.onclick = (e) => {
      tagValueForServer = 1;
      if (roomData[0] == undefined) {
        roomData = [
          { roomId: 1, title: "HI32", tag: 1 },
          { roomId: 2, title: "HI34", tag: 2 },
          { roomId: 3, title: "HI35", tag: 3 },
          { roomId: 4, title: "HI36", tag: 3 },
          { roomId: 5, title: "HI37", tag: 3 },
        ];
      }

      const roombox = document.getElementById("roomShower");

      lastroomObserver.unobserve(lastroom.target);

      while (roombox.children[1]) {
        roombox.removeChild(roombox.lastChild);
      }

      for (let i = 0; true; ) {
        if (i != roomData.length) {
          if (roomData[i].tag != 1) {
            // i = 1 , roomData[{2}] roomData[1] => // 1값 오류가 생기는 이유? 인덱스 0 뿐인데 1을 찾으니까 -> arr.length = 1  != i = 1

            roomData.splice(i, 1);
          } else {
            if (i + 1 >= roomData.length) {
              break;
            }
            i++;
          }
        } else {
          break;
        }
      }

      lastroomObserver.observe(document.querySelector(".room:last-child"));
    };
    tag3.onclick = (e) => {
      tagValueForServer = 2;
      if (roomData[0] == undefined) {
        roomData = [
          { roomId: 1, title: "HI32", tag: 1 },
          { roomId: 2, title: "HI34", tag: 2 },
          { roomId: 3, title: "HI35", tag: 3 },
          { roomId: 4, title: "HI36", tag: 3 },
          { roomId: 5, title: "HI37", tag: 3 },
        ];
      }

      const roombox = document.getElementById("roomShower");

      lastroomObserver.unobserve(lastroom.target);

      while (roombox.children[1]) {
        roombox.removeChild(roombox.lastChild);
      }

      for (let i = 0; true; ) {
        if (i != roomData.length) {
          if (roomData[i].tag != 2) {
            roomData.splice(i, 1);
          } else {
            if (i + 1 >= roomData.length) {
              break;
            }
            i++;
          }
        } else {
          break;
        }
      }

      lastroomObserver.observe(document.querySelector(".room:last-child"));
    };
    //
    tag4.onclick = (e) => {
      tagValueForServer = 3;
      if (roomData[0] == undefined) {
        roomData = [
          { roomId: 1, title: "HI32", tag: 1 },
          { roomId: 2, title: "HI34", tag: 2 },
          { roomId: 3, title: "HI35", tag: 3 },
          { roomId: 4, title: "HI36", tag: 3 },
          { roomId: 5, title: "HI37", tag: 3 },
        ];
      }

      const roombox = document.getElementById("roomShower");

      lastroomObserver.unobserve(lastroom.target);

      while (roombox.children[1]) {
        roombox.removeChild(roombox.lastChild);
      }

      for (let i = 0; true; ) {
        if (i != roomData.length) {
          if (roomData[i].tag != 3) {
            roomData.splice(i, 1);
          } else {
            if (i + 1 >= roomData.length) {
              break;
            }
            i++;
          }
        } else {
          break;
        }
      }

      lastroomObserver.observe(document.querySelector(".room:last-child"));
    };

    //윗줄
    hamburger = document.querySelector(".hamburger");
    hamburger.onclick = () => {
      navBar = document.querySelector(".nav-bar");
      navBar.classList.toggle("active");
    };

    // const rooms = document.querySelectorAll(".room");

    lastroomObserver.observe(document.querySelector(".room:last-child"));

    // rooms.forEach((room) => {
    //   observer.observe(room);
    // });

    const roomContainer = document.querySelector(".room-container");

    const loadNewRoom = (data) => {
      const { roomId, title, tag } = data;

      let tagName;

      if (tag == "1") tagName = "찬반토론";
      if (tag == "2") tagName = "정보공유";
      if (tag == "3") tagName = "친목수다";

      const room = `
  <div class="box">
    <div class="room">
      <div class="title">
        방제 : ${title}
      </div>
      <div>
        <div class="bgi"></div>
        <div class="status">
          <div class="tag"># ${tagName}</div>
          <div class="host">닉네임:경일게임아카데미</div>
          <button class="enter">입장하기</button>
        </div>
      </div>
    </div>
  </div>`;

      roomContainer.innerHTML += room;
    };

    const li_style = document.querySelector(".li-style");
    const li_style2 = document.querySelector(".li-style2");

    //하이라이트 룸
    const roomHotTopic = (data) => {
      const { roomId, title, tag } = data;

      let tagName;

      if (tag == "1") tagName = "찬반토론";
      if (tag == "2") tagName = "정보공유";
      if (tag == "3") tagName = "친목수다";

      const HotTopic = `<a href="/room/?roomId=${roomId}"><li class="li-style">${tagName} ${title}</li></a>`;
      li_style.innerHTML += HotTopic;
    };

    for (const { roomId, title, tag } of highLightRoom) {
      const data = { roomId: roomId, title: title, tag: tag };

      roomHotTopic(data);
    }

    //하이라이트 댓글
    const recommentHotTopic = (data) => {
      const { chatId, chat, userName } = data;

      const reHotTopic = `<a href="/chat/?chatId=${chatId}"><li class="li-style2">${userName} -${chat}</li></a>`;
      li_style2.innerHTML += reHotTopic;
    };

    for (const { _id, content, userId, ghostId } of highLightChat) {
      let user;
      if (userId == null) {
        user = ghostId;
      } else {
        user = userId;
      }

      const data = { chatId: _id, chat: content, userName: user };

      recommentHotTopic(data);
    }
  } catch (err) {
    console.log(err);
  }
})();
