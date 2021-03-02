const Sequelize = require("sequelize");
const mysql = require("mysql2/promise");
initialize();

async function initialize() {
  // create db if it doesn't exist
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Ri$habh1234"
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`test\`;`);
  } catch (err) {
    console.log(err);
    console.log("Error occured while creating Database");
  }
}
module.exports = new Sequelize("test", "root", "Ri$habh1234", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
