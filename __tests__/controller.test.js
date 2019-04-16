import * as controller from '../controller';

jest.mock('../request');

describe('Valid account returns properly', () => {
  it('getAccountInfo returns an object with account info', () => {
    expect.assertions(1);
    return controller.getAccountInfo('2QW30682').then(accountInfo => expect(typeof accountInfo).toEqual('object'));
  });

  it('account object returns the correct user account', () => {
    expect.assertions(1);
    return controller.getAccountInfo('2QW30682').then(accountInfo => expect(accountInfo.account_number).toEqual('2QW30682'));
  });

  it('account object returns the correct user buying_power', () => {
    expect.assertions(1);
    return controller.getAccountInfo('2QW30682').then(accountInfo => expect(accountInfo.buying_power).toEqual('48642291.2050'));
  });

  it('account object returns the correct user option level', () => {
    expect.assertions(1);
    return controller.getAccountInfo('2QW30682').then(accountInfo => expect(accountInfo.option_level).toEqual(3));
  });

  it('account object returns the correct user watchlist', () => {
    expect.assertions(1);
    return controller.getAccountInfo('2QW30682').then(accountInfo => expect(accountInfo.watchlist).toEqual('FB,TSLA,SQ,AAPL,MSFT,BABA,V,JPM,BAC'));
  });
});

describe('Invalid account returns error', () => {
  it('accountID does not exist', () => {
    expect.assertions(1);
    return expect(controller.getAccountInfo('1GP10239')).rejects.toThrow('Account with 1GP10239 not found.');
  });
});

describe('Valid account returns properly', () => {
  it('getStockInfo returns an object with stock info', () => {
    expect.assertions(1);
    return controller.getStockInfo('AAPL').then(stockInfo => expect(typeof stockInfo).toEqual('object'));
  });

  it('stockInfo object matches the stock symbol looked up', () => {
    expect.assertions(1);
    return controller.getStockInfo('AAPL').then(stockInfo => expect(stockInfo.symbol).toEqual('AAPL'));
  });

  it('stockInfo object returns the correct ask price', () => {
    expect.assertions(1);
    return controller.getStockInfo('AAPL').then(stockInfo => expect(stockInfo.ask_price).toEqual('189.190000'));
  });

  it('stockInfo object returns the correct ask size', () => {
    expect.assertions(1);
    return controller.getStockInfo('AAPL').then(stockInfo => expect(stockInfo.ask_size).toEqual(100));
  });

  it('stockInfo object returns the correct bid price', () => {
    expect.assertions(1);
    return controller.getStockInfo('AAPL').then(stockInfo => expect(stockInfo.bid_price).toEqual('189.170000'));
  });

  it('stockInfo object returns the correct bid size', () => {
    expect.assertions(1);
    return controller.getStockInfo('AAPL').then(stockInfo => expect(stockInfo.bid_size).toEqual(100));
  });

  it('stockInfo object returns the correct extended hours trade price', () => {
    expect.assertions(1);
    return controller.getStockInfo('AAPL').then(stockInfo => expect(stockInfo.last_extended_hours_trade_price).toEqual('189.160000'));
  });

  it('stockInfo object returns the correct last trade price', () => {
    expect.assertions(1);
    return controller.getStockInfo('AAPL').then(stockInfo => expect(stockInfo.last_trade_price).toEqual('189.160000'));
  });
  
  it('stockInfo object returns the correct purchased quantity in the current account', () => {
    expect.assertions(1);
    return controller.getStockInfo('AAPL').then(stockInfo => expect(stockInfo.quantity).toEqual('133.0000'));
  });
});

describe('Invalid stock symbol returns error', () => {
  it('stock symbol does not exist', () => {
    expect.assertions(1);
    return expect(controller.getStockInfo('GIBBERISH')).rejects.toThrow('Stock GIBBERISH not found.');
  });
});
