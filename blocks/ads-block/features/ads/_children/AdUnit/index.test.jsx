import React from 'react';
import { mount } from 'enzyme';
import AdUnit from './index';
import ArcAdsInstance from '../ArcAdsInstance';
import { setPageTargeting } from '../../ad-helper';

jest.mock('../../ad-helper');

const mockInitArcAds = jest.fn();
const mockRegisterAd = jest.fn();
ArcAdsInstance.getInstance = jest.fn((properties, callback) => {
  ArcAdsInstance.instance = {
    initArcAds: mockInitArcAds,
    registerAd: mockRegisterAd,
  };
  callback();
  return ArcAdsInstance.instance;
});

const AD_CONFIG_MOCK = {
  id: 'arcad_f0f67h9JgRhzvj-169abcbe2da0a5',
  slotName: 'news/homepage',
  adType: 'leaderboard_large',
  adClass: '728x90',
  dimensions: [[[970, 250], [970, 90], [728, 90]], [728, 90], [320, 50]],
  sizemap: {
    breakpoints: [[992, 0], [768, 0], [0, 0]],
    refresh: true,
  },
  display: 'all',
  targeting: {
    ad_type: 'leaderboard_large',
  },
};

const FEATURE_CONFIG_MOCK = {
  arcSite: 'the-sun',
  contextPath: '/pf',
  globalContent: {},
  globalContentConfig: {},
  isAdmin: false,
  outputType: 'default',
  siteProperties: {
    websiteDomain: 'https://www.the-sun.com',
    websiteName: 'The Sun',
    websiteAdPath: 'news',
    dfpId: 701,
  },
  type: '@wpmedia/ads-block/ads',
  id: 'f0f67h9JgRhzvj',
  customFields: {
    adType: '970x250|970x90|728x90|320x50',
    displayAdLabel: true,
    lazyLoad: true,
  },
  metaValue: jest.fn((key = '') => (
    (key === 'page-type' && 'test-page-type')
    || (key === 'ad-path' && 'homepage') || ''
  )),
};

describe('<AdUnit/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders and registers ad unit on published page', () => {
    const wrapper = mount(
      <AdUnit
        adConfig={AD_CONFIG_MOCK}
        featureConfig={FEATURE_CONFIG_MOCK}
      />,
    );
    expect(wrapper).toBeDefined();
    const adUnitEl = wrapper.find('.arcad');
    expect(adUnitEl).toHaveLength(1);
    expect(adUnitEl.hasClass(`ad-${AD_CONFIG_MOCK.adClass}`)).toBe(true);

    expect(ArcAdsInstance.getInstance).toHaveBeenCalledTimes(1);
    expect(setPageTargeting).toBeCalledWith(
      expect.objectContaining(FEATURE_CONFIG_MOCK),
    );

    expect(mockRegisterAd).toHaveBeenCalledTimes(1);
    expect(mockRegisterAd).toBeCalledWith(
      expect.objectContaining({
        params: AD_CONFIG_MOCK,
        publisherIds: { dfp_publisher_id: FEATURE_CONFIG_MOCK.siteProperties.dfpId },
      }),
    );
  });

  it('does not register ad unit in PageBuilder Admin', () => {
    const wrapper = mount(
      <AdUnit
        adConfig={AD_CONFIG_MOCK}
        featureConfig={{
          ...FEATURE_CONFIG_MOCK,
          isAdmin: true,
        }}
      />,
    );
    expect(wrapper).toBeDefined();
    const adUnitEl = wrapper.find('.arcad');
    expect(adUnitEl).toHaveLength(0);
    expect(ArcAdsInstance.getInstance).toHaveBeenCalledTimes(0);
    expect(mockRegisterAd).toHaveBeenCalledTimes(0);
  });
});
