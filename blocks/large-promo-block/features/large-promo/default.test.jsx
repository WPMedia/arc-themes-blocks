import React from 'react';
import { mount } from 'enzyme';
import LargePromo from './default';
import { useContent } from 'fusion:content';

jest.mock('fusion:themes', () => (jest.fn(() => ({}))));

jest.mock('fusion:properties', () => (jest.fn(() => ({
  fallbackImage: 'placeholder.jpg',
}))));

const config = {
  itemContentConfig: { contentService: 'ans-item', contentConfiguration: {} },
  showHeadline: true,
  showImage: true,
  showOverline: false,
};

jest.mock('fusion:content', () => ({
  useContent: jest.fn(() => {}),
  useEditableContent: jest.fn(() => ({
    editableContent: () => ({ contentEditable: 'true' }),
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
      ...config,
      lazyLoad: true,
    };
    const wrapper = mount(<LargePromo {...updatedConfig} />);
    expect(wrapper.html()).toBe(null);
  });
});
