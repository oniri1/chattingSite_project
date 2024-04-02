// import { writeFile } from 'node:fs';
// import { Buffer } from 'node:buffer';

const fs = require("fs");
const Buffer = require("buffer");

const data = new Uint8Array(Buffer.from("Hello Node.js"));
fs.writeFile("message.txt", data, (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});
