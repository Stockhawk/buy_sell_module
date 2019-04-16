import React from 'react';
import { shallow } from 'enzyme';

// Components
import DisplayContainer from './Dropdown';

function setup() {
  const wrapper = shallow(<DisplayContainer />);
  return { wrapper };
}

describe('WelcomeMessage Test Suite', () => {
  it('Should have an image', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });
});
