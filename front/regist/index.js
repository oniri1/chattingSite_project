(async () => {
  try {
    const roomId = await axios.post(
      `http://localhost:8080/regist`,
      { email: "qwer3", pwCk: "1234", pw: "1234", name: "manyi2" },
      {
        withCredentials: true,
      }
    );

    if (roomId.data.redirect) location.href = roomId.data.redirect;
    if (roomId.data.error) console.error("error : ", roomId.data.error);
    if (roomId.data.result) console.log("result : ", roomId.data.result);
  } catch (err) {}
})();
