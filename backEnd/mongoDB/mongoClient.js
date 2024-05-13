//몽고디비에 접속
const { mongoPort } = require("../server.js");
console.log("mongoclient.js", mongoPort);
const { MongoClient } = require("mongodb");

const mongoUrl = `mongodb://localhost:${mongoPort}`; // 몽고DB 서버 URI
const client = new MongoClient(mongoUrl);

const connectToMongoDB = async () => {
  try {
    console.log(mongoPort);
    await client.connect(); // 몽고DB 서버에 연결
    console.log("Connected Mongo@@@@");
  } catch (error) {
    console.error("connectERR @@@@@@", error);
  }
};

// connectToMongoDB();

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

module.exports = { connectToMongoDB, mongoAddData };
