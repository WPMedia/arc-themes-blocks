import React from 'react';
import { mount } from 'enzyme';
import LargePromo from './default';

jest.mock('@wpmedia/engine-theme-sdk', () => ({
  LazyLoad: ({ children }) => <>{ children }</>,
  isServerSide: () => true,
}));

jest.mock('fusion:content', () => ({
  useContent: jest.fn(() => {}),
  useEditableContent: jest.fn(() => ({
    searchableField: () => {},
  })),
}));

describe('the large promo feature', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('should return null if lazyLoad on the server and not in the admin', () => {
    const updatedConfig = {
      lazyLoad: true,
    };
    const wrapper = mount(<LargePromo customFields={updatedConfig} />);
    expect(wrapper.html()).toBe(null);
  });

  it('should have 1 container fluid class', () => {
    const wrapper = mount(<LargePromo customFields={{}} />);
    expect(wrapper.find('.container-fluid')).toHaveLength(1);
    wrapper.unmount();
  });
});
