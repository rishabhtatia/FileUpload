const express = require("express");
const router = express.Router();
const csvService = require("../services/Csvservice");
const upload = require("../middleware/upload");

router.get("/uploadtest", (req, res, next) => {
  res.send("Hello World");
});
router.get("/csvlist", csvService.getList);
router.get("/getcsv", csvService.getCsv);
router.post("/uploadcsv", upload.single("file"), csvService.uploadCsv);

module.exports = router;
