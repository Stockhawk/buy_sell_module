const Sequelize = require('sequelize');
const db = require('./index.js');

const Stock = db.define('stock', {
  ask_price: {
    type: Sequelize.DECIMAL(12, 6),
    allowNull: false,
  },
  ask_size: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  bid_price: {
    type: Sequelize.DECIMAL(12, 6),
    allowNull: false,
  },
  bid_size: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  last_extended_hours_trade_price: {
    type: Sequelize.DECIMAL(12, 6),
    allowNull: false,
  },
  last_trade_price: {
    type: Sequelize.DECIMAL(12, 6),
    allowNull: false,
  },
  symbol: {
    type: Sequelize.STRING(5),
    primaryKey: true,
    unique: true,
  },
  quantity: {
    type: Sequelize.DECIMAL(14, 4),
    allowNull: false,
  },
});

module.exports = Stock;
