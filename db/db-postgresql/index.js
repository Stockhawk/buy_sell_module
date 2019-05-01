const Sequelize = require('sequelize');

const pw = process.env.PGPASSFILE || '';
const host = process.env.PGHOST || 'localhost';
const dbName = process.env.PGDATABASE || 'api';
const user = process.env.PGUSER || 'me';

const db = new Sequelize(dbName, user, pw, {
  host,
  dialect: 'postgres',
  logging: false,
});


db
  .authenticate()
  .then(() => console.log('Connection successfully established!'))
  .catch(err => console.error('Whoopsie! Looks like you\'re not connected, heres why: ', err));


module.exports = db;
