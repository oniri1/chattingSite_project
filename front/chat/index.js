const localhost = location.href;
const chatId = localhost.split("chatId=")[1];

(async () => {
  try {
    console.log(chatId);

    const contents = await axios.post(
      `http://localhost:8080/chat/get/contents`,
      { chatId: chatId },
      {
        withCredentials: true,
      }
    );

    console.log(contents);

    const recomments = await axios.post(
      `http://localhost:8080/chat/get/recomments`,
      { chatId: chatId },
      {
        withCredentials: true,
      }
    );

    console.log(recomments);
  } catch (err) {}
})();

//댓글 쓰기
// (async () => {
//   try {
//     const data = await axios.post(
//       `http://localhost:8080/chat/reply`,
//       { chatId: chatId, content: "forTest" },
//       {
//         withCredentials: true,
//       }
//     );

//     console.log(data);

//     if (data.data.redirect) location.href = data.data.redirect;
//     if (data.data.error) console.error("error : ", data.data.error);
//     if (data.data.result) console.log("result : ", data.data.result);
//   } catch (err) {}
// })();
