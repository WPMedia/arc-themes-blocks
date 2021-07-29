import React from 'react';
import { mount } from 'enzyme';
import HeaderAccountAction from './default';

describe('Subscriptions HeaderAccountAction', () => {
  it('renders', () => {
    const wrapper = mount(<HeaderAccountAction />);
    expect(wrapper.html()).not.toBe(null);
  });
});
