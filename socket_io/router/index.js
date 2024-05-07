const router = require("express").Router();

router.use("/chat", (req, res) => {
  res.render("chat");
});

router.use("/room", (req, res) => {
  res.render("room");
});

module.exports = router;
