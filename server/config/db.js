const sequelize = require("sequelize");

const db = new sequelize("womenup","root","",{
    dialect: "mysql"
});

db.sync({});

module.exports = db;