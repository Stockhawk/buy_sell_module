const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const fs = require('fs');
const controller = require('./controller');

const app = express();

app.get('*.js', (request, response, next) => {
  if (fs.existsSync(request.url + '.br')) {
    request.url += '.br';
    response.set('Content-Encoding', 'br');
  } else if (fs.existsSync(request.url + '.gz')) {
    request.url += '.gz';
    response.set('Content-Encoding', 'gzip');
  }
  next();
});

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/stocks/:ticker', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());

app.get('/api/stocks/:ticker', (req, res) => {
  controller.getStockInfo(req.params.ticker)
    .then((stockData) => {
      res.status(200);
      res.send(stockData);
    });
});

app.get('/api/accounts/:account_number', (req, res) => {
  controller.getAccountInfo(req.params.account_number)
    .then((account) => {
      res.status(200);
      res.send(account);
    });
});

app.listen(3002, () => console.log('BuySell server listening on port 3002!\n'));
