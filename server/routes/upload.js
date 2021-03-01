const express = require("express");
const router = express.Router();
const tutorialServices = require("../services/tutorialService");
const upload = require("../middleware/upload");

router.get("/uploadtest", (req, res, next) => {
  res.send("Hello World");
});
router.post("/upload", upload.single("file"), tutorialServices.upload);
router.get("/tutorials", tutorialServices.getTutorials);

module.exports = router;
