const db = require("../config/database");
const Employee = require("../models/Employee");

const fs = require("fs");
const csv = require("fast-csv");
const readXlsxFile = require("read-excel-file/node");

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a file!");
    }

    let employees = [];
    let path =
      __basedir + "/resources/static/assets/uploads/" + req.file.filename;
    if (
      req.file.mimetype.includes("excel") ||
      req.file.mimetype.includes("spreadsheetml")
    ) {
      readXlsxFile(path).then(rows => {
        // skip header
        rows.shift();
        rows.forEach(row => {
          let employee = {
            id: row[0],
            name: row[1],
            department: row[2],
            age: row[3]
          };
          employees.push(employee);
        });
        Employee.bulkCreate(employees)
          .then(() => {
            res.status(200).send({
              message:
                "Uploaded the file successfully: " + req.file.originalname
            });
          })
          .catch(error => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message
            });
          });
      });
    }
    if (req.file.mimetype.includes("csv")) {
      fs.createReadStream(path)
        .pipe(csv.parse({ headers: true }))
        .on("error", error => {
          throw error.message;
        })
        .on("data", row => {
          employees.push(row);
        })
        .on("end", () => {
          Employee.bulkCreate(employees)
            .then(() => {
              res.status(200).send({
                message:
                  "Uploaded the file successfully: " + req.file.originalname
              });
            })
            .catch(error => {
              res.status(500).send({
                message: "Fail to import data into database!",
                error: error.message
              });
            });
        });
    }
  } catch (error) {
    console.log(error);
    console.log("ERROR");
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname
    });
  }
};

const imageUpload = (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a file!");
    }
    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname
    });
  } catch (error) {
    console.log(error);
    console.log("ERROR");
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname
    });
  }
};

const getEmployees = (req, res) => {
  Employee.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

module.exports = {
  upload,
  imageUpload,
  getEmployees
};
