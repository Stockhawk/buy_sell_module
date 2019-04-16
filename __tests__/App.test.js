import React from 'react';
import { shallow, mount } from 'enzyme';

// Components
import App from '../src/App';
import { Input } from '../src/App';

function setup() {
  const AppComponent = shallow(<App />);
  const InputComponent = shallow(<Input />);

  return { AppComponent, InputComponent };
}

describe('App component is valid', () => {
  it('App component exists', () => {
    const { AppComponent } = setup();
    expect(AppComponent.exists()).toBe(true);
  });

  it('App component has a form', () => {
    const { AppComponent } = setup();
    expect(AppComponent.find('form').exists()).toBe(true);
  });

  it('App component calls function to fetch stock data', () => {
    const spy = jest.spyOn(App.prototype, "getStockData");
    const wrapper = mount(<App />);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe('Input component is valid', () => {
  it('Input component exists', () => {
    const { InputComponent } = setup();
    expect(InputComponent.exists()).toBe(true);
  });

  it('Input component has a label element', () => {
    const { InputComponent } = setup();
    expect(InputComponent.find('input').exists()).toBe(true);
  });
});
