const Stock = require('./models/Accounts.js');
const Account = require('./models/Stocks.js');

Stock.syncDBAsync()
  .then(() => console.log ('Stocks synchronized'))
  .then(() => Account.syncDBAsync())
  .catch(err => console.error('unable to synchornize : ' + err)) 
