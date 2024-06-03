import multer from "multer";

//멀터의 multer({dest : path}) / destination(목적지)를 설정한다. (dest)
export const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      console.log("1");
      //주소
      callback(null, "../front/userFiles");
    },

    filename: (req, file, callback) => {
      // console.log("2");
      // console.log("imgUploader.js@", file);

      callback(null, Date.now() + "-" + req.headers["content-length"] + ".png");
    },
  }),
});
