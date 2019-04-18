# buy_sell_module
Transactional component handles sale/purchase of desired stocks 

#CRUD API Routes


| Route                                            | Type                 | Result                              |
|--------------------------------------------------|----------------------|-------------------------------------|
| `/stocks/:ticker`                                | Get                  | Initial Page Load                   |
| `/api/stocks/:ticker`                            | Get                  | Display Company API Data            |
| `/api/accounts/:account_number`                  | Get                  | Display Account API Data            |
| `/accounts/:account_number`                      | Update               | Purchase/Sell stock                 |
| `/stocks/:ticker/dev`                            | Create/Delete        | Developer access to add new company |
| `/accounts/:account_number/dev`                  | Create/Update/Delete | Admin changes to user account       |


Buy/Sell Module does not create new records or delete exisiting ones. It only modifies buy/sell data for the
user. 

