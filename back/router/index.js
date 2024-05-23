import { Router } from "express";
const router = Router();
import room from "./rooms/index.js";
import img from "./img/index.js";

router.use("/room", room);
router.use("/img", img);

export default router;
