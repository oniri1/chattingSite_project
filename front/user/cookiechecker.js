(async () => {
  try {
    const check = await axios.post(
      "http://localhost:8080/cookieCheck",
      {},
      { withCredentials: true }
    );

    // console.log("check", check.data);

    if (check.data.user == undefined) {
      location.href = "/";
    }
  } catch (err) {}
})();
