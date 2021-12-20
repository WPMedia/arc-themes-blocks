import React from 'react';
import { mount } from 'enzyme';

import PaymentInfo from './index';

jest.mock('fusion:properties', () => (jest.fn(() => ({
  locale: 'en',
}))));

jest.mock('fusion:intl', () => ({
  __esModule: true,
  default: jest.fn(() => ({ t: jest.fn((phrase) => phrase) })),
}));

describe('PaymentInfo', () => {
  it('renders null if no stripe promise', () => {
    const wrapper = mount(
      <PaymentInfo
        orderNumber={1}
        paymentDetails={{
          parameter1: 'client_secret',
          parameter2: 'stripe_key',
        }}
        paymentMethodID={1}
        successURL="https://success.url"
      />,
    );
    expect(wrapper.html()).toBe(null);
  });
});
