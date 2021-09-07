import React from 'react';
import { mount } from 'enzyme';
import { useFusionContext } from 'fusion:context';

import HeaderAccountAction from './default';

jest.mock('../../components/Identity', () => ({
  __esModule: true,
  default: jest.fn(() => ({ isInitialized: true, isLoggedIn: () => true })),
}));

jest.mock('fusion:properties', () => (jest.fn(() => ({}))));

describe('Subscriptions HeaderAccountAction', () => {
  it('renders', () => {
    useFusionContext.mockReturnValueOnce({
      arcSite: 'arcxp',
    });
    const wrapper = mount(<HeaderAccountAction customFields={{ loginURL: '', createAccountURL: '' }} />);

    expect(wrapper.html()).not.toBe(null);
  });
});

it('shows sign in url and create account url', () => {
  useFusionContext.mockReturnValueOnce({
    arcSite: 'arcxp',
  });

  const wrapper = mount(<HeaderAccountAction customFields={{
    loginURL: 'https://www.google.com', createAccountURL: 'https://www.google.com',
  }}
  />);

  expect(wrapper.html()).not.toBe(null);
  expect(wrapper.find('div.xpmedia-subs-header--logged-out-header')).toHaveLength(1);
});
