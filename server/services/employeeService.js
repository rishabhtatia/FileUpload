const Employee = require("../models/Employee");
const Image = require("../models/Image");
const fs = require("fs");
const csv = require("fast-csv");
const readXlsxFile = require("read-excel-file/node");

const addEmployee = (employees, req, res) => {
  Employee.bulkCreate(employees)
    .then(() => {
      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname
      });
    })
    .catch(error => {
      res.status(500).send({
        message: "Fail to import data into database!",
        error: error.message
      });
    });
};

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
        addEmployee(employees, req, res);
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
          addEmployee(employees, req, res);
        });
    }
  } catch (error) {
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname
    });
  }
};

const imageUpload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a file!");
    }
    const image = await Image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(
        __basedir + "/resources/static/images/" + req.file.filename
      )
    });
    fs.writeFileSync(
      __basedir + "/resources/static/tmp/" + image.name,
      image.data
    );
    return res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname
    });
  } catch (error) {
    console.log(error?.original?.code);
    if (error?.original?.code === "ER_DUP_ENTRY") {
      return res.status(500).send({
        message: "Duplicate File: " + req.file.originalname
      });
    }
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
