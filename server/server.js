//require('newrelic');

const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const redis = require('redis');
const fs = require('fs');
const db = require('../db/db-postgresql/index.js');
const Account = require('../db/db-postgresql/Accounts');


const app = express();
const client = redis.createClient();

app.get('*.js', (request, response, next) => {
  if (fs.existsSync(`${request.url  }.br`)) {
    request.url += '.br';
    response.set('Content-Encoding', 'br');
  } else if (fs.existsSync(`${request.url  }.gz`)) {
    request.url += '.gz';
    response.set('Content-Encoding', 'gzip');
  }
  next();
});

app.use(express.static(path.join(__dirname, '../dist')));
app.use('/stocks/:ticker', express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.json());

client.on('error', err => console.log(`Error ${err}`));


app.get('/api/stocks/:ticker', (req, res) => {
  // controller.getStockInfo(req.params.ticker)
  const tickerRedisKey = req.params.ticker;
  client.get(tickerRedisKey, (err, ticker) => {
    if (ticker) {
      const parsedJSON = JSON.parse(ticker);
      res.status(200);
      res.send(parsedJSON[0]);
    } else {
      db.query(`SELECT * FROM stocks WHERE symbol = '${req.params.ticker}'`)
        .then((stockData) => {
          client.setex(tickerRedisKey, 3600, JSON.stringify(stockData[0]));
          res.status(200);
          res.send(stockData[0][0]);
        })
        .catch(error => res.status(404).end(error));
    }
  });
});

app.get('/api/accounts/:account_number', (req, res) => {
  db.query(`SELECT * FROM accounts WHERE account_number = '${req.params.account_number}'`)
    .then((account) => {
      res.status(200);
      res.send(account[0][0]);
    })
    .catch(err => res.status(404).end(err));
});

app.put('/api/accounts/:account_number', (req, res) => {
  const accountID = req.params.account_number;
  const ticker = req.body;
  db.query(`INSERT into accounts (watchlist) VALUES (${ticker}) WHERE account_number = ${accountID}`)
    .then(() => res.status(200).end())
    .catch(err => res.status(418).end(err));
});

app.delete('/api/accounts/:account_number', async (req, res) => {
  const accountID = req.params.accountNumber;
  const { ticker } = req.body;
  const user = await Account.findOne({ where: { account_number: accountID } });
  let watchlist = user[0].watchlist.split(' ');
  watchlist = watchlist.splice(watchlist.indexOf(ticker), 1);
  db.query(`INSERT into accounts (watchlist) VALUES (${watchlist}) WHERE account_number = ${accountID}`)
    .then(() => res.status(200).end())
    .catch(err => res.status(418).end(err));
});

app.listen(3002, () => console.log('BuySell server listening on port 3002!\n'));
