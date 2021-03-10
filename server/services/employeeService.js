const Employee = require("../models/Employee");
const Image = require("../models/Image");
const File = require("../models/Files");
const fs = require("fs");
const csv = require("fast-csv");
const readXlsxFile = require("read-excel-file/node");

const addEmployee = (employees, req, res) => {
  Employee.bulkCreate(employees)
    .then(() => {
      res.status(200).send({
        message: `Uploaded the file successfully: ${req.file.originalname}`
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
    let path = `${__basedir}/resources/static/assets/uploads/${req.file.filename}`;
    if (req.file.mimetype.match(/(?:^|\W)(excel|spreadsheetml)(?:$|\W)/)) {
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
    if (req.file.mimetype.match(/(?:^|\W)(csv)(?:$|\W)/)) {
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
      message: `Could not upload the file: ${req.file.originalname}`
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
        `${__basedir}/resources/static/images/${req.file.filename}`
      )
    });
    fs.writeFileSync(
      `${__basedir}/resources/static/tmp/${image.name}`,
      image.data
    );
    return res.status(200).send({
      message: `Uploaded the file successfully: ${req.file.originalname}`
    });
  } catch (error) {
    console.log(error?.original?.code);
    if (error?.original?.code === "ER_DUP_ENTRY") {
      return res.status(500).send({
        message: `Duplicate File: ${req.file.originalname}`
      });
    }
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}`
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
          err.message || "Some error occurred while retrieving employees."
      });
    });
};

const getImage = async (req, res) => {
  try {
    console.log(req?.params?.name);
    if (req?.params?.name) {
      const data = await Image.findAll({
        where: {
          name: req?.params?.name
        }
      });
      if (data[0]?.dataValues) {
        res.set("Content-Type", data[0]?.dataValues?.type);
        res.send(data[0]?.dataValues.data);
      } else {
        res.status(400).send({ message: "No image found" });
      }
    } else {
      res.status(400).send({ message: "No image found" });
    }
  } catch (err) {
    return res.status(500).send({
      message: err?.message || "Some error occurred while retrieving image."
    });
  }
};

const uploadCsv = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a file!");
    }
    let path = `${__basedir}/resources/static/assets/uploads/${req.file.filename}`;
    await dbsql.query(`INSERT INTO files (source_file_path) VALUES("${path}")`);
    // const csvFile = await File.create({
    //   source_file_path: path
    // });
    return res.status(200).send({
      message: "Uploaded the file successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}`
    });
  }
};

const getCsv = async (req, res) => {
  try {
    // cosnt file = await fs.readFile("..res/static/assets/uploads/1614682547799-sheet1.csv")
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=tutorials.csv");
    res
      .status(200)
      .download(
        `${__basedir}/resources/static/assets/uploads/1614682547799-sheet1.csv`
      );
  } catch (err) {
    return res.status(500).send({
      message: err?.message || "Some error occurred while retrieving csv."
    });
  }
};

const updatedCsv = async (req, res) => {
  await File.update({ source_file_path: "asdas" }, { where: { id: 1 } });
  res.status(200).send({
    message: `Uploaded the file successfully`
  });
};
module.exports = {
  upload,
  imageUpload,
  getEmployees,
  getImage,
  getCsv,
  uploadCsv,
  updatedCsv
};
