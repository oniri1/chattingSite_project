(async () => {
  try {
    const roomId = await axios.post(
      "http://localhost:8080/logout",
      {},
      {
        withCredentials: true,
      }
    );

    console.log("hi");

    if (roomId.data.redirect) location.href = roomId.data.redirect;
    if (roomId.data.error) console.error("error : ", roomId.data.error);
    if (roomId.data.result) console.log("result : ", roomId.data.result);
  } catch (err) {
    console.log(err);
  }
})();

// console.log("hi");
