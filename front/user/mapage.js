hamburger = document.querySelector(".hamburger");
hamburger.onclick = function () {
  navBar = document.querySelector(".nav-bar");
  navBar.classList.toggle("active");
};

//탭 셋업
const setupTabs = () => {
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
};

//탭 클릭 이벤트 셋업
document.addEventListener("DOMContentLoaded", () => {
  setupTabs();

  document.querySelectorAll(".tabs").forEach((tabsContainer) => {
    tabsContainer.querySelector(".tabs__sidebar .tabs__button").click();
  });
});

//유저 navbar
const userinfoElem = document.getElementById("user-info");
(async () => {
  const user = (
    await axios.post(
      "http://localhost:8080/user/info", //url
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
      <a href="/" class="">메인 페이지</a>
    </li>
    <li>
        <a href="./" class="">${user.user}</a>
    </li>
    <li>
      <a href="/logout" class="">로그아웃</a>
    </li>
  </ul>`;
  }
})();

//룸 만들기 펑션
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
          <div class="host">태그 (업데이트 예정)</div>
          <button class="enter">입장하기</button>
          <button class="delete">삭제하기</button>
        </div>
      </div>
    </div>
  </div>`;

  const roomContainer = document.getElementById("tab1");
  roomContainer.innerHTML += room;
};

//내 방
(async () => {
  let roomData = await (
    await axios.post(
      "http://localhost:8080/user/get/rooms",
      {},
      { withCredentials: true }
    )
  ).data.Rooms;

  roomData.forEach((e) => {
    loadNewRoom(e);
  });

  let recomment = await axios.post(
    "http://localhost:8080/user/get/recomments",
    {},
    { withCredentials: true }
  );

  console.log(recomment.data);
})();
