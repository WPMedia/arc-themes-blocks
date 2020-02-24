import React from 'react';
import { mount } from 'enzyme';
import MediumManualPromo from './default';

jest.mock('@arc-test-org/engine-theme-sdk', () => ({
  Image: () => <div />,
}));
jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({})),
}));

const config = {
  showHeadline: true,
  showImage: true,
  showDescription: true,
  headline: 'This is the headline',
  description: 'This is the description',
  imageURL: 'www.google.com/fake.png',
  linkURL: 'www.google.com',
};

describe('the medium promo feature', () => {
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
    const wrapper = mount(<MediumManualPromo customFields={config} />);
    expect(wrapper.find('.container-fluid')).toHaveLength(1);
  });

  it('should have two link elements by default', () => {
    const wrapper = mount(<MediumManualPromo customFields={config} />);
    expect(wrapper.find('a')).toHaveLength(2);
  });

  it('should have one img when show image is true', () => {
    const wrapper = mount(<MediumManualPromo customFields={config} />);
    expect(wrapper.find('Image')).toHaveLength(1);
  });

  it('Headline div should have class .col-sm-xl-8 when show image is true', () => {
    const wrapper = mount(<MediumManualPromo customFields={config} />);
    expect(wrapper.find('.col-md-xl-8')).toHaveLength(1);
  });

  it('should have no Image when show image is false', () => {
    const noImgConfig = {
      showHeadline: true,
      showImage: false,
      showDescription: true,
      headline: 'This is the headline',
      description: 'This is the description',
      imageURL: 'www.google.com/fake.png',
      linkURL: 'www.google.com',
    };
    const wrapper = mount(<MediumManualPromo customFields={noImgConfig} />);
    expect(wrapper.find('Image')).toHaveLength(0);
  });

  it('headline div should have class .col-sm-xl-12 when show image is false', () => {
    const noImgConfig = {
      showHeadline: true,
      showImage: false,
      showDescription: true,
      headline: 'This is the headline',
      description: 'This is the description',
      imageURL: 'www.google.com/fake.png',
      linkURL: 'www.google.com',
    };
    const wrapper = mount(<MediumManualPromo customFields={noImgConfig} />);
    expect(wrapper.find('.col-sm-xl-12')).toHaveLength(1);
  });

  it('should only be one link when showHeadline is false and show image is true', () => {
    const noHeadlineConfig = {
      showHeadline: false,
      showImage: true,
      showDescription: true,
      headline: 'This is the headline',
      description: 'This is the description',
      imageURL: 'www.google.com/fake.png',
      linkURL: 'www.google.com',
    };
    const wrapper = mount(<MediumManualPromo customFields={noHeadlineConfig} />);
    expect(wrapper.find('a')).toHaveLength(1);
  });
});
