import React from 'react';
import { mount } from 'enzyme';
import MediumPromo from './default';

const { default: mockData } = require('./mock-data');

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
  useContent: jest.fn(() => (mockData)),
  useEditableContent: jest.fn(() => ({ editableContent: () => ({ contentEditable: 'true' }) })),
}));

const config = {
  itemContentConfig: { contentService: 'ans-item', contentConfiguration: {} },
  showHeadline: true,
  // headlinePosition: 'below',
  showImage: true,
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
    const wrapper = mount(<MediumPromo customFields={config} />);
    expect(wrapper.find('.container-fluid')).toHaveLength(1);
  });

  it('should have two link elements by default', () => {
    const wrapper = mount(<MediumPromo customFields={config} />);
    expect(wrapper.find('a')).toHaveLength(2);
  });

  it('should link the headline to the current site website_url ANS property', () => {
    const url = mockData.websites['the-sun'].website_url;
    const wrapper = mount(<MediumPromo customFields={config} />);
    expect(wrapper.find('a.md-promo-headline')).toHaveProp('href', url);
  });

  it('should link the image to the current site website_url ANS property', () => {
    const url = mockData.websites['the-sun'].website_url;
    const wrapper = mount(<MediumPromo customFields={config} />);
    expect(wrapper.find('a').at(1)).toHaveProp('href', url);
  });

  it('should have one img when show image is true', () => {
    const wrapper = mount(<MediumPromo customFields={config} />);
    expect(wrapper.find('Image')).toHaveLength(1);
  });

  it('should have class .md-promo-image when show image is true', () => {
    const wrapper = mount(<MediumPromo customFields={config} />);
    expect(wrapper.find('.md-promo-image')).toHaveLength(1);
  });

  it('should have no Image when show image is false', () => {
    const noImgConfig = {
      itemContentConfig: { contentService: 'ans-item', contentConfiguration: {} },
      showHeadline: true,
      // headlinePosition: 'below',
      showImage: false,
    };
    const wrapper = mount(<MediumPromo customFields={noImgConfig} />);
    expect(wrapper.find('Image')).toHaveLength(0);
  });

  it('should not have .md-promo-image class when show image is false', () => {
    const noImgConfig = {
      itemContentConfig: { contentService: 'ans-item', contentConfiguration: {} },
      showHeadline: true,
      // headlinePosition: 'below',
      showImage: false,
    };
    const wrapper = mount(<MediumPromo customFields={noImgConfig} />);
    expect(wrapper.find('.md-promo-image')).toHaveLength(0);
  });

  // it('headline div should have class .headline-above when headline position is above', () => {
  //   const headAboveConfig = {
  //     itemContentConfig: { contentService: 'ans-item', contentConfiguration: {} },
  //     showHeadline: true,
  //     headlinePosition: 'above',
  //     showImage: false,
  //   };
  //   const wrapper = mount(<MediumPromo customFields={headAboveConfig} />);
  //   expect(wrapper.find('.headline-above')).toHaveLength(1);
  //   expect(wrapper.find('.headline-below').length).toBe(0);
  // });

  // it('headline div should have class .headline-below when headline position is below', () => {
  //   const headBelowConfig = {
  //     itemContentConfig: { contentService: 'ans-item', contentConfiguration: {} },
  //     showHeadline: true,
  //     headlinePosition: 'below',
  //     showImage: false,
  //   };
  //   const wrapper = mount(<MediumPromo customFields={headBelowConfig} />);
  //   expect(wrapper.find('.headline-below')).toHaveLength(1);
  //   expect(wrapper.find('.headline-above').length).toBe(0);
  // });

  it('should only be one link when showHeadline is false and show image is true', () => {
    const noHeadlineConfig = {
      itemContentConfig: { contentService: 'ans-item', contentConfiguration: {} },
      showHeadline: false,
      showImage: true,
    };
    const wrapper = mount(<MediumPromo customFields={noHeadlineConfig} />);
    expect(wrapper.find('a')).toHaveLength(1);
  });

  it('should have by default an 16:9 image ratio', () => {
    const wrapper = mount(<MediumPromo customFields={config} />);
    const img = wrapper.find('Image');
    expect(img.prop('largeHeight')).toBe(225);
  });

  it('should accept a 16:9 ratio', () => {
    const myConfig = { ...config, imageRatio: '16:9' };
    const wrapper = mount(<MediumPromo customFields={myConfig} />);
    const img = wrapper.find('Image');
    expect(img.prop('largeHeight')).toBe(225);
  });

  it('should accept a 3:2 ratio', () => {
    const myConfig = { ...config, imageRatio: '3:2' };
    const wrapper = mount(<MediumPromo customFields={myConfig} />);
    const img = wrapper.find('Image');
    expect(img.prop('largeHeight')).toBe(267);
  });

  it('should accept a 4:3 ratio', () => {
    const myConfig = { ...config, imageRatio: '4:3' };
    const wrapper = mount(<MediumPromo customFields={myConfig} />);
    const img = wrapper.find('Image');
    expect(img.prop('largeHeight')).toBe(300);
  });
});
