//익스 프레스 받아오기
const express = require("express");
const path = require("path");

//추가 설정파일 .config = 프로세스에 올리기, 접근 방법 = process.env.이름
require("dotenv").config();
// 서버 알림이
const morgan = require("morgan");

//객체를 넣어주면 data로 저장해줌
const { getData, checkData, addData } = require("./js/dataFunc");

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
  checkData();
  const postList = checkData();

  res.render("index", postList);
});

app.post("/write", (req, res) => {
  //포스트 카운트 만들어야 함

  req.body.id = postCount++;
  req.body.createdAt = new Date().toLocaleString();
  console.log(req.body);
});

app.listen(app.get("port"), (req, res) => {
  console.log("server open", app.get("port"));
});

// addData({ id: 1, writer: "추가" });
