//몽고디비에 접속
import { MongoClient } from "mongodb";

let client;

const connectToMongoDB = async (mongoUrl) => {
  try {
    client = new MongoClient(mongoUrl);
    await client.connect(); // 몽고DB 서버에 연결
    console.log("Connected Mongo@@@@");
  } catch (error) {
    console.error("connectERR @@@@@@", error);
  }
};

//데이터 베이스에 추가

const mongoAddData = async (jsonData) => {
  try {
    const database = client.db("chatLog");
    const collection = database.collection("chats");

    //JSON 변환
    const data = JSON.parse(jsonData);

    // console.log("MongoClient.js ADDfun data@@", data);

    return await collection.insertOne({ ...data });
  } catch (err) {
    console.log("MongoAddFuncERR@@@@", err);
  }
};

//최신 데이터 뽑아오기

const mongoGetData = async (objData) => {
  try {
    const database = client.db("chatLog");
    const collection = database.collection("chats");
    const result = await collection.find({ ...objData }).toArray();

    return result;
  } catch (err) {
    console.log("mongoGetData Func Err@@@ mongoclient.js", err);
  }
};

const mongoGetDataOne = async (objData) => {
  try {
    const database = client.db("chatLog");
    const collection = database.collection("chats");
    const result = await collection.findOne({ ...objData });

    return result;
  } catch (err) {
    console.log("mongoGetData Func Err@@@ mongoclient.js", err);
  }
};

// const andQuerymaker = async (oneObj, twoObj) => {
//   try {
//     return { $and: [{ ...oneObj }, { ...twoObj }] };
//   } catch (err) {
//     console.log(err);
//   }
// };
// (async () => {
//   console.log(
//     andQuerymaker(
//       { roomId: 1 },
//       {
//         $and: [
//           { createdAt: { $gte: 1715754779659 } }, //기준 - 1hour
//           { createdAt: { $lte: 1715754780922 } }, //Date now 기준
//         ],
//       }
//     )
//   );
// })();

export { connectToMongoDB, mongoAddData, mongoGetData, mongoGetDataOne };
