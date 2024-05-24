import { Router } from "express";
const router = Router();
import room from "./rooms/index.js";
import img from "./img/index.js";
import login from "./login/index.js";
import regist from "./regist/index.js";
import logout from "./logout/index.js";

router.use("/room", room);
router.use("/img", img);
router.use("/login", login);
router.use("/regist", regist);
router.use("/logout", logout);

export default router;
