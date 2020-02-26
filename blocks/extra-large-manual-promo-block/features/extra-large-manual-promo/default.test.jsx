import React from 'react';
import { mount } from 'enzyme';
import ExtraLargeManualPromo from './default';


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

describe('the extra large promo feature', () => {
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
    const wrapper = mount(<ExtraLargeManualPromo customFields={config} />);
    expect(wrapper.find('.container-fluid')).toHaveLength(1);
  });

  it('should have three link elements by default', () => {
    const wrapper = mount(<ExtraLargeManualPromo customFields={config} />);
    expect(wrapper.find('a')).toHaveLength(3);
  });

  it('should have one img when show image is true', () => {
    const wrapper = mount(<ExtraLargeManualPromo customFields={config} />);
    expect(wrapper.find('Image')).toHaveLength(1);
  });

  it('should have no Image when show image is false', () => {
    const noImgConfig = {
      itemContentConfig: { contentService: 'ans-item', contentConfiguration: {} },
      showHeadline: true,
      showImage: false,
    };
    const wrapper = mount(<ExtraLargeManualPromo customFields={noImgConfig} />);
    expect(wrapper.find('Image')).toHaveLength(0);
  });
});
