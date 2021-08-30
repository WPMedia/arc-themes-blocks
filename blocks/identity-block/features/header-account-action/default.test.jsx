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

  describe('Account Menu', () => {
    it('renders a logged in menu when logged in', () => {
      useFusionContext.mockReturnValueOnce({
        arcSite: 'arcxp',
      });
      const wrapper = mount(<HeaderAccountAction customFields={{ loginURL: '' }} />);

      expect(wrapper.find('div').hasClass('account-dropdown')).toBe(true);
    });
  });
});
