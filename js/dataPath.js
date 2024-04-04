const path = require("path");
const fs = require("fs");

const dataFileName = "data";
const dataTypeName = ".json";
const dataName = `${dataFileName}${dataTypeName}`;
const dataPath = path.join(__dirname, "..", "data");

const checkDataDir = fs.readdirSync(dataPath);

const countFileName = "countNum.json";
const dataPathFile = `${dataPath}/${dataName}`;
const countPathFile = `${dataPath}/${countFileName}`;

module.exports = {
  dataFileName,
  dataTypeName,
  dataName,
  dataPath,
  checkDataDir,
  countFileName,
  dataPathFile,
  countPathFile,
};
