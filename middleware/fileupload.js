const util = require("util");
const multer = require("multer");
// const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/data");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let filter = (req, file, cb) => {
  if (file.mimetype === "video/mp4") {
    return cb(null, true);
  }
  return cb(null, false);
};

let uploadFile = multer({
  storage: storage,
  fileFilter: filter,
  //   limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
