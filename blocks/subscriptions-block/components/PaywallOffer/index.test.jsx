import React from 'react';
import { render } from 'enzyme';
import PaywallOffer from './index';
import usePaywall from '../usePaywall';
import useOffer from '../useOffer';

jest.mock('../../components/useOffer');
jest.mock('../../../identity-block');
jest.mock('../../components/usePaywall');

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
  isRegwalled: false,
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

/**
 * Need to mock this otherwise Jest sends out annoying warning:
 * Warning: useLayoutEffect does nothing on the server,
 * because its effect cannot be encoded into the server renderer's output format.
 */
// jest.mock('../blockBodyScroll', () => ({ children }) => (
//   <>
//     { children }
//   </>
// ));

describe('The PaywallOffer component ', () => {
  it('renders with correct markup', () => {
    const wrapper = render(
      <PaywallOffer
        reasonPrompt="Subscribe to continue reading."
        linkPrompt="Already a subscriber?"
        linkText="Log In."
        linkUrl="/account/login"
        actionText="Subscribe"
        offerURL="/offer/"
        campaignCode="default"
      />,
    );
    expect(wrapper.html()).toBe('<div class="xpmedia-subscription-overlay-content"><div class="sc-kEYyzF ftIOvi xpmedia-subscription-dialog"><div class="xpmedia-subscription-dialog-reason-prompt">Subscribe to continue reading.</div><div class="xpmedia-subscription-dialog-link-prompt"><span class="xpmedia-subscription-dialog-link-prompt-pre-link">Already a subscriber?</span><a class="xpmedia-subscription-dialog-link-prompt-link" href="/account/login">Log In.</a></div><h2 class="xpmedia-subscription-dialog-headline">this the offer title</h2><h3 class="xpmedia-subscription-dialog-subheadline">this the offer subtitle</h3><a class="sc-hMqMXs gxyfPb xpmedia-button xpmedia-button--large" href="/offer/?_cid=default">Subscribe</a></div></div>');
  });
});
