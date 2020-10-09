import React from 'react';
import { mount, shallow } from 'enzyme';
import { useFusionContext } from 'fusion:context';
import ArcAd from './default';

const defaultProps = {
  collection: 'features',
  type: 'Common/ArcAd',
  id: '0fPdGkcOqEoaWyN',
  customFields: {
    adType: '300x250',
    display: 'all',
    displayAdvertisementLabel: true,
  },
  displayProperties: {},
  variants: {},
  children: [],
};

describe('<ArcAd>', () => {
  beforeEach(() => {
    useFusionContext.mockClear();
  });

  it('renders no ad unit in admin dashboard', () => {
    useFusionContext.mockReturnValueOnce({ isAdmin: true });
    const wrapper = mount(<ArcAd { ...defaultProps } />);
    expect(wrapper).toBeDefined();
    const container = wrapper.find('.arcad_feature');
    expect(container).toHaveLength(1);
    expect(container.find('.arcad')).toBeDefined();
    expect(container.find('.arcad')).toHaveLength(0);
  });

  it('renders ad unit when not in admin dashboard', () => {
    useFusionContext.mockReturnValueOnce({ isAdmin: false });
    const wrapper = mount(<ArcAd { ...defaultProps } />);
    expect(wrapper).toBeDefined();
    const container = wrapper.find('.arcad_feature');
    expect(container).toHaveLength(1);
    expect(container.find('.arcad')).toBeDefined();
    expect(container.find('.arcad')).toHaveLength(1);
  });

  it('renders advertisement label', () => {
    const wrapper = shallow(<ArcAd {...defaultProps} />);
    expect(wrapper.find('div.advertisement-label')).toHaveLength(1);
  });
});
