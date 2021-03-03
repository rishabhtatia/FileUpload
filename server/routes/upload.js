const express = require("express");
const router = express.Router();
const employeeService = require("../services/employeeService");
const upload = require("../middleware/upload");
const imageUpload = require("../middleware/image");

router.get("/uploadtest", (req, res, next) => {
  res.send("Hello World");
});
router.post("/upload", upload.single("file"), employeeService.upload);
router.post(
  "/imageupload",
  imageUpload.single("file"),
  employeeService.imageUpload
);
router.get("/employees", employeeService.getEmployees);
router.get("/image/:name", employeeService.getImage);

module.exports = router;
