const multer = require("multer");
const { FILE_LIMIT_SIZE } = require("../constants");

const typeOfFileFilter = (req, file, cb) => {
  if (file.mimetype.match(/(?:^|\W)(csv|excel|spreadsheetml)(?:$|\W)/)) {
    cb(null, true);
  } else {
    cb("Please upload only csv,excel or image file.", false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const uploadFile = multer({
  storage,
  fileFilter: typeOfFileFilter,
  limits: { fileSize: FILE_LIMIT_SIZE } //fileSize in bytes
});
module.exports = uploadFile;
