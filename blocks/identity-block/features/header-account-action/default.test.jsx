import React from 'react';
import { mount } from 'enzyme';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';

import HeaderAccountAction from './default';

describe('Subscriptions HeaderAccountAction', () => {
  getProperties.mockImplementation(() => ({
    subscriptions: {
      identity: {
        apiOrigin: 'link',
      },
    },
  }));
  it('renders', () => {
    useFusionContext.mockReturnValueOnce({
      arcSite: 'arcxp',
    });
    const wrapper = mount(<HeaderAccountAction customFields={{ loginURL: '' }} />);

    expect(wrapper.html()).not.toBe(null);
  });
});

it('shows sign in url and create account url', () => {
  useFusionContext.mockReturnValueOnce({
    arcSite: 'arcxp',
  });

  const wrapper = mount(<HeaderAccountAction customFields={{ 
    loginURL: 'https://www.google.com', createAccountURL: 'https://www.google.com' 
    }} />);

  expect(wrapper.html()).not.toBe(null);
  expect(wrapper.find('div.xpmedia-subs-header--logged-out-header')).toHaveLength(1);
});
