const { requestAccount, requestStock } = require('./request');

module.exports.getAccountInfo = accountID => requestAccount(accountID);

module.exports.getStockInfo = stockSymbol => requestStock(stockSymbol);
