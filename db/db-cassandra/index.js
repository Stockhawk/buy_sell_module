const ExpressCassandra = require('express-cassandra');

const models = ExpressCassandra.createClient({
  clientOptions: {
    contactPoints: ['127.0.0.1'],
    protocolOptions: { port: 9042 },
    keyspace: 'mykeyspace',
    queryOptions: { consistency: ExpressCassandra.consistencies.one },
  },
  ormOptions: {
    defaultReplicationStrategy: {
      class: 'SimpleStrategy',
      replication_factor: 1,
    },
    migration: 'safe',
  },
});

const Stock = models.loadSchema('stock', {
  fields: {
    ask_price: 'decimal',
    ask_size: 'int',
    bid_price: 'decimal',
    bid_size: 'int',
    last_extended_hours_trade_price: 'decimal',
    last_trade_price: 'decimal',
    symbol: 'varchar',
    quantity: 'decimal',
  },
  key: ['symbol'],
});

const Account = models.loadSchema('account', {
  fields: {
    account_number: 'varchar',
    buying_power: 'float',
    option_level: 'int',
    watch_list: 'varchar',
  },
  key: ['account_number'],
});

Stock.syncDBAsync()
  .then(() => console.log ('Stocks synchronized'))
  .then(() => Account.syncDBAsync())
  .then(() => console.log('Account synchornized'))
  .catch(err => console.error('unable to synchornize : ' + err)) 


// MyModel or models.instance.Person can now be used as the model instance
//console.log(models.instance.Stock === Stocks);

// sync the schema definition with the cassandra database table
// if the schema has not changed, the callback will fire immediately
// otherwise express-cassandra will try to migrate the schema and fire the callback afterwards


module.exports = models;
