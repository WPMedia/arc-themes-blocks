import React from 'react';
import { mount } from 'enzyme';
import SmallManualPromo from './default';

jest.mock('@wpmedia/engine-theme-sdk', () => ({
  Image: ({ url }) => <img src={url} alt="fake test image" />,
  LazyLoad: ({ children }) => <>{ children }</>,
  isServerSide: () => true,
}));
jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({})),
  useComponentContext: jest.fn(() => ({
    registerSuccessEvent: () => ({}),
  })),
}));
jest.mock('fusion:content', () => ({
  useContent: jest.fn(() => ({})),
  useEditableContent: jest.fn(() => ({
    searchableField: () => {},
  })),
}));

const config = {
  showHeadline: true,
  showImage: true,
  headline: 'This is the headline',
  imageURL: 'www.google.com/fake.png',
  linkURL: 'www.google.com',
};

describe('the small promo feature', () => {
  afterEach(() => {
    jest.resetModules();
  });

  beforeEach(() => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        id: 'testId',
      })),
    }));
  });

  it('should have 1 container fluid class', () => {
    const wrapper = mount(<SmallManualPromo customFields={config} />);
    expect(wrapper.find('.container-fluid')).toHaveLength(1);
  });

  it('should have one img when show image is true', () => {
    const wrapper = mount(<SmallManualPromo customFields={config} />);
    expect(wrapper.find('Image')).toHaveLength(1);
  });

  it('Headline div should have class .col-sm-xl-8 when show image is true', () => {
    const wrapper = mount(<SmallManualPromo customFields={config} />);
    expect(wrapper.find('.col-sm-xl-8')).toHaveLength(1);
  });

  it('should have no Image when show image is false', () => {
    const noImgConfig = {
      showHeadline: true,
      showImage: false,
      headline: 'This is the headline',
      imageURL: 'www.google.com/fake.png',
      linkURL: 'www.google.com',
    };
    const wrapper = mount(<SmallManualPromo customFields={noImgConfig} />);
    expect(wrapper.find('Image')).toHaveLength(0);
  });

  it('headline div should have class .col-sm-xl-12 when show image is false', () => {
    const noImgConfig = {
      showHeadline: true,
      showImage: false,
      headline: 'This is the headline',
      imageURL: 'www.google.com/fake.png',
      linkURL: 'www.google.com',
    };
    const wrapper = mount(<SmallManualPromo customFields={noImgConfig} />);
    expect(wrapper.find('.col-sm-xl-12')).toHaveLength(1);
  });

  it('should only be one link when showHeadline is false and show image is true', () => {
    const noHeadlineConfig = {
      showHeadline: false,
      showImage: true,
      headline: 'This is the headline',
      imageURL: 'www.google.com/fake.png',
      linkURL: 'www.google.com',
    };
    const wrapper = mount(<SmallManualPromo customFields={noHeadlineConfig} />);
    expect(wrapper.find('a')).toHaveLength(1);
  });

  it('should have one line separator', () => {
    const wrapper = mount(<SmallManualPromo customFields={config} />);
    expect(wrapper.find('hr')).toHaveLength(1);
  });

  it('should render even without a link url', () => {
    const imageURL = 'www.google.com/fake.png';
    const noLinkURLConfig = {
      showImage: true,
      imageURL,
    };

    const wrapper = mount(<SmallManualPromo customFields={noLinkURLConfig} />);
    // testing for whether that import is shallow component
    expect(wrapper.find('Image')).toHaveLength(1);

    // testing whether the image url was indeed passed down
    expect(wrapper.find('img').prop('src')).toEqual(imageURL);
  });
});
