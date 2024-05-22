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
import { Sequelize } from "sequelize";

//커스텀

import router from "./router/index.js";
import { upload } from "./multer/imgUploader.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("port", process.env.PORT || 3000);

//몽고 접속
import { connectToMongoDB } from "./mongoDB/mongoClient.js";
connectToMongoDB(process.env.MONGODBPORT);

//라이브러리 설정
app.use(cors({ origin: "http://localhost", credentials: true }));
app.use(morgan("dev"));
app.use(cookieParser("Oniri1Making"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

const server = app.listen(app.get("port"), () => {
  console.log(app.get("port"), "server open");
});

//소켓 통신
import roomsocket from "./socket/roomsocket.js";
roomsocket(server);

//이미지 받기
//upload.single("img")로 받겠다.
app.post("/write", upload.single("img"), (req, res) => {
  console.log("server /write");

  //파일이 있으면 실행
  if (req.file?.filename) {
    res.json({ fileName: req.file.filename });
  } else {
    res.json({ fileName: "noFile" });
  }
});
