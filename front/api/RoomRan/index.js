let roomValue = 0;

(async () => {
  try {
    const data = await axios.post(
      `http://localhost:8080/api/room/ran`,
      { roomValue: roomValue, tag: 3 },
      {
        withCredentials: true,
      }
    );

    roomValue = data.data.roomValue;
    console.log(data);

    console.log(roomValue);
    if (data.data.redirect) location.href = data.data.redirect;
    if (data.data.error) console.error("error : ", data.data.error);
    if (data.data.result) console.log("result : ", data.data.result);
  } catch (err) {}
})();
