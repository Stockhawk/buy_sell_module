const models = require('../index.js');

const Stock = models.loadSchema('Stock', {
  fields: {
    ask_price: 'float',
    ask_size: 'int',
    bid_price: 'float',
    bid_size: 'int',
    last_extended_hours_trade_price: 'float',
    last_trade_price: 'float',
    symbol: 'varchar',
    quantity: 'int',
  },
  key: ['symbol'],
});

module.exports = Stock;
