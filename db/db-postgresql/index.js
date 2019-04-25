const Sequelize = require('sequelize');

const db = new Sequelize('api', 'me', '', {
  host: 'localhost',
  dialect: 'postgres',
});


db
  .authenticate()
  .then(() => console.log('Connection successfully established!'))
  .catch(err => console.error('Whoopsie! Looks like you\'re not connected, heres why: ', err));


module.exports = db;
