const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const { DB, USERNAME, PASSWORD, HOST } = require("./constants/db");
const mysql = require("mysql2");
const upload = require("./routes/upload");
const PORT = process.env.PORT || 8080;
const app = express();
global.__basedir = __dirname;

const dbsql = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB
});
dbsql.connect(err => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});
global.dbsql = dbsql;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
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
