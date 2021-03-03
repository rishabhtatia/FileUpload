const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/database");
const upload = require("./routes/upload");
const PORT = process.env.PORT || 8080;
const app = express();
global.__basedir = __dirname;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
db.sync(); //For not dropping database
// db.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
db.authenticate()
  .then(() => console.log("Database Connected..."))
  .catch(err => console.log("Error: " + err));

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
