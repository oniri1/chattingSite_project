//node default
import path from "path";
import { fileURLToPath } from "url";

//다운로드
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

//커스텀

import router from "./router/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("port", process.env.PORT || 3000);

//몽고 접속
import { connectToMongoDB } from "./mongoDB/mongoClient.js";
connectToMongoDB(process.env.MONGODBPORT);

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
import roomsocket from "./socket/roomsocket.js";
roomsocket(server);
