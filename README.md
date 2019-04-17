# buy_sell_module
Transactional component handles sale/purchase of desired stocks 

#CRUD API Routes


| Route                                            | Type             | Result                      |
|--------------------------------------------------|------------------|-----------------------------|
| `/stocks/:ticker`                                | GET              | Initial Page Load           |
| `/api/stocks/:ticker`                            | GET              | Display Company API Data    |
| `/api/accounts/:account_number`                  | GET              | Display Account API Data    |
| `/accounts/:account_number`                      | UPDATE/PATCH     | Purchase/Sell stock         |


Buy/Sell Module does not create new records or delete exisiting ones. It only modifies buy/sell data for the
user. 

