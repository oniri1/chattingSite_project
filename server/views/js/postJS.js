const reSet = () => {
  document.getElementById("nameText-p").value = null;

  document.getElementById("explanText-p").value = null;

  document.getElementsByClassName("rock-on-p")[0].classList.remove("rock-on-p");
  document.getElementById("line-boxs-p").children[0].classList.add("rock-on-p");
};

//취소하기 버튼
document.getElementById("cancel-p").onclick = (e) => {
  console.log("hide");

  document.getElementById("smoke-p").classList.toggle("hide-p");
  reSet();
};
