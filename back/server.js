//node default
import path from "path";
import { fileURLToPath } from "url";

//다운로드
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

//커스텀
import router from "./router/index.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//mySQL
import db from "./mySQL/models/index.js";
const { Sequelize, sequelize, Users, Admins, Rooms } = db;

//socket
import roomsocket from "./socket/roomsocket.js";

//몽고 접속
import { connectToMongoDB } from "./mongoDB/mongoClient.js";
connectToMongoDB(process.env.MONGODBPORT);

//라이브러리 설정
const app = express();

app.set("port", process.env.PORT || 3000);
app.use(cors({ origin: "http://localhost", credentials: true }));
app.use(morgan("dev"));
app.use(cookieParser("Oniri1Making"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

const resetMysql = process.env.RESET == "true";

//mySQL
(async () => {
  try {
    if (resetMysql) {
      await sequelize.sync({ force: true });
      await Users.create({
        email: "qwer",
        password: 1234,
        nickname: "햄스터킹",
      });
      await Admins.create({
        email: "qwer",
        password: 1234,
        nickname: "햄스터킹",
      });
    } else {
      await sequelize.sync({ force: false });
    }
    const server = app.listen(app.get("port"), () => {
      console.log(app.get("port"), "server open");
    });

    //소켓 통신 활성화
    roomsocket(server);
  } catch (err) {
    console.log("server.js Err : ", err);
  }
})();
