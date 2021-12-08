import React from 'react';
import { mount, shallow } from 'enzyme';

import PaymentInfo from './index';

jest.mock('fusion:intl', () => ({
  __esModule: true,
  default: jest.fn(() => ({ t: jest.fn((phrase) => phrase) })),
}));

describe('PaymentInfo', () => {
  it('renders', () => {
    const wrapper = shallow(
      <PaymentInfo />,
    );

    expect(wrapper.html()).not.toBe(null);
  });
});
