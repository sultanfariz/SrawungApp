const sequelize = require("sequelize");

const db = new sequelize("srawung","root","",{
    dialect: "mysql"
});

db.sync({});

module.exports = db;