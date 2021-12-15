import React from 'react';
import { mount } from 'enzyme';

import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';

import Paywall from './default';
import usePaywall from '../../components/usePaywall';

jest.mock('../../components/useOffer');
jest.mock('../../components/usePaywall');
jest.mock('../../components/PaywallOffer', () => () => <paywall-offer />);
jest.mock('../../components/RegwallOffer', () => () => <regwall-offer />);

jest.mock('fusion:context', () => ({
  __esModule: true,
  useFusionContext: jest.fn(() => ({
    isAdmin: false,
  })),
}));

describe('The Paywall feature', () => {
  it('renders Paywall when isPaywalled is true and isRegisterwalled is false', () => {
    usePaywall.mockReturnValue({
      isPaywalled: true,
      isRegisterwalled: false,
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

  it('renders Regwall when isRegisterwalled is true', () => {
    usePaywall.mockReturnValue({
      isPaywalled: true,
      isRegisterwalled: true,
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

    expect(wrapper.containsMatchingElement(<regwall-offer />)).toEqual(true);
  });

  it('renders Regwall component when isAdmin and adminViewState is showRegwall', () => {
    useFusionContext.mockReturnValue({
      isAdmin: true,
    });
    getProperties.mockReturnValue({
      locale: 'en',
    });
    const wrapper = mount(
      <Paywall
        customFields={{
          adminViewState: 'showRegwall',
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

    expect(wrapper.containsMatchingElement(<regwall-offer />)).toEqual(true);
  });

  it('renders Paywall component when isAdmin and adminViewState is showPaywall', () => {
    useFusionContext.mockReturnValue({
      isAdmin: true,
    });
    getProperties.mockReturnValue({
      locale: 'en',
    });
    const wrapper = mount(
      <Paywall
        customFields={{
          adminViewState: 'showPaywall',
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
});
