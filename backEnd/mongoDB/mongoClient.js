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

    console.log("MongoClient.js ADDfun data@@", data);

    await collection.insertOne({ ...data });
  } catch (err) {
    console.log("MongoAddFuncERR@@@@", err);
  }
};

export { connectToMongoDB, mongoAddData };
