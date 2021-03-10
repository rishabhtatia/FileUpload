const Sequelize = require("sequelize");
const db = require("../config/database");
const File = db.define(
  "file",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    source_file_path: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    source_file_upload_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    dest_file_path: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    dest_file_upload_at: {
      type: Sequelize.DATE,
      defaultValue: null
    },
    is_processed: {
      type: Sequelize.ENUM,
      values: ["YES", "NO"],
      defaultValue: "NO"
    }
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    charset: "utf8mb4",
    collate: "utf8mb4_0900_ai_ci"
  }
);

module.exports = File;
