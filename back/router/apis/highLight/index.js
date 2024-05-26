import { Router } from "express";
const router = Router();
import { Rooms } from "../../../mySQL/models/index.js";
import { client } from "../../../mongoDB/mongoClient.js";

router.post("/rooms", async (req, res) => {
  try {
    console.log("highrooms");
    const database = client.db("chatLog");
    const collection = database.collection("chats");

    let nowtime = Date.now();

    console.log(nowtime);

    const tempArr = await collection
      .find({
        $and: [
          { createdAt: { $gte: nowtime - 360000000 } }, //기준 - 12hour
        ],
      })
      .toArray();

    let countArr = [];

    //받아온 값들 카운팅 해주는 코드
    for (const { roomId } of tempArr) {
      //   console.log(dupliNum[roomId]);
      if (countArr[roomId] == undefined) {
        console.log("hi");
        countArr[roomId] = { roomId: roomId, count: 1 };
      } else {
        countArr[roomId].count++;
      }
    }

    console.log(countArr);
    countArr.sort((a, b) => b.count - a.count);
    countArr.pop();
    countArr = countArr.slice(0, 10);
    console.log(countArr);

    const data = [];

    for (const { roomId } of countArr) {
      const a = await Rooms.findOne({
        where: { id: roomId },
        attributes: ["id", "title", "tag"],
      });

      a.dataValues.roomId = a.dataValues.id;
      a.dataValues.id = undefined;

      //   console.log(a.dataValues);
      data.push(a);
    }

    console.log(data);

    res.json({ ...data });

    // res.json({});
  } catch (err) {
    console.log(err);
  }
});
router.post("/", (req, res) => {});
export default router;
