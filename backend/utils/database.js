const Sequelize = require("sequelize");
const mysql = require("mysql2/promise");

const createDatabase = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS pdfFiles;`);
};
createDatabase();

const sequelize = new Sequelize("pdfFiles", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
