// console.log()
let time = Date.now();
console.log(time);

const roomId = location.href.slice(location.href.lastIndexOf("/") + 1);
// console.log(roomId)

const socket = io("http://localhost:8080/room"); // chat 네임스페이스

//보낼 때
document.getElementById("sendBtn").onclick = () => {
  const talk = document.getElementById("talk");
  socket.emit("chatReply", talk.value);
  talk.value = null;
};

document.getElementById("loadBtn").onclick = () => {
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

  console.log("<div></div>");
  console.log(document.createElement("div"));

  document.getElementById("chats").innerHTML += data;
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
