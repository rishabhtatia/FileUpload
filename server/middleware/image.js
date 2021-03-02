const multer = require("multer");

const typeOfImageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
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
  limits: { fileSize: 2000000 } //fileSize in bytes
});
module.exports = uploadImageFile;
