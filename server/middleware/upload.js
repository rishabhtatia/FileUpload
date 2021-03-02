const multer = require("multer");

const typeOfFileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("csv") ||
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    cb("Please upload only csv or excel file.", false);
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
  storage: storage,
  fileFilter: typeOfFileFilter,
  limits: { fileSize: 2000000 } //fileSize in bytes
});
module.exports = uploadFile;
