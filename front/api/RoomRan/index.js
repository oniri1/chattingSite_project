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
  } catch (err) {}
})();
