/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useFusionContext } from 'fusion:context';
import { mount } from 'enzyme';
import getProperties from 'fusion:properties';
import ArcAd from './default';

const SITE_PROPS_MOCK = {
  breakpoints: {
    small: 0,
    medium: 768,
    large: 992,
  },
  websiteAdPath: 'news',
};

const AD_PROPS_MOCK = {
  collection: 'features',
  type: 'Common/ArcAd',
  id: '0fPdGkcOqEoaWyN',
  customFields: {
    adType: '300x250',
    displayAdLabel: true,
  },
  displayProperties: {},
  variants: {},
  children: [],
};

describe('<ArcAd>', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getProperties.mockReturnValue(SITE_PROPS_MOCK);
    useFusionContext.mockReturnValue({ isAdmin: false });
  });

  it('renders no ad unit in admin dashboard', () => {
    useFusionContext.mockClear();
    useFusionContext.mockReturnValueOnce({ isAdmin: true });
    const wrapper = mount(<ArcAd {...AD_PROPS_MOCK} />);
    expect(wrapper).toBeDefined();
    const container = wrapper.find('div.arcad_feature');
    expect(container).toHaveLength(1);
    expect(container.find('.arcad')).toBeDefined();
    expect(container.find('.arcad')).toHaveLength(0);
  });

  it('renders ad unit when not in admin dashboard', () => {
    const wrapper = mount(<ArcAd {...AD_PROPS_MOCK} />);
    expect(wrapper).toBeDefined();
    const container = wrapper.find('div.arcad_feature');
    expect(container).toHaveLength(1);
    expect(container.find('.arcad')).toBeDefined();
    expect(container.find('.arcad')).toHaveLength(1);
  });

  it('renders no advertisement label when disabled', () => {
    const adProps = {
      ...AD_PROPS_MOCK,
      customFields: {
        displayAdLabel: false,
      },
    };
    const wrapper = mount(<ArcAd {...adProps} />);
    const container = wrapper.find('StyledComponent.arcad_feature');
    expect(container).toHaveLength(1);
    expect(container.prop('displayAdLabel')).toBe(false);
    expect(container.prop('adLabel')).toEqual('ADVERTISEMENT');
  });

  it('renders advertisement label when enabled', () => {
    const wrapper = mount(<ArcAd {...AD_PROPS_MOCK} />);
    const container = wrapper.find('StyledComponent.arcad_feature');
    expect(container).toHaveLength(1);
    expect(container.prop('displayAdLabel')).toBe(true);
    expect(container.prop('adLabel')).toEqual('ADVERTISEMENT');
  });

  describe('ArcAd - Advertisement Label', () => {
    it('renders no advertisement label when disabled', () => {
      const adProps = {
        ...AD_PROPS_MOCK,
        customFields: {
          displayAdLabel: false,
        },
      };
      const wrapper = mount(<ArcAd {...adProps} />);
      const container = wrapper.find('StyledComponent.arcad_feature');
      expect(container).toHaveLength(1);
      expect(container.prop('displayAdLabel')).toBe(false);
      expect(container.prop('adLabel')).toEqual('ADVERTISEMENT');
    });

    it('renders advertisement label when enabled', () => {
      const wrapper = mount(<ArcAd {...AD_PROPS_MOCK} />);
      const container = wrapper.find('StyledComponent.arcad_feature');
      expect(container).toHaveLength(1);
      expect(container.prop('displayAdLabel')).toBe(true);
      expect(container.prop('adLabel')).toEqual('ADVERTISEMENT');
    });

    it('renders custom advertisement label', () => {
      const customSiteProps = {
        advertisementLabel: "Advertisement / <a href='http://example.com' target='_blank'>Advertisement</a>",
      };
      getProperties.mockReturnValue({ ...SITE_PROPS_MOCK, ...customSiteProps });
      const wrapper = mount(<ArcAd {...AD_PROPS_MOCK} />);
      const container = wrapper.find('StyledComponent.arcad_feature');
      expect(container).toHaveLength(1);
      expect(container.prop('displayAdLabel')).toBe(true);
      expect(container.prop('adLabel')).toEqual(customSiteProps.advertisementLabel);
    });
  });
});
