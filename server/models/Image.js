const Sequelize = require("sequelize");
const db = require("../config/database");
const Image = db.define("image", {
  type: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  },
  data: {
    type: DataTypes.BLOB("long")
  }
});

module.exports = Image;
