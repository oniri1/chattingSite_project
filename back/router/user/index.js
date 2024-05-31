import { Router } from "express";
const router = Router();
import get from "./get.js";
import deleter from "./delete.js";
import set from "./set.js";

import Users from "../../mySQL/models/user/users.js";

router.use("/get", get);
router.use("/delete", deleter);
router.use("/set", set);

router.post("/kill", async (req, res) => {
  try {
    console.log(req.signedCookies);

    await Users.destroy({
      where: { nickname: req.signedCookies.user }, //소프트 삭제
    });
    res.clearCookie("user");
    res.json({ redirect: "/" });
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
});

export default router;
