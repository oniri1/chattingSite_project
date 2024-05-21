import multer from "multer";

//멀터의 multer({dest : path}) / destination(목적지)를 설정한다. (dest)
export const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      // console.log(1, file);
      //주소
      callback(null, "./uploads");
    },

    filename: (req, file, callback) => {
      // console.log(2, file);
      console.log(req.file);

      callback(null, Date.now() + file.originalname);
    },
  }),
});
