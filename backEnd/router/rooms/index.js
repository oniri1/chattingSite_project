import { Router } from "express";
const router = Router();

const rooms = [{ id: 1 }, { id: 2 }, { id: 3 }]; //나중에 디비에서 뽑아옴

router.get("/:roomId", (req, res) => {
  let temp = false;
  for (const { id } of rooms) {
    if (id == req.params.roomId) temp = true;
  }

  if (temp) {
    res.render("index", { roomId: req.params.roomId });
  } else {
    res.send("방 없음"); //나중에 리다이렉션으로 바꾸기
  }
});

export default router;
