import React from 'react';
import { mount } from 'enzyme';

import PaymentInfo from './index';

jest.mock('fusion:properties', () => (jest.fn(() => ({
  locale: 'en',
}))));

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
