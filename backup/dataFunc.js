const fs = require("fs");

const { dataName, dataPath, checkDataDir } = require("./dataPath");

const getData = () => {
  const data = JSON.parse(fs.readFileSync(`${dataPath}/${dataName}`));
  console.log("데이터 겟", data);

  return data;
};

const dataSave = (object) => {
  //const data = new Uint8Array(Buffer.from(JSON.stringify(postList)));
  const data = Buffer.from(JSON.stringify(object));
  fs.writeFileSync(`${dataPath}/${dataName}`, data, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
};

const checkData = () => {
  if (checkDataDir == undefined) {
    //없으면 만들기
    dataSave([]);
  }
};

const addData = (addObject) => {
  let postList = [];

  if (checkDataDir == undefined) {
    //없으면 만들기
    dataSave([]);
  } else {
    postList = getData();
  }
  postList.push(addObject);

  dataSave(postList);
};

module.exports = { dataSave, getData, addData, checkData };
