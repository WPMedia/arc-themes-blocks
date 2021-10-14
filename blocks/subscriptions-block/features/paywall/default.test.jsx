import React from 'react';
import { mount } from 'enzyme';
import Paywall from './default';
import usePaywall from '../../components/usePaywall';
import { useIdentity } from '../../../identity-block';
import useOffer from '../../components/useOffer';

jest.mock('../../components/useOffer');
jest.mock('../../../identity-block');
jest.mock('../../components/usePaywall');
jest.mock('../../components/PaywallOfferBody', () => () => <paywall-offer-body />);

useOffer.mockReturnValue({
  offer: {
    pageTitle: 'this the offer title',
    pageSubTitle: 'this the offer subtitle',
  },
  fetchOffer: () => ({
    pageTitle: 'this the offer title',
    pageSubTitle: 'this the offer subtitle',
  }),
});

usePaywall.mockReturnValue({
  isPaywalled: true,
  triggeredRule: {
    e: [
      true,
    ],
    pw: 'allaccess',
    rt: [
      '>',
      1,
    ],
    id: 103,
    budget: {
      id: 95,
      budgetType: 'Calendar',
      calendarType: 'Monthly',
      calendarWeekDay: null,
      rollingType: null,
      rollingDays: null,
      rollingHours: null,
    },
  },
  rules: [
    {
      e: [
        true,
      ],
      pw: 'allaccess',
      rt: [
        '>',
        1,
      ],
      id: 103,
      budget: {
        id: 95,
        budgetType: 'Calendar',
        calendarType: 'Monthly',
        calendarWeekDay: null,
        rollingType: null,
        rollingDays: null,
        rollingHours: null,
      },
    },
    {
      e: [
        true,
        'premium',
      ],
      pw: 'allaccess',
      rt: [
        '>',
        1,
      ],
      id: 104,
      budget: {
        id: 96,
        budgetType: 'Calendar',
        calendarType: 'Monthly',
        calendarWeekDay: null,
        rollingType: null,
        rollingDays: null,
        rollingHours: null,
      },
    },
  ],
});

describe('The OfferPaywall feature', () => {
  it('renders PaywallOfferBody component when isPaywalled is true', () => {
    useIdentity.mockReturnValue({
      isLoggedIn: false,
    });

    const wrapper = mount(
      <Paywall
        customFields={{
          loginURL: '/login',
          offerURL: '/offer',
          campaignCode: 'default',
        }}
      />,
    );

    expect(wrapper.containsMatchingElement(<paywall-offer-body />)).toEqual(true);
  });

  it('does not render PaywallOfferBody component when isPaywalled is false', () => {
    usePaywall.mockReturnValue({
      isPaywalled: false,
    });
    const wrapper = mount(
      <Paywall
        customFields={{
          loginURL: '/login',
          offerURL: '/offer',
          campaignCode: 'default',
        }}
      />,
    );

    expect(wrapper.containsMatchingElement(<paywall-offer-body />)).toEqual(false);
  });
});
