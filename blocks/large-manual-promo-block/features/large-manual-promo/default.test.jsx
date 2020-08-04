import React from 'react';
import { mount } from 'enzyme';
import LargeManualPromo from './default';

jest.mock('@wpmedia/engine-theme-sdk', () => ({
  Image: () => <div />,
}));
jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({})),
}));

jest.mock('fusion:content', () => ({
  useContent: jest.fn(() => ({})),
}));

const config = {
  showOverline: true,
  showHeadline: true,
  showImage: true,
  showDescription: true,
  headline: 'This is the headline',
  description: 'This is the description',
  overline: 'overline',
  overlineURL: 'www.google.com',
  imageURL: 'www.google.com/fake.png',
  linkURL: 'www.google.com',
};

describe('the large promo feature', () => {
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
    const wrapper = mount(<LargeManualPromo customFields={config} />);
    expect(wrapper.find('.container-fluid')).toHaveLength(1);
  });

  it('should have three link elements by default', () => {
    const wrapper = mount(<LargeManualPromo customFields={config} />);
    expect(wrapper.find('a')).toHaveLength(3);
  });

  it('should have one img when show image is true', () => {
    const wrapper = mount(<LargeManualPromo customFields={config} />);
    expect(wrapper.find('Image')).toHaveLength(1);
  });

  it('Headline div should have class .col-md-xl-6 when show image is true', () => {
    const wrapper = mount(<LargeManualPromo customFields={config} />);
    expect(wrapper.find('.col-md-xl-6')).toHaveLength(2);
  });

  it('should have no Image when show image is false', () => {
    const noImgConfig = {
      showOverline: true,
      showHeadline: true,
      showImage: false,
      showDescription: true,
      headline: 'This is the headline',
      description: 'This is the description',
      overline: 'overline',
      overlineURL: 'www.google.com',
      imageURL: 'www.google.com/fake.png',
      linkURL: 'www.google.com',
    };
    const wrapper = mount(<LargeManualPromo customFields={noImgConfig} />);
    expect(wrapper.find('Image')).toHaveLength(0);
  });

  it('headline div should have class .col-sm-xl-12 when show image is false', () => {
    const noImgConfig = {
      showOverline: true,
      showHeadline: true,
      showImage: false,
      showDescription: true,
      headline: 'This is the headline',
      description: 'This is the description',
      overline: 'overline',
      overlineURL: 'www.google.com',
      imageURL: 'www.google.com/fake.png',
      linkURL: 'www.google.com',
    };
    const wrapper = mount(<LargeManualPromo customFields={noImgConfig} />);
    expect(wrapper.find('.col-sm-xl-12')).toHaveLength(1);
  });

  it('should only be one link when showOverline and showHeadline is false and show image is true', () => {
    const noHeadlineConfig = {
      showOverline: false,
      showHeadline: false,
      showImage: true,
      showDescription: true,
      headline: 'This is the headline',
      description: 'This is the description',
      overline: 'overline',
      overlineURL: 'www.google.com',
      imageURL: 'www.google.com/fake.png',
      linkURL: 'www.google.com',
    };
    const wrapper = mount(<LargeManualPromo customFields={noHeadlineConfig} />);
    expect(wrapper.find('a')).toHaveLength(1);
  });

  it('should have one line separator', () => {
    const wrapper = mount(<LargeManualPromo customFields={config} />);
    expect(wrapper.find('LargeManualPromo > hr')).toHaveLength(1);
  });
});
