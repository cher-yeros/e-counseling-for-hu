const { Sequelize } = require("sequelize");

const connection = new Sequelize("ecounseling", "root", "Yerosen1892!", {
  host: "localhost",
  dialect: "mysql",
  password: "Root12345678",
  logging: false,
});

connection
  .authenticate()
  // .sync({force:true})
  .then((result) => console.log(`\nMySql db connected!${result}\n`))
  .catch((err) => console.log("DB Error : ", err));

module.exports = connection;
