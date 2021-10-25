import React from 'react';
import { mount } from 'enzyme';

import getProperties from 'fusion:properties';

import Paywall from './default';
import usePaywall from '../../components/usePaywall';

jest.mock('../../components/useOffer');
jest.mock('../../../identity-block');
jest.mock('../../components/usePaywall');
jest.mock('../../components/PaywallOffer', () => () => <paywall-offer />);

describe('The OfferPaywall feature', () => {
  it('renders PaywallOfferBody component when isPaywalled is true and isRegwall is false', () => {
    usePaywall.mockReturnValue({
      isPaywalled: true,
      isRegwall: false,
    });
    getProperties.mockReturnValue({
      locale: 'en',
    });
    const wrapper = mount(
      <Paywall
        customFields={{
          campaignCode: 'default',
          linkUrl: '/account/login',
          offerURL: '/offer/',
        }}
      />,
    );

    expect(wrapper.containsMatchingElement(<paywall-offer />)).toEqual(true);
  });

  it('does not render PaywallOfferBody component when isPaywalled is false or if isRegwall is true', () => {
    usePaywall.mockReturnValue({
      isPaywalled: false,
      isRegwall: true,
    });
    getProperties.mockReturnValue({
      locale: 'en',
    });
    const wrapper = mount(
      <Paywall
        customFields={{
          campaignCode: 'default',
          linkUrl: '/account/login',
          offerURL: '/offer/',
        }}
      />,
    );

    expect(wrapper.containsMatchingElement(<paywall-offer />)).toEqual(false);
  });
});
