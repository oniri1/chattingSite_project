const router = require("express").Router();
const room = require("./rooms");

router.use("/room", room);

module.exports = router;
