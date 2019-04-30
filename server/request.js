// This module is being mocked in __mocks__/request.js
const db = require('../db/db-postgresql/index.js');
const Stock = require('../db/db-postgresql/Stocks.js');
const Account = require('../db/db-postgresql/Accounts.js');

module.exports.requestStock = stockSymbol => db.query(`SELECT * FROM stocks WHERE symbol = '${stockSymbol}'`);

// eslint-disable-next-line max-len
module.exports.requestAccount = accountID => db.query(`SELECT * FROM accounts WHERE account_number = '${accountID}'`);


//Stock.findOne({ where: { symbol: stockSymbol } })
//Account.findOne({ where: { account_number: accountID } })

