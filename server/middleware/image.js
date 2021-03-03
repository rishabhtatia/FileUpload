const multer = require("multer");
const { FILE_LIMIT_SIZE } = require("../constants");

const typeOfImageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    return cb(new Error("Please upload only csv,excel or image file."), false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/images/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const uploadImageFile = multer({
  storage: storage,
  fileFilter: typeOfImageFilter,
  limits: { fileSize: FILE_LIMIT_SIZE } //fileSize in bytes
});
module.exports = uploadImageFile;
