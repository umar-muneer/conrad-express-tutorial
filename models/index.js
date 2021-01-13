const Sequelize = require("sequelize");
const username = process.env.USER;
const password = process.env.PASS;
const sequelize = new Sequelize('sequelize_demo', username, password, {
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 1
    }
});