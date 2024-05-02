//익스 프레스 받아오기
const express = require("express");
const path = require("path");
const fs = require("fs");

//추가 설정파일 .config = 프로세스에 올리기, 접근 방법 = process.env.이름
require("dotenv").config();
// 서버 알림이
const morgan = require("morgan");

//커스텀 모듈
const { getData, checkData, addData, countMake } = require("./js/dataFunc");
const { dataPathFile, countPathFile, countFileName } = require("./js/dataPath");

//익스프레스 설정 app.
const app = express();

//"port"라는 변수를 set
app.set("port", process.env.PORT || 3000);

//서버 알림이 미들웨어
app.use(morgan("dev"));

//기본 미들웨어
const urlenOptions = { extended: false };
app.use(express.urlencoded(urlenOptions));
app.use(express.json());

//뷰 엔진
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("views"));

//
//
//
//
//
//

app.get("/", (req, res) => {
  checkData(dataPathFile);
  const postList = checkData(dataPathFile);

  res.render("index", { postList });
});

// app.get("/imgs",express.static())

app.get("/board", (req, res) => {
  console.log(req.query);
  req.query.imgSrc = "/imgs/hamster.png";

  res.render("boardData/index", req.query);
});

app.get("/board/index.css", (req, res) => {
  console.log("css");
  res.sendFile(path.join(__dirname, "views/boardData/index.css"));
});

//

//

//

app.post("/write", (req, res) => {
  checkData(dataPathFile);
  countMake(dataPathFile, countPathFile);

  const num = getData(countPathFile)[0] + 1;

  req.body.id = num;
  req.body.createdAt = new Date().toLocaleString();

  addData(dataPathFile, req.body);
  countMake(dataPathFile, countPathFile);

  res.redirect("/");
});

app.listen(app.get("port"), (req, res) => {
  console.log("server open", app.get("port"));
});
