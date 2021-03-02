const Sequelize = require("sequelize");
const db = require("../config/database");
const Employee = db.define("employee", {
  name: {
    type: Sequelize.STRING
  },
  department: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER
  }
});

module.exports = Employee;
