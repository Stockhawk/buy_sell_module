// This module is being mocked in __mocks__/request.js
const Stock = require('../db-postgresql/Stocks.js');
const Account = require('../db-postgresql/Accounts.js');

module.exports.requestStock = stockSymbol => Stock.findOne({ where: { symbol: stockSymbol } });

// eslint-disable-next-line max-len
module.exports.requestAccount = accountID => Account.findOne({ where: { account_number: accountID } });
