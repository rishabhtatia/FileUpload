const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const upload = require("./routes/upload");
const PORT = process.env.PORT || 8080;
const app = express();
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
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
      message: err.message || "Internal Server Error",
    },
  });
});
