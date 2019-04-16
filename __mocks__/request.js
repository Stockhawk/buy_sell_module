const account = {
  account_number: '2QW30682',
  buying_power: '48642291.2050',
  option_level: 3,
  watchlist: 'FB,TSLA,SQ,AAPL,MSFT,BABA,V,JPM,BAC',
};

export function requestAccount(accountID) {
  return new Promise((resolve, reject) => {
    process.nextTick(() => (account.account_number === accountID
      ? resolve(account)
      : reject(new Error(`Account with ${accountID} not found.`))
    ));
  });
}

const stock = {
  ask_price: '189.190000',
  ask_size: 100,
  bid_price: '189.170000',
  bid_size: 100,
  last_extended_hours_trade_price: '189.160000',
  last_trade_price: '189.160000',
  symbol: 'AAPL',
  quantity: '133.0000',
  createdAt: '2019-03-29T17:37:11.000Z',
  updatedAt: '2019-03-29T17:37:11.000Z',
};

export function requestStock(stockSymbol) {
  return new Promise((resolve, reject) => {
    process.nextTick(() => (stock.symbol === stockSymbol
      ? resolve(stock)
      : reject(new Error(`Stock ${stockSymbol} not found.`))
    ));
  });
}
