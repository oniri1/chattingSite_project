hamburger = document.querySelector(".hamburger");
hamburger.onclick = function () {
  navBar = document.querySelector(".nav-bar");
  navBar.classList.toggle("active");
};

function setupTabs() {
  document.querySelectorAll(".tabs__button").forEach((button) => {
    button.addEventListener("click", () => {
      const sideBar = button.parentElement;
      const tabsContainer = sideBar.parentElement;
      const tabNumber = button.dataset.forTab;
      const tabToActivate = tabsContainer.querySelector(
        `.tabs__content[data-tab="${tabNumber}"]`
      );

      sideBar.querySelectorAll(".tabs__button").forEach((button) => {
        button.classList.remove("tabs__button--active");
      });

      tabsContainer.querySelectorAll(".tabs__content").forEach((button) => {
        button.classList.remove("tabs__content--active");
      });

      button.classList.add("tabs__button--active");
      tabToActivate.classList.add("tabs__content--active");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupTabs();

  document.querySelectorAll(".tabs").forEach((tabsContainer) => {
    tabsContainer.querySelector(".tabs__sidebar .tabs__button").click();
  });
});

const userinfoElem = document.getElementById("user-info");
(async () => {
  const user = (
    await axios.post(
      "http://localhost:3000/user/info", //url
      {}, //body
      {
        //options
        withCredentials: true,
      }
    )
  ).data;

  console.log(user.user);
  if (user.user) {
    userinfoElem.innerHTML = `<ul>
    <li>
      <a href="./index.html" class="">홈</a>
    </li>
    <li>
      <a href="" class="">고객지원</a>
    </li>
    <li>
      <a href="" class="">Contact Us</a>
    </li>
    <li>
      <a href="" class="">마이페이지</a>
    </li>
    <li>
        <a href="" class="">${user.user}</a>
    </li>
    <li>
      <a href="#" class="">로그아웃</a>
    </li>
  </ul>`;
  }
})();

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
  { roomId: 3, title: "HI35", tag: 3 },
  { roomId: 3, title: "HI35", tag: 3 },
];

let replyData = [
  { recommentId: 1, reply: "쫄?", tag: 1 },
  { recommentId: 2, reply: "쫄?1", tag: 2 },
  { recommentId: 3, reply: "쫄?2", tag: 3 },
  { recommentId: 3, reply: "쫄?3", tag: 3 },
  { recommentId: 3, reply: "쫄?4", tag: 3 },
];

//클릭 이벤트
const tab = document.getElementById("tab1");

tab.onclick = (e) => {
  tagValueForServer = 0;
  if (roomData[0] == undefined) {
    roomData = [
      { roomId: 1, title: "HI32", tag: 1 },
      { roomId: 2, title: "HI34", tag: 2 },
      { roomId: 3, title: "HI35", tag: 3 },
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
          <button class="delete">삭제하기</button>
        </div>
      </div>
    </div>
  </div>`;

  roomContainer.innerHTML += room;
};
