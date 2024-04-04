// 게시글 클릭
document.getElementById("post-btn").onclick = () => {
  console.log("a");

  document.getElementById("smoke-p").classList.toggle("hide-p");
  //   poster();
};

// 필터 부분 클릭 이벤트
document.getElementById("fillter-box1").onclick = (e) => {
  if (e.target != document.getElementById("fillter-box1")) {
    console.log(e.target);
    document.getElementsByClassName("rock-on")[0].classList.remove("rock-on");
    e.target.classList.add("rock-on");
  }
};
