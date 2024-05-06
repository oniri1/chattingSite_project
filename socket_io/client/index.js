// 위의 socket.io.js에서 뽑아 쓴다.
const socket = io.connect("http://localhost:8080", {
  path: "/socket.io", // 서버 path와 일치시켜준다
  transports: ["websocket"], // polling 시도하지말고 바로 웹소켓으로 하려면 설정
});

document.getElementById("sendBtn").onclick = () => {
  const talk = document.getElementById("talk");
  socket.emit("reply", talk.value);
  talk.value = null;
};

socket.on("news", (data) => {
  document.getElementById("chats").innerHTML += `<div>${data}</div>`;
});
