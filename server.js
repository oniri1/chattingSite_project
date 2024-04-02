// import { fs } from 'node:fs';
// import { Buffer } from 'node:buffer';

const fs = require("fs");
// const path = require("path");

const {
  dataFileName,
  dataTypeName,
  dataName,
  dataPath,
} = require("./js/dataSet");

const postList = [
  { id: 1, writer: "이정배" },
  { id: 2, writer: "이승배" },
];

//const data = new Uint8Array(Buffer.from(JSON.stringify(postList)));
const data = Buffer.from(JSON.stringify(postList));
fs.writeFileSync(`${dataPath}/${dataName}`, data, (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});

// console.log(dataPath);
const getDate = JSON.parse(fs.readFileSync(`${dataPath}/${dataName}`));

console.log(getDate);
