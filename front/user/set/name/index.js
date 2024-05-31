(async () => {
  try {
    const data = await axios.post(
      `http://localhost:8080/user/set/name`,
      { name: "new manyi4" },
      {
        withCredentials: true,
      }
    );

    console.log(data.data.data);

    if (data.data.redirect) location.href = data.data.redirect;
    if (data.data.error) console.error("error : ", data.data.error);
    if (data.data.result) console.log("result : ", data.data.result);
  } catch (err) {}
})();
