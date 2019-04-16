import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import DisplayContainer from './Dropdown.jsx';

export const Input = ({ disabled, onChange, min, name, value, placeholderText }) => (
  <React.Fragment>
    <input autoComplete="off" min={min} disabled={disabled} name={name} type="text" value={value} placeholder={placeholderText} onChange={onChange} />
  </React.Fragment>
);

class BuySell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stock: {
        ask_price: '0',
        ask_size: 0,
        bid_price: '0',
        bid_size: 0,
        last_extended_hours_trade_price: '0',
        last_trade_price: '0',
        symbol: '',
        quantity: '0.0000',
        createdAt: '',
        updatedAt: '',
      },
      account: {
        buying_power: '',
        option_level: 0,
        watchlist: '',
      },
      side: 'buy',
      ordertype: 'market', // market, limit, stoploss, stoplimit
      stopprice: '',
      limitprice: '',
      quantity: '',
      estimatedOrderPrice: 0,
      ordertypeclicked: false,
    };

    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleShareChange = this.handleShareChange.bind(this);
    this.updateStopPrice = this.updateStopPrice.bind(this);
    this.updateLimitPrice = this.updateLimitPrice.bind(this);
    this.updateWatchlist = this.updateWatchlist.bind(this);
    this.orderTypeMenuClick = this.orderTypeMenuClick.bind(this);
    this.updateToBuySide = this.updateToBuySide.bind(this);
    this.updateToSellSide = this.updateToSellSide.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
  }

  componentDidMount() {
    this.getStockData();
    this.getAccountData();
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event){
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        ordertypeclicked: false,
      });
    }
  }

  getStockData() {
    const ticker = window.location.pathname.split('/')[2];
    axios.get(`/api/stocks/${ticker}`)
      .then(res => res.data)
      .then((result) => {
        this.setState({
          stock: result,
        });
      });
  }

  getAccountData() {
    axios.get('/api/accounts/2QW30682')
      .then(res => res.data)
      .then((result) => {
        this.setState({
          account: result,
        });
      });
  }

  orderTypeMenuClick() {
    this.setState({
      ordertypeclicked: !this.state.ordertypeclicked,
    });
  }

  handlePriceChange(value) {
    let inputString = value; // '$14,239'
    const reg = /^\d*\.?\d*$/;

    if (inputString.length !== 1) {
      inputString = inputString.substr(1, inputString.length); // '14,239'
    }
    inputString = inputString.split(',').join(''); // '14239'

    if (reg.test(inputString)) {
      let inputNum = inputString.split('.');
      inputNum[0] = inputNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      if (inputNum[1]) inputNum[1] = inputNum[1].substr(0, 4);
      inputNum = inputNum.join('.');

      return `$${inputNum}`;
    }
    const noChange = value.substr(0, value.length - 1);
    return noChange;
  }

  handleShareChange(value) {
    const reg = /^\d+$/;

    if (reg.test(value)) {
      this.setState({
        quantity: value,
      });
    } else {
      const noChange = value.substr(0, value.length - 1);
      this.setState({
        quantity: noChange,
      });
    }

    if (value === '') {
      this.setState({
        quantity: '',
      });
    }
    setTimeout(() => this.updateEstimatedOrderPrice(), 0);
  }

  updateStopPrice(event) {
    if (event.target.value === '') {
      this.setState({
        stopprice: '',
      });
    } else {
      const newPrice = this.handlePriceChange(event.target.value);
      this.setState({
        stopprice: newPrice,
      });
    }
  }

  updateLimitPrice(event) {
    if (event.target.value === '') {
      this.setState({
        limitprice: '',
      });
    } else {
      const newPrice = this.handlePriceChange(event.target.value);
      this.setState({
        limitprice: newPrice,
      });
    }

    setTimeout(() => this.updateEstimatedOrderPrice(), 0);
  }

  updateEstimatedOrderPrice() {
    if (this.state.ordertype === 'market' || this.state.ordertype === 'stoploss') {
      const orderTotal = Math.round(Number(this.state.stock.last_extended_hours_trade_price) * Number(this.state.quantity) * 100) / 100;
      this.setState({
        estimatedOrderPrice: orderTotal,
      });
    } else {
      const orderTotal = Math.round(Number((this.state.limitprice.substr(1, this.state.limitprice.length).split(',').join(''))) * Number(this.state.quantity) * 100) / 100;
      this.setState({
        estimatedOrderPrice: orderTotal,
      });
    }
  }

  updateWatchlist() {
    const watchlistArray = this.state.account.watchlist.split(',');
    const currentSymbol = this.state.stock.symbol;
    const newAccount = this.state.account;

    if (_.includes(watchlistArray, currentSymbol)) {
      _.pull(watchlistArray, currentSymbol);
      const newWatchlist = watchlistArray.join(',');
      newAccount.watchlist = newWatchlist;
      this.setState({
        account: newAccount,
      });
    } else {
      watchlistArray.push(currentSymbol);
      const newWatchlist = watchlistArray.join(',');
      newAccount.watchlist = newWatchlist;
      this.setState({
        account: newAccount,
      });
    }
  }

  updateToBuySide() {
    this.setState({
      side: 'buy',
    });
  }

  updateToSellSide() {
    this.setState({
      side: 'sell',
    });
  }

  render() {
    const isWatched = (symbol) => {
      return _.includes(this.state.account.watchlist.split(','), symbol);
    };

    let sellButton;
    if (Number(this.state.stock.quantity) > 0 && this.state.side === 'sell') {
      sellButton = (
        <div>
          <button className="clicked-tab" type="button" onClick={this.updateToSellSide}>Sell { this.state.stock.symbol }</button>
        </div>
      );
    } else if (Number(this.state.stock.quantity) > 0) {
      sellButton = (
        <div>
          <button type="button" onClick={this.updateToSellSide}>Sell { this.state.stock.symbol }</button>
        </div>
      );
    } else {
      sellButton = <div />;
    }

    let buyButton;
    if (this.state.side === 'buy') {
      buyButton = (
        <div>
          <button className="clicked-tab" type="button" onClick={this.updateToBuySide}>Buy { this.state.stock.symbol }</button>
        </div>
      );
    } else {
      buyButton = (
        <div>
          <button type="button" onClick={this.updateToBuySide}>Buy { this.state.stock.symbol }</button>
        </div>
      );
    }

    const OrderTypeButtonComponent = (props) => {
      const handleClick = () => {
        if (props.text === 'Market Order') {
          this.setState({
            ordertype: 'market',
            ordertypeclicked: !this.state.ordertypeclicked,
          });
        } else if (props.text === 'Limit Order') {
          this.setState({
            ordertype: 'limit',
            ordertypeclicked: !this.state.ordertypeclicked,
          });
        } else if (props.text === 'Stop Loss Order') {
          this.setState({
            ordertype: 'stoploss',
            ordertypeclicked: !this.state.ordertypeclicked,
          });
        } else {
          this.setState({
            ordertype: 'stoplimit',
            ordertypeclicked: !this.state.ordertypeclicked,
          });
        }
      };

      let currentOrder = props.text.split(' ');
      currentOrder = currentOrder.splice(0, currentOrder.length - 1).join('').toLowerCase();


      if (this.state.ordertype === currentOrder) {
        return <button className="active" type="button" onClick={handleClick}>{props.text}</button>;
      }

      return (
        <button className="inactive" type="button" onClick={handleClick}>{props.text}</button>
      );
    };

    let orderType;
    if (this.state.ordertypeclicked) {
      orderType = (
        <div className="ordertypedropdown" ref={this.setWrapperRef}>
          <div className="ordertypeheader">Order Type</div>
          <div className="ordertypeoptions">
            <OrderTypeButtonComponent text="Market Order" />
            <OrderTypeButtonComponent text="Limit Order" />
            <OrderTypeButtonComponent text="Stop Loss Order" />
            <OrderTypeButtonComponent text="Stop Limit Order" />
          </div> 
        </div>
      );
    } else {
      orderType = <div />;
    }

    let tradeButton;
    if (this.state.account.option_level > 0) {
      tradeButton = <button type="submit" className="outerBtn">Trade {this.state.stock.symbol} Options</button>;
    } else {
      tradeButton = <div />;
    }

    let stopPriceRow;
    if (this.state.ordertype === 'stoploss') {
      stopPriceRow = (
        <div className="stopprice">
          <label>
            <div className="stoppriceLabel focusprice">Stop Price</div>
            <Input
              name="stop_price"
              placeholderText="$0.00"
              disabled={false}
              value={this.state.stopprice}
              onChange={e => this.updateStopPrice(e)}
            />
          </label>
        </div>
      );
    } else if (this.state.ordertype === 'stoplimit') {
      stopPriceRow = (
        <div className="stopprice">
          <label>
            <div className="stoppriceLabel">Stop Price</div>
            <Input
              name="stop_price"
              placeholderText="$0.00"
              disabled={false}
              value={this.state.stopprice}
              onChange={e => this.updateStopPrice(e)}
            />
          </label>
        </div>
      );
    } else {
      stopPriceRow = <div />;
    }

    let limitPriceRow;
    if (this.state.ordertype === 'limit' || this.state.ordertype === 'stoplimit') {
      limitPriceRow = (
        <div className="limitprice">
          <label>
            <div className="limitpriceLabel focusprice">Limit Price</div>
            <Input
              name="price"
              placeholderText="$0.00"
              disabled={false}
              value={this.state.limitprice}
              onChange={e => this.updateLimitPrice(e)}
            />
          </label>
        </div>
      );
    } else {
      limitPriceRow = <div />;
    }

    let marketPriceRow;
    if (this.state.ordertype === 'market') {
      marketPriceRow = (
        <div className="marketprice">
          <label>
            <div className="marketpriceLabel focusprice">Market Price</div>
            <div className="marketpriceAmount">{ `$${this.state.stock.last_extended_hours_trade_price.substr(0, this.state.stock.last_extended_hours_trade_price.length - 4)}` }</div>
          </label>
        </div>
      );
    } else {
      marketPriceRow = <div />;
    }

    let expirationRow;
    if (this.state.ordertype === 'limit' || this.state.ordertype === 'stoploss' || this.state.ordertype === 'stoplimit') {
      expirationRow = (
        <div className="expiration">
          <label>
            <div className="expirationLabel">Expiration</div>
            <DisplayContainer />
          </label>
        </div>
      );
    } else {
      expirationRow = <div />;
    }

    let orderMenuButton;
    if (this.state.ordertypeclicked === true) {
      orderMenuButton = (
        <button className="kebab clicked-tab" onClick={this.orderTypeMenuClick} type="button">
          <svg width="28" height="28" viewBox="0 0 28 28">
            <path className="kebab" fill="#20ce99" fillRule="evenodd" d="M14,16 C12.8954305,16 12,15.1045695 12,14 C12,12.8954305 12.8954305,12 14,12 C15.1045695,12 16,12.8954305 16,14 C16,15.1045695 15.1045695,16 14,16 Z M6,16 C4.8954305,16 4,15.1045695 4,14 C4,12.8954305 4.8954305,12 6,12 C7.1045695,12 8,12.8954305 8,14 C8,15.1045695 7.1045695,16 6,16 Z M22,16 C20.8954305,16 20,15.1045695 20,14 C20,12.8954305 20.8954305,12 22,12 C23.1045695,12 24,12.8954305 24,14 C24,15.1045695 23.1045695,16 22,16 Z"></path>
          </svg>
        </button>
      );
    } else {
      orderMenuButton = (
        <button className="kebab" onClick={this.orderTypeMenuClick} type="button">
          <svg width="28" height="28" viewBox="0 0 28 28">
            <path fillRule="evenodd" d="M14,16 C12.8954305,16 12,15.1045695 12,14 C12,12.8954305 12.8954305,12 14,12 C15.1045695,12 16,12.8954305 16,14 C16,15.1045695 15.1045695,16 14,16 Z M6,16 C4.8954305,16 4,15.1045695 4,14 C4,12.8954305 4.8954305,12 6,12 C7.1045695,12 8,12.8954305 8,14 C8,15.1045695 7.1045695,16 6,16 Z M22,16 C20.8954305,16 20,15.1045695 20,14 C20,12.8954305 20.8954305,12 22,12 C23.1045695,12 24,12.8954305 24,14 C24,15.1045695 23.1045695,16 22,16 Z"></path>
          </svg>
        </button>
      );
    }

    return (
      <React.Fragment>
        <form>
          <header>
            {buyButton}
            {sellButton}
            <div className="menu">
              {orderMenuButton}
              {orderType}
            </div>
          </header>
          <main>
            <div className="fields">
              {stopPriceRow}
              {limitPriceRow}
              <div className="shares">
                <label>
                  <div className="sharesLabel">Shares</div>
                  <Input
                    name="quantity"
                    placeholderText="0"
                    disabled={false}
                    value={this.state.quantity}
                    min="0"
                    onChange={e => this.handleShareChange(e.target.value)}
                  />
                </label>
              </div>
              {marketPriceRow}
              {expirationRow}
              <div className="estimate">
                <label>
                  <div className="estimateLabel">{this.state.side === 'buy' ? 'Estimated Cost' : 'Estimated Credit'}</div>
                  <div className="estimateAmount">{this.handlePriceChange(`$${this.state.estimatedOrderPrice.toFixed(2)}`)}</div>
                </label>
              </div>
            </div>
            <button className="reviewBtn" type="submit">Review Order</button>
          </main>
          <div className="tail">
            <div className="tailMessage">{this.state.side === 'buy' ? `${this.handlePriceChange(`$${Math.round(Number(this.state.account.buying_power) * 100) / 100}`)} Buying Power Available` : `${Math.round(this.state.stock.quantity)} Shares Available`}</div>
          </div>
        </form>
        <footer>
          <div>{tradeButton}</div>
          <div><button type="submit" className="outerBtn" onClick={this.updateWatchlist}>{isWatched(this.state.stock.symbol) ? 'Remove from Watchlist' : 'Add to Watchlist'}</button></div>
        </footer>
      </React.Fragment>
    );
  }
}

export default BuySell;
