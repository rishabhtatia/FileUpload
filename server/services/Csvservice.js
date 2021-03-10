const fs = require("fs");
const csv = require("fast-csv");

const getList = async (req, res) => {
  try {
    dbsql.query(
      "select id,source_file_path,dest_file_path,is_processed from files",
      (error, results, field) => {
        if (error) throw error;
        return res.status(200).send(results);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error"
    });
  }
};

const uploadCsv = (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a file!");
    }
    let path = `${__basedir}/resources/static/assets/uploads/${req.file.filename}`;
    fs.createReadStream(path)
      .pipe(
        csv.parse({
          headers: true
        })
      )
      .on("error", error => {
        return res.status(500).send({
          message: `Could not upload the file: ${req.file.originalname}`
        });
      })
      .on("data", row => {})
      .on("end", () => {
        dbsql.query(
          `INSERT INTO files (source_file_path,is_processed) VALUES("${path}","NO")`
        );
        return res.status(200).send({
          message: "Uploaded the file successfully"
        });
      });
  } catch (error) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}`
    });
  }
};

const getCsv = async (req, res) => {
  try {
    const path = req.query.path;
    res.setHeader("Content-Type", "text/csv");
    res.status(200).download(path);
  } catch (err) {
    return res.status(500).send({
      message: err?.message || "Some error occurred while retrieving csv."
    });
  }
};

module.exports = {
  getList,
  getCsv,
  uploadCsv
};
