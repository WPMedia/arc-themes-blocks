import React from 'react';
import { mount } from 'enzyme';
import LoginForm from './default';

describe('Subscriptions HeaderAccountAction', () => {
  it('renders', () => {
    const wrapper = mount(<LoginForm />);
    expect(wrapper.html()).not.toBe(null);
  });
});
