/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { useFusionContext, useAppContext } from 'fusion:context';
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
    useAppContext.mockReturnValue({});
  });

  it('renders no ad unit in admin dashboard', () => {
    useFusionContext.mockClear();
    useFusionContext.mockReturnValueOnce({ isAdmin: true });
    const wrapper = mount(<ArcAd {...AD_PROPS_MOCK} />);
    expect(wrapper).toBeDefined();
    const container = wrapper.find('.arcad_feature');
    expect(container).toHaveLength(1);
    expect(container.find('.arcad')).toBeDefined();
    expect(container.find('.arcad')).toHaveLength(0);
  });

  it('renders ad unit when not in admin dashboard', () => {
    const wrapper = mount(<ArcAd {...AD_PROPS_MOCK} />);
    expect(wrapper).toBeDefined();
    const container = wrapper.find('.arcad_feature');
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
    const wrapper = shallow(<ArcAd {...adProps} />);
    expect(wrapper.find('div.advertisement-label')).toHaveLength(0);
  });

  it('renders advertisement label when enabled', () => {
    const wrapper = shallow(<ArcAd {...AD_PROPS_MOCK} />);
    expect(wrapper.find('div.advertisement-label')).toHaveLength(1);
  });

  it('renders the label with text ADVERTISEMENT when advertisementLabel property is missing', () => {
    const wrapper = shallow(<ArcAd {...AD_PROPS_MOCK} />);
    /* eslint-disable-next-line no-underscore-dangle */
    expect(wrapper.find('div.advertisement-label').prop('dangerouslySetInnerHTML').__html).toEqual('ADVERTISEMENT');
  });

  it('should use "all" on wrapper for advertisement label', () => {
    const wrapper = shallow(<ArcAd {...AD_PROPS_MOCK} />);
    expect(wrapper.find('div.advertisement-label--all')).toHaveLength(1);
  });

  it('should use "desktop" on wrapper for advertisement right_rail_cube', () => {
    const mockData = { ...AD_PROPS_MOCK };
    mockData.customFields.adType = '300x250|300x600_rightrail';
    const wrapper = shallow(<ArcAd {...mockData} />);
    expect(wrapper.find('div.advertisement-label--desktop')).toHaveLength(1);
  });
});

describe('ArcAd with custom advertisement label', () => {
  const customLabel = {
    advertisementLabel: "Advertisement / <a href='http://example.com' target='_blank'>Advertisement</a>",
  };
  beforeEach(() => {
    jest.clearAllMocks();
    getProperties.mockReturnValue({ ...SITE_PROPS_MOCK, ...customLabel });
    useFusionContext.mockReturnValue({ isAdmin: false });
    useAppContext.mockReturnValue({});
  });

  it('renders the label using advertisementLabel property when present', () => {
    const wrapper = shallow(<ArcAd {...AD_PROPS_MOCK} />);
    expect(
      /* eslint-disable-next-line no-underscore-dangle */
      wrapper.find('div.advertisement-label').prop('dangerouslySetInnerHTML').__html,
    ).toEqual(customLabel.advertisementLabel);
  });
});
