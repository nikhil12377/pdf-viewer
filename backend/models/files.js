const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Files = sequelize.define("files", {
  name: {
    type: Sequelize.STRING,
  },
  size: {
    type: Sequelize.STRING,
  },
});

module.exports = Files;
