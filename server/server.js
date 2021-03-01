const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const upload = require("./routes/upload");
const PORT = process.env.PORT || 8080;
const app = express();
global.__basedir = __dirname;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", upload);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message || "Internal Server Error"
    }
  });
});
