const Sequelize = require('sequelize');
const db = require('./index.js');

const { Model } = Sequelize;

class Account extends Model {}
Account.init({
  account_number: {
    type: Sequelize.STRING(8),
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  buying_power: Sequelize.DECIMAL(14, 4),
  option_level: Sequelize.INTEGER,
  watchlist: Sequelize.STRING,
}, {
  sequelize: db,
  modelName: 'account',
  timestamps: false,
});

module.exports = Account;
