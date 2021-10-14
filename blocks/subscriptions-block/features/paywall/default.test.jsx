import React from 'react';
import { mount } from 'enzyme';
import { act } from '@testing-library/react';
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
    const wrapper = mount(
      <Paywall
        customFields={{
          reasonPrompt: 'Subscribe to continue reading.',
          linkPrompt: 'Already a subscriber?',
          linkText: 'Log In.',
          linkUrl: '/account/login',
          actionText: 'Subscribe',
          offerURL: '/offer/',
          campaignCode: 'default',
        }}
      />,
    );

    act(() => {
      jest.runAllTimers();
      wrapper.setProps({});
    });

    expect(wrapper.containsMatchingElement(<paywall-offer />)).toEqual(true);
  });

  it('does not render PaywallOfferBody component when isPaywalled is false or if isRegwall is true', () => {
    usePaywall.mockReturnValue({
      isPaywalled: false,
      isRegwall: true,
    });
    const wrapper = mount(
      <Paywall
        customFields={{
          reasonPrompt: 'Subscribe to continue reading.',
          linkPrompt: 'Already a subscriber?',
          linkText: 'Log In.',
          linkUrl: '/account/login',
          actionText: 'Subscribe',
          offerURL: '/offer/',
          campaignCode: 'default',
        }}
      />,
    );
    act(() => {
      jest.runAllTimers();
      wrapper.setProps({});
    });

    expect(wrapper.containsMatchingElement(<paywall-offer />)).toEqual(false);
  });
});
