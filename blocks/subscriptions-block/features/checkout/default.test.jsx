import React from 'react';
import { shallow, mount } from 'enzyme';
import Checkout from './default';

jest.mock('fusion:properties', () => (jest.fn(() => ({ api: { retail: { origin: '' } } }))));

jest.mock('fusion:intl', () => ({
  __esModule: true,
  default: jest.fn(() => ({ t: jest.fn((phrase) => phrase) })),
}));

describe('The Offer feature', () => {
  it('renders the correct number of offer cards', () => {
    const wrapper = shallow(
      <Checkout
        customFields={{
          offerURL: '/offer-url/',
        }}
      />,
    );

    expect(wrapper.find('a').prop('href')).toBe('/offer-url/');
    expect(wrapper.find('Cart').exists()).toBe(true);
  });

  it('renders a contact info form', () => {
    const wrapper = mount(
      <Checkout
        customFields={{
          offerURL: '/offer-url/',
        }}
      />,
    );

    expect(wrapper.find('.xpmedia-subscriptions-contact-info').exists()).toBe(true);
  });
});
