const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

const socket = require("./socket/socket.js");

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("client"));

const server = app.listen(app.get("port"), () => {
  console.log(app.get("port"), "server open");
});

socket(server);
