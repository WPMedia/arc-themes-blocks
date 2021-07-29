import React from 'react';
import { mount } from 'enzyme';
import HeaderAccountAction from './default';

describe('Subscripitons HeaderAccountAction', () => {
  it('renders', () => {
    const wrapper = mount(<HeaderAccountAction />);
    expect(wrapper.html()).not.toBe(null);
  });
});
