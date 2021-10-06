import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import useOffer from './Offer';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({
    arcSite: 'arc-demo-3',
  })),
}));

jest.mock('fusion:properties', () => (jest.fn(() => ({
  api: {
    retail: {
      origin: 'https://corecomponents-arc-demo-3-prod.api.cdn.arcpublishing.com',
    },
  },
}))));

const testOfferResponse = {
  name: 'Premium Offer',
  disclaimerText: null,
  largeImage: null,
  mediumImage: null,
  smallImage: null,
  pageSubTitle: '<p>Free trial: <strong>first month free</strong>, then $10/mo</p>',
  pageTitle: '<p>Default subscription</p>',
  templateName: 'bottom-drawer',
  campaigns: [{
    canRenew: true, canRestart: true, canStart: true, name: 'augpromo', validFrom: 1629216600000, validUntil: 1630468800000,
  }],
  products: [{
    sku: 'premium',
    description: '<p>Get access to premium content</p>',
    image: null,
    imageAction: null,
    name: 'Premium Content',
    thumbnail: null,
    maxSubscriptionAssociations: 0,
    attributes: [{ name: 'p', value: '<p>get access to sports, business, cooking sections</p>' }],
    pricingStrategies: [{
      pricingStrategyId: 1169,
      priceCode: '1B1HCQ',
      name: 'Premium free trial',
      description: '<p>free trial price</p>',
      gift: false,
      summary: null,
      currencyCode: 'USD',
      currencyDisplayFormat: 'symbol',
      currencyLocale: 'en-US',
      rates: [{
        amount: '0.00', billingCount: 1, billingFrequency: 'Month', durationCount: 1, duration: 'Month',
      }, {
        amount: '10.00', billingCount: 1, billingFrequency: 'Month', durationCount: 1, duration: 'UntilCancelled',
      }],
      taxInclusive: false,
    }, {
      pricingStrategyId: 1168,
      priceCode: 'H7SCJB',
      name: 'premium all access',
      description: '<p>Get access to premium content for a low rate</p>',
      gift: false,
      summary: null,
      currencyCode: 'USD',
      currencyDisplayFormat: 'symbol',
      currencyLocale: 'en-US',
      rates: [{
        amount: '10.00', billingCount: 1, billingFrequency: 'Month', durationCount: 1, duration: 'UntilCancelled',
      }],
      taxInclusive: false,
    }],
    defaultSwgProduct: false,
  }],
  attributes: [],
  default: true,
};

function TestOfferComponent({ code }) {
  const { offer, isFetching, error } = useOffer({
    campaignCode: code,
  });
  if (error) {
    return (
      <div>
        Error:
        {' '}
        {error}
      </div>
    );
  }
  if (isFetching || !offer) {
    return <div>Fetching</div>;
  }
  return (
    <div dangerouslySetInnerHTML={{ __html: offer.pageTitle }} />
  );
}

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(testOfferResponse),
}));

let container = null;
beforeEach(() => {
  fetch.mockClear();
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('useOffer hook runs correctly', async () => {
  act(() => {
    render(<TestOfferComponent code={{
      campaignCode: 'default',
    }}
    />, container);
  });
  expect(container.textContent).toBe('Fetching');
  await act(() => sleep(500));
  expect(container.textContent).toBe('Default subscription');
});
