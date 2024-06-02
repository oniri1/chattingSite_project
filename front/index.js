const userinfoElem = document.getElementById("user-info");
const makeElem = document.getElementById("makeBtn");
(async () => {
  const user = await (
    await axios.post(
      "http://localhost:8080/user/info", //url
      {}, //body
      {
        //options
        withCredentials: true,
      }
    )
  ).data;

  if (user.user) {
    userinfoElem.innerHTML = `<ul>

    <li>
      <a href="/user" class="">마이페이지</a>
    </li>
    <li>
        <a href="/user" class="">${user.user}님</a>
    </li>
    <li>
      <a href="/logout" class="">로그아웃</a>
    </li>
  </ul>`;
  }
  if (user.user) {
    makeElem.innerHTML = `
    <input type="submit" id="makeBtn" class="makeBtn" value="채팅방 생성"/>`;
  }

  const btn = document.getElementById("makeBtn");

  btn.onclick = () => {
    const roomEle = document.getElementsByClassName("body")[0];
    if (roomEle.style.display != "flex") {
      roomEle.style.display = "flex";
    } else {
      roomEle.style.display = "none";
    }
  };
})();
