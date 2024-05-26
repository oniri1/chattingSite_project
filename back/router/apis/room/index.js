import { Router } from "express";
const router = Router();
import Rooms from "../../../mySQL/models/room/rooms.js";
import Users from "../../../mySQL/models/user/users.js";
import Sequelize from "sequelize";

router.post("/ran", async (req, res) => {
  try {
    const tempRanNum = Math.floor(Math.random() * 10) + 1;
    let roomValue = req.body.roomValue + tempRanNum;

    //클라 숫자 + 랜덤 숫자
    console.log(roomValue);

    let temp;

    for (let breaker = false; breaker != true; ) {
      temp = await Rooms.findAll({
        attributes: ["id", "title", "tag"],
        limit: 1,
        offset: roomValue,
      });

      console.log("반복 중!", roomValue);

      //만약 아무것도 못찾았으면 방의 끝까지 갔다는 소리
      if (temp[0] == undefined) {
        //다시 0으로 돌아오기
        roomValue = 0;
        // console.log("새로운 값!", roomValue);
      } else {
        //무언가 찾았을 경우
        breaker = true;
      }
    }

    res.json({
      roomId: temp[0].id,
      title: temp[0].title,
      tag: temp[0].tag,
      roomValue: roomValue,
    });
  } catch (err) {
    console.log(err);
  }
});
router.post("/search", async (req, res) => {
  try {
    const title = req.body.title;

    const temp = await Rooms.findAll({
      where: { title: { [Sequelize.Op.like]: `%${title}%` } },
      attributes: ["id", "title", "tag"],
    });

    console.log(temp);

    if (temp[0] != undefined) {
      res.json({ data: temp });
    } else {
      res.json({ error: `no room Search:${title}` });
    }
  } catch (err) {
    console.log(err);
  }
});
router.post("/make", async (req, res) => {
  try {
    //로그인이 되어 있다면
    if (req.signedCookies.user != undefined) {
      const user = req.signedCookies.user;

      console.log(user);

      let userDB = await Users.findOne({
        where: { nickname: user },
      });

      //삭제되거나 없는 닉네임 쿠키로 시도할 경우
      if (userDB == undefined || userDB.deletedAt != null) {
        console.log("hacker setting cookie");
        throw new Error("deleted User");
      }

      Rooms.create({
        userId: userDB.id,
        title: req.body.title,
        tag: req.body.tag,
      });

      res.json({ redirect: "/" });
    }
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
});
export default router;
