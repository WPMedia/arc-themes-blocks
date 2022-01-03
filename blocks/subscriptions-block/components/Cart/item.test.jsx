import React from 'react';
import { mount } from 'enzyme';
import Item from './item';

describe('Cart Item', () => {
  it('renders name, description and additional info', () => {
    const props = {
      name: 'Name',
      description: 'Item description',
      additionalInfo: 'Some addtional information for an item',
    };
    const wrapper = mount(
      <Item {...props} />,
    );

    expect(wrapper.find('.xpmedia-subscriptions-cart-item').exists()).toBe(true);
    expect(wrapper.find('.xpmedia-subscriptions-cart-item--name').text()).toBe(props.name);
    expect(wrapper.find('.xpmedia-subscriptions-cart-item--description').text()).toBe(props.description);
    expect(wrapper.find('.xpmedia-subscriptions-cart-item--info').text()).toBe(props.additionalInfo);
  });

  it('renders name, description', () => {
    const props = {
      name: 'Name',
      description: 'Item description',
    };
    const wrapper = mount(
      <Item {...props} />,
    );

    expect(wrapper.find('.xpmedia-subscriptions-cart-item').exists()).toBe(true);
    expect(wrapper.find('.xpmedia-subscriptions-cart-item--name').text()).toBe(props.name);
    expect(wrapper.find('.xpmedia-subscriptions-cart-item--description').text()).toBe(props.description);
    expect(wrapper.find('.xpmedia-subscriptions-cart-item--info').exists()).toBe(false);
  });

  it('renders name only', () => {
    const props = {
      name: 'Name',
    };
    const wrapper = mount(
      <Item {...props} />,
    );

    expect(wrapper.find('.xpmedia-subscriptions-cart-item').exists()).toBe(true);
    expect(wrapper.find('.xpmedia-subscriptions-cart-item--name').text()).toBe(props.name);
    expect(wrapper.find('.xpmedia-subscriptions-cart-item--description').exists()).toBe(false);
    expect(wrapper.find('.xpmedia-subscriptions-cart-item--info').exists()).toBe(false);
  });
});
