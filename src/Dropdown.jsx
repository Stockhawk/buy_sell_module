import React from 'react';
import ReactDOM from 'react-dom';

class DisplayContainer extends React.Component {
  constructor(...args){
    super(...args);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.clicked = this.clicked.bind(this);
    this.state = {
      displayValue: 'Good for Day',
      clicked: false,
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  clicked() {
    this.setState({
      clicked: true,
    });
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event){
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        clicked: false,
      });
    }
  }

  handleSelection(item){
    this.setState({
      displayValue: item.display
    })
  }
  render(){
    const listItems = [
      { display: 'Good for Day', value: 0 },
      { display: 'Good till Canceled', value: 1 }
    ];

    let dropdown;
    if (this.state.clicked) {
      dropdown = (
        <div ref={this.setWrapperRef}>
          <div className='clicked dropdown-width' onClick={this.clicked}>
            <DropDown options={listItems} value={this.state.displayValue} onClick={this.handleSelection} />
          </div>
        </div>
      );
    } else {
      dropdown = (
        <div ref={this.setWrapperRef}>
          <div className='notclicked dropdown-width' onClick={this.clicked}>
            <DropDown options={listItems} value={this.state.displayValue} onClick={this.handleSelection} />
          </div>
        </div>
      );
    }

    return (
      <div>
        {dropdown}
      </div>
    );
  }
}

class DropDown extends React.Component {
  static defaultProps = {
    className: ''
  };
  constructor(...args){
    super(...args);

    this.state = {
      active: false
    };
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.renderSelectionCont = this.renderSelectionCont.bind(this);
  }
  toggleDropDown(action, e){   
    switch (action){
      case 'close':
        this.setState({
          active: false
        });
        document.removeEventListener('click', this.handleDocumentClick); 
        break;
      default:
        this.setState({
          active: true
        });
        document.addEventListener('click', this.handleDocumentClick);
        break
    }
  }
  handleSelection(item){
    this.props.onClick(item);
    this.toggleDropDown('close');
  }
  handleDocumentClick(){
    this.toggleDropDown('close');   
  }
  handleOutsideClick(e){
    e.nativeEvent.stopImmediatePropagation();
  }
  renderSelectionCont(){  
    if (!this.state.active) return;

    return <DropDownItems options={this.props.options} onClick={this.handleSelection} displayField={this.props.displayField} />;
  }

  render(){
    let wrapperClassName = 'bd-dropdown' + (this.props.className ? ' ' + this.props.className : '');
    let caretClass = 'fa fa-chevron-down';
    let toggle = 'open';
    if (this.state.active) {
      caretClass = 'fa fa-chevron-up';
      wrapperClassName = wrapperClassName + ' __active';
      toggle = 'close';
    }

    return (
      <div className={wrapperClassName} onClick={this.handleOutsideClick}>
        <div className='__control' onClick={this.toggleDropDown.bind(this, toggle)}>
          <div>{this.props.value}</div>
          <i className={caretClass}></i>
        </div>
        {this.renderSelectionCont()}
      </div>
    );
  }
}

class DropDownItems extends React.Component {
  constructor(...args){
    super(...args);
  }
  render(){
    let options = this.props.options.map((item, idx) => {
      
      return (
        <li className='__item' key={idx} onClick={this.props.onClick.bind(this, item)}>{item.display}</li>
      );
    });
    return (
      <ul className='__options' onClick={this.props.onOutsideClick}>
        {options}
      </ul>
    );
  }
}

export default DisplayContainer;