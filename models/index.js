const Sequelize = require("sequelize");
const username = process.env.USER;
const password = process.env.PASS;
const sequelize = new Sequelize("sequelize_demo", username, password, {
  dialect: "mysql",
  pool: {
    max: 5,
    min: 1,
  },
});
const initDb = async () => {
  await sequelize.query("select version()");
  console.log("i am in!!!");
};
module.exports = {
  initDb,
};
