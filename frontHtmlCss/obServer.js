const observer = new IntersectionObserver(() => {}, {
  threshold: 0.3,
});

let lastroom;
let tagValueForServer = 0;

const lastroomObserver = new IntersectionObserver(async (entries) => {
  lastroom = entries[0];
  if (!lastroom.isIntersecting) return;
  roomData.forEach(() => {
    loadNewRoom(roomData[0]);

    roomData.splice(0, 1);
    console.log(roomData[0] == undefined);
  });

  lastroomObserver.unobserve(lastroom.target);
  // console.log(lastroom.target, roomData);
  lastroomObserver.observe(document.querySelector(".room:last-child"));
}, {});

// let roomData = axios
let roomData = [
  { roomId: 1, title: "HI32", tag: 1 },
  { roomId: 2, title: "HI34", tag: 2 },
  { roomId: 3, title: "HI35", tag: 3 },
  { roomId: 4, title: "HI36", tag: 3 },
  { roomId: 5, title: "HI37", tag: 3 },
];

let replyData = [
  { recommentId: 1, reply: "쫄?", tag: 1 },
  { recommentId: 2, reply: "쫄?1", tag: 2 },
  { recommentId: 3, reply: "쫄?2", tag: 3 },
  { recommentId: 3, reply: "쫄?3", tag: 3 },
  { recommentId: 3, reply: "쫄?4", tag: 3 },
];

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

  console.log("전체 태그 클릭", e);

  const roombox = document.getElementById("roomShower");

  lastroomObserver.unobserve(lastroom.target);

  while (roombox.children[1]) {
    roombox.removeChild(roombox.lastChild);
  }

  lastroomObserver.observe(document.querySelector(".room:last-child"));

  rooms.forEach((room) => {
    observer.observe(room);
  });
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

  console.log("찬반토론 태그 클릭", e);

  const roombox = document.getElementById("roomShower");

  lastroomObserver.unobserve(lastroom.target);

  while (roombox.children[1]) {
    roombox.removeChild(roombox.lastChild);
  }

  console.log(roomData);
  for (let i = 0; true; ) {
    if (i != roomData.length) {
      if (roomData[i].tag != 1) {
        // i = 1 , roomData[{2}] roomData[1] => // 1값 오류가 생기는 이유? 인덱스 0 뿐인데 1을 찾으니까 -> arr.length = 1  != i = 1
        console.log("삭제", i);
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

  console.log("정보공유 태그 클릭", e);

  const roombox = document.getElementById("roomShower");

  lastroomObserver.unobserve(lastroom.target);

  while (roombox.children[1]) {
    roombox.removeChild(roombox.lastChild);
  }

  console.log(roomData);
  for (let i = 0; true; ) {
    if (i != roomData.length) {
      if (roomData[i].tag != 2) {
        console.log("삭제", i);
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

  console.log("친목수다 태그 클릭", e);
  const roombox = document.getElementById("roomShower");

  lastroomObserver.unobserve(lastroom.target);

  while (roombox.children[1]) {
    roombox.removeChild(roombox.lastChild);
  }

  console.log(roomData);
  for (let i = 0; true; ) {
    if (i != roomData.length) {
      if (roomData[i].tag != 3) {
        console.log("삭제", i);
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
hamburger = document.querySelector(".hamburger");
hamburger.onclick = () => {
  navBar = document.querySelector(".nav-bar");
  navBar.classList.toggle("active");
};

const rooms = document.querySelectorAll(".room");

lastroomObserver.observe(document.querySelector(".room:last-child"));

rooms.forEach((room) => {
  observer.observe(room);
});

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

const roomHotTopic = (data) => {
  const { roomId, title, tag } = data;

  let tagName;

  if (tag == "1") tagName = "찬반토론";
  if (tag == "2") tagName = "정보공유";
  if (tag == "3") tagName = "친목수다";

  const HotTopic = `<a href=""><li class="li-style">${tagName} ${title}</li></a>`;
  li_style.innerHTML += HotTopic;
};

for (const { roomId, title, tag } of roomData) {
  const data = { roomId: roomId, title: title, tag: tag };

  roomHotTopic(data);
}

const recommentHotTopic = (data) => {
  const { chatId, reply, tag } = data;

  let tagName;

  if (tag == "1") tagName = "찬반토론";
  if (tag == "2") tagName = "정보공유";
  if (tag == "3") tagName = "친목수다";

  const reHotTopic = `<a href=""><li class="li-style2">${tagName} ${reply}</li></a>`;
  li_style2.innerHTML += reHotTopic;
};

for (const { chatId, reply, tag } of replyData) {
  const data = { chatId: chatId, reply: reply, tag: tag };

  recommentHotTopic(data);
}
