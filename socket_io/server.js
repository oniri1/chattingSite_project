const path = require("path");

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const roomsocket = require("./socket/roomsocket.js");
const router = require("./router");

const app = express();

app.set("port", process.env.PORT || 3000);

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

//소켓통신
roomsocket(server);
