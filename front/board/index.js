(async () => {
  const userInfoElem = document.getElementById("user-info");

  const user = (
    await axios.post(
      "http://localhost:8005/user/info", //url
      {}, //body
      {
        //options
        withCredentials: true,
      }
    )
  ).data;

  console.log(user.user);

  userInfoElem.innerHTML += `<div class="user-level">
  <div class="level-img">
    <img src="/hams/mainHamster.png" alt="">
  </div>
  <div class="name-level">
    <div class="user-name">${user.user}</div>
    <div class="user-now-level">레벨 1</div>
    <div class="user-level-bar"></div>
    <div class="next-level">다음 레벨까지 11 남음</div>
  </div>
  </div>
  <div class="user-menu">
  <div class="user-write-comment">
    <div class="user-writed">
      <a href="./"><button>내가 쓴 글</button></a>
    </div>
    <div class="user-comment">
      <a href="./"><button>내가 쓴 댓글</button></a>
    </div>
  </div>
  <div class="user-ward-write">
    <div class="user-ward">
      <a href="./"><button>내 와드</button></a>
    </div>
    <div class="user-write">
      <a href="/write/index.html"><button>글 쓰기</button></a>
    </div>
  </div>
  <div class="user-link">
    <a href="./">
      <button>게임 계정 연결</button>
    </a>
  </div>
  </div>
  `;
})();
