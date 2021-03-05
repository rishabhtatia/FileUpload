const Sequelize = require("sequelize");
const mysql = require("mysql2/promise");
const { DB, USERNAME, PASSWORD, HOST } = require("../constants/db");

initialize();
async function initialize() {
  // create db if it doesn't exist
  try {
    const connection = await mysql.createConnection({
      host: HOST,
      user: USERNAME,
      password: PASSWORD
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`test\`;`);
  } catch (err) {
    console.log("Error occured while creating Database");
  }
}
module.exports = new Sequelize(DB, USERNAME, PASSWORD, {
  dialect: "mysql",
  host: HOST,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
