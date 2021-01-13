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
  await sequelize.sync({ alter: true }); // Don't ever do this in production, or local for that matter :P
  console.log("i am in!!!");
};
const Teacher = sequelize.define(
  "teachers",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    timestamps: true,
  }
);
const Student = sequelize.define('students', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}, {
    timestamps: true
});
module.exports = {
  initDb,
  Teacher,
  Student
};
