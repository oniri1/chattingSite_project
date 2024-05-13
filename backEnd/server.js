//node default
const path = require("path");

//다운로드
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

//커스텀

const router = require("./router");

const app = express();

app.set("port", process.env.PORT || 3000);

//몽고
const mongoPort = process.env.MONGODBPORT;
console.log("server@@@@@@", mongoPort);
module.exports = { mongoPort };

//몽고 접속
const { connectToMongoDB } = require("./mongoDB/mongoClient.js");
connectToMongoDB();

//라이브러리 설정
app.use(morgan("dev"));
app.use(cookieParser("Oniri1Making"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");

//ejs 경로 지정, 기본 값 /views -> /client
app.set("views", path.join(__dirname, "client"));

app.use(router);

const server = app.listen(app.get("port"), () => {
  console.log(app.get("port"), "server open");
});

//소켓 통신
const roomsocket = require("./socket/roomsocket.js");
roomsocket(server);
