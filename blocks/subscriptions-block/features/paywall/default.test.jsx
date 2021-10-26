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
          adminViewState: 'hide',
          displayMode: '',
          campaignCode: 'default',
          linkText: 'Log In.',
          linkUrl: '/account/login',
          payActionText: 'Subscribe',
          payActionUrl: '/offer/',
          payReasonPrompt: 'Pay Reason',
          registerActionText: '/Register/Action',
          registerActionUrl: '/Register/Action',
          registerHeaderText: 'Register Now',
          registerSubHeaderText: 'to gain access',
          registerReasonPrompt: 'Register Reason',
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
          adminViewState: 'hide',
          displayMode: '',
          campaignCode: 'default',
          linkText: 'Log In.',
          linkUrl: '/account/login',
          payActionText: 'Subscribe',
          payActionUrl: '/offer/',
          payReasonPrompt: 'Pay Reason',
          registerActionText: '/Register/Action',
          registerActionUrl: '/Register/Action',
          registerHeaderText: 'Register Now',
          registerSubHeaderText: 'to gain access',
          registerReasonPrompt: 'Register Reason',
        }}
      />,
    );

    expect(wrapper.containsMatchingElement(<paywall-offer />)).toEqual(false);
  });
});
