const db = require('./index.js');
const Account = require('./Accounts.js');
const Stock = require('./Stocks.js');

const sampleAccount = {
  account_number: '2QW30682',
  buying_power: '486422.2050',
  option_level: 3,
  watchlist: 'AAAAA,GFHJK,TTYYT,YYUOP,ADFGH,LOKIK,KLOPI,HIOPO,QWETY',
};

const insertSampleAccount = () => {
  Account.create(sampleAccount);
};

db.sync({ force: true })
  .then(() => {
    db.query(`COPY stocks FROM '/Users/julianvenci/Library/Mobile Documents/com~apple~CloudDocs/Hack Reactor/Immersive/Sr./SDC/buy_sell_module/mockData.csv' WITH DELIMITER ',' CSV HEADER`, (err, result) => {
      if (err) throw err;
      console.log('Success');
    })
      .then(() => insertSampleAccount())
      .catch(err => console.error(err));
  });
