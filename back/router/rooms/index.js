import { Router } from "express";
const router = Router();

const rooms = [{ id: 1 }, { id: 2 }, { id: 3 }]; //나중에 디비에서 뽑아옴

router.post("/", (req, res) => {
  let temp = false;
  console.log(req.query.roomId);
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
});

export default router;
