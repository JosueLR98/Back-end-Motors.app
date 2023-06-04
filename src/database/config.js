const { Sequelize } = require("sequelize");
const db = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "root",
  database: "motors24app",
  logging: false,
});
module.exports = { db };
