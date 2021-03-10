const Sequelize = require("sequelize");
const db = require("../config/database");
const Image = db.define("image", {
  type: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING,
    unique: "name"
  },
  data: {
    type: Sequelize.BLOB("long")
  }
});

module.exports = Image;
