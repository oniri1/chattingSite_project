import { Router } from "express";
import Rooms from "../../mySQL/models/room/rooms.js";
const router = Router();

router.post("/", async (req, res) => {
  try {
    if (req.query.roomId == undefined) {
      res.status(405);
      res.json({ error: "no room" });
    } else {
      const rooms = await Rooms.findAll({
        where: { id: req.query.roomId },
        attributes: ["id"],
      });

      let temp = false;
      // console.log("query", req.query.roomId);
      for (const { id } of rooms) {
        if (id == req.query.roomId) temp = true;
      }

      if (temp) {
        res.json({ roomId: req.query.roomId });
      } else {
        console.log("err");
        res.status(405);
        res.json({ error: "no room" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
