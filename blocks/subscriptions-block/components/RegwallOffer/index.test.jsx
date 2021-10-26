import React from 'react';
import { render } from 'enzyme';
import isUrl from 'is-url';

import { isServerSide } from '@wpmedia/engine-theme-sdk';

import RegwallOffer from '.';

jest.mock('@wpmedia/engine-theme-sdk', () => ({
  __esModule: true,
  isServerSide: jest.fn(() => false),
}));

jest.mock('is-url', () => ({
  __esModule: true,
  default: jest.fn(() => false),
}));

/**
 * Below I pass usePortal to false that will in return
 * pass this down to the Subscription Overlay.
 * This boolean prevents ReactDOM.createPortal from being used.
 * Just checking with isServerSide doesn't work.  Jest and Enzyme
 * still have poor support for ReactDOM.createPortal, so we need a way
 * to conditionally render ReactDOM.createPortal.
 */
describe('The RegwallOffer component ', () => {
  it('returns null if serverSide', () => {
    isServerSide.mockReturnValue(true);
    const wrapper = render(
      <RegwallOffer
        actionText="Subscribe"
        actionUrl="/account/signup"
        campaignCode="defaultish"
        headlineText="Headline"
        linkPrompt="Already a subscriber?"
        linkText="Log In."
        linkUrl="/account/login"
        reasonPrompt="Subscribe to continue reading."
        subheadlineText="Subheadline"
        usePortal={false}
      />,
    );
    expect(wrapper.html()).toBe(null);
    isServerSide.mockReset();
  });

  it('renders with correct markup', () => {
    const wrapper = render(
      <RegwallOffer
        actionText="Subscribe"
        actionUrl="/account/signup"
        headlineText="Headline"
        linkPrompt="Already a subscriber?"
        linkText="Log In."
        linkUrl="/account/login"
        reasonPrompt="Subscribe to continue reading."
        subheadlineText="Subheadline"
        usePortal={false}
      />,
    );
    expect(wrapper.find('.xpmedia-subscription-dialog-reason-prompt').text()).toEqual('Subscribe to continue reading.');
    expect(wrapper.find('.xpmedia-subscription-dialog-link-prompt-pre-link').text()).toEqual('Already a subscriber?');
    expect(wrapper.find('.xpmedia-subscription-dialog-link-prompt-link').text()).toEqual('Log In.');
    expect(wrapper.find('.xpmedia-subscription-dialog-link-prompt-link').prop('href')).toEqual('/account/login');
    expect(wrapper.find('.xpmedia-subscription-dialog-headline').text()).toEqual('Headline');
    expect(wrapper.find('.xpmedia-subscription-dialog-subheadline').text()).toEqual('Subheadline');
    expect(wrapper.find('.xpmedia-button').text()).toEqual('Subscribe');
    expect(wrapper.find('.xpmedia-button').prop('href')).toEqual('/account/signup?_cid=default');
  });

  it('renders with default campaignCode', () => {
    const wrapper = render(
      <RegwallOffer
        actionText="Subscribe"
        actionUrl="/account/signup"
        usePortal={false}
      />,
    );
    expect(wrapper.find('.xpmedia-button').text()).toEqual('Subscribe');
    expect(wrapper.find('.xpmedia-button').prop('href')).toEqual('/account/signup?_cid=default');
  });

  it('renders campaignCode if its provided', () => {
    isUrl.mockReturnValue(true);
    const wrapper = render(
      <RegwallOffer
        actionText="Subscribe"
        actionUrl="/account/signup"
        campaignCode="./"
        usePortal={false}
      />,
    );
    expect(wrapper.find('.xpmedia-button').text()).toEqual('Subscribe');
    expect(wrapper.find('.xpmedia-button').prop('href')).toEqual('/account/signup?_cid=./');
    isUrl.mockReset();
  });
});
