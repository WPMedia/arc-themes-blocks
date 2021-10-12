import React from 'react';
import { render } from 'enzyme';
import PaywallOfferBody from './index';

/**
 * Need to mock this otherwise Jest sends out annoying warning:
 * Warning: useLayoutEffect does nothing on the server,
 * because its effect cannot be encoded into the server renderer's output format.
 */
jest.mock('../blockBodyScroll', () => ({ children }) => (
  <>
    { children }
  </>
));

describe('The PaywallOfferBody ', () => {
  it('renders with correct markup, title, subtitle and link props.', () => {
    const wrapper = render(
      <PaywallOfferBody
        offerURL="/offer/"
        loginURL="/login/"
        campaignCode="allaccess"
        selectedOffer={{
          pageTitle: 'Subscribe to any of our sections',
          pageSubTitle: 'Get access today',
        }}
        payWallCode="default"
        isPwUrl={false}
      />,
    );
    expect(wrapper.html()).toBe('<div class="xpmedia-paywall-container"><p class="xpmedia-paywall--header">Register to continue reading.<br>Already registered? <a href="/login/" title="Log in">Log In</a></p><p class="xpmedia-paywall--title">Subscribe to any of our sections</p><p class="xpmedia-paywall--subtitle">Get access today</p><a href="/offer/?_cid=allaccess" class="xpmedia-paywall--button">Sign Up</a></div>');
  });
});
