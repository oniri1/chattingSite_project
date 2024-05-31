(async () => {
  try {
    const data = await axios.post(
      `http://localhost:8080/user/delete/recomment`,
      { recommentId: "66540cd048e33c28cd8d5c67" },
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
