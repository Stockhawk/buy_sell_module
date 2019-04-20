const Sequelize = require('sequelize');

const db = new Sequelize('stocks', 'root', 'AbodelYsF113', { // <- make sure to change password and input from a config file
  host: 'localhost', // <- update host
  dialect: 'mysql',
});

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;
