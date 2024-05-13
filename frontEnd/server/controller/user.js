import { Router } from "express";

import regist from "../services/user/regist.js";
import login from "../services/user/login.js";
import logout from "../services/user/logout.js";

const router = Router();

//regist
router.post("/regist", regist);

//login
router.post("/login", login);

//logout
router.post("/logout", logout);

export default router;
