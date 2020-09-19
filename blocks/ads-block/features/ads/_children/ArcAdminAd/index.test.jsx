import React from 'react';
import { mount } from 'enzyme';
import { useFusionContext } from 'fusion:context';
import ArcAdminAd from './index';

const defaults = {
  props: {
    adClass: 'test-ad-class',
    adName: 'test-ad-name',
    slotName: 'test-slot-name',
    dimensions: [[1, 1], [1, 1], [1, 1]],
  },
};

describe('<ArcAdminAd>', () => {
  beforeEach(() => {
    useFusionContext.mockClear();
  });

  it('renders in admin', () => {
    useFusionContext.mockReturnValueOnce({ isAdmin: true });
    const wrapper = mount(<ArcAdminAd { ...defaults.props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('.pb-ad-admin')).toHaveLength(1);
  });

  it('renders nothing when outside admin', () => {
    useFusionContext.mockReturnValueOnce({ isAdmin: false });
    const wrapper = mount(<ArcAdminAd { ...defaults.props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('.pb-ad-admin')).toHaveLength(0);
  });
});
