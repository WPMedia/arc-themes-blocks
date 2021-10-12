import React from 'react';
import BlockBodyScroll from '../blockBodyScroll';
import './styles.scss';

const PaywallOfferBody = ({
  loginURL,
  offerURL = '/offer/',
  campaignCode,
  selectedOffer,
  payWallCode,
  isPwUrl,
}) => (
  <BlockBodyScroll>
    <div className="xpmedia-paywall">
      <div className="xpmedia-paywall-container">
        {loginURL ? (
          <p className="xpmedia-paywall--header">
            Register to continue reading.
            <br />
            Already registered?
            {' '}
            <a href={loginURL} title="Log in">Log In</a>
          </p>
        ) : null}

        {selectedOffer.pageTitle
          ? (
            <p
              className="xpmedia-paywall--title"
              dangerouslySetInnerHTML={{ __html: selectedOffer.pageTitle }}
            />
          ) : 'Subscribe to continue reading'}
        {selectedOffer.pageSubTitle ? (
          <p
            className="xpmedia-paywall--subtitle"
            dangerouslySetInnerHTML={{ __html: selectedOffer.pageSubTitle }}
          />
        ) : null}
        <a
          href={isPwUrl ? payWallCode : `${offerURL}?_cid=${campaignCode}`}
          className="xpmedia-paywall--button"
        >
          Sign Up
        </a>
      </div>
    </div>
  </BlockBodyScroll>
);

PaywallOfferBody.label = 'Paywall Offer Body - Arc Block';

export default PaywallOfferBody;
