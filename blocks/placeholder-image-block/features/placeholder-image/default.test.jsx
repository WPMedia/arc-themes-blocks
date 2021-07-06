import React from 'react';
import { useContent } from 'fusion:content';
import { mount } from 'enzyme';
import PlaceholderImage from './default';

jest.mock('fusion:content', () => ({
  useContent: jest.fn(() => {}),
  useFusionContext: jest.fn(() => {}),
}));

jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({
    arcSite: 'the-sun',
    deployment: jest.fn((x) => x),
    contextPath: '/pf',
  })),
}));

jest.mock('fusion:properties', () => (jest.fn(() => ({
  websiteDomain: '',
  fallbackImage: 'resources/placeholder.jpg',
  resizerURL: 'resizer',
}))));

describe('placeholder-block', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing if no resizer image options for placeholder image', () => {
    useContent.mockReturnValueOnce(null);
    const wrapper = mount(<PlaceholderImage />);

    expect(wrapper.html()).toBe(null);
  });

  it('renders Image', () => {
    useContent.mockReturnValueOnce({ abc: 123 });
    const wrapper = mount(<PlaceholderImage />);

    expect(wrapper.find('Image').length).toBe(1);
  });

  it('used client side content source with client prop defined', () => {
    useContent.mockReturnValueOnce({ abc: 123 });
    const wrapper = mount(<PlaceholderImage client />);

    expect(useContent).toBeCalledWith({ query: { raw_image_url: '/pf/resources/placeholder.jpg', respect_aspect_ratio: true }, source: 'resize-image-api-client' });
    expect(wrapper.find('Image').length).toBe(1);
  });
});
