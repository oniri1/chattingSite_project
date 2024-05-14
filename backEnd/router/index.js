import { Router } from "express";
const router = Router();
import room from "./rooms/index.js";

router.use("/room", room);

export default router;
