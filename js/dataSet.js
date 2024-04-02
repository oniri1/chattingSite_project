const path = require("path");

const dataFileName = "data";
const dataTypeName = ".json";
const dataName = `${dataFileName}${dataTypeName}`;
const dataPath = path.join(__dirname, "..", `data`);

module.exports = { dataFileName, dataTypeName, dataName, dataPath };
