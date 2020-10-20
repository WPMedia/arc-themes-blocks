import React from 'react';
import { mount } from 'enzyme';
import { useContent } from 'fusion:content';
import SmallPromo from './default';

const { default: mockData } = require('./mock-data');

jest.mock('@wpmedia/engine-theme-sdk', () => ({
  Image: () => <div />,
}));
jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
jest.mock('fusion:properties', () => (jest.fn(() => ({
  fallbackImage: 'placeholder.jpg',
}))));
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
  headlinePosition: 'below',
  showImage: true,
};

describe('the small promo feature', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
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
    const wrapper = mount(<SmallPromo customFields={config} />);
    expect(wrapper.find('.container-fluid')).toHaveLength(1);
  });

  it('should have two link elements by default', () => {
    const wrapper = mount(<SmallPromo customFields={config} />);
    expect(wrapper.find('a')).toHaveLength(2);
  });

  // it('should link the headline to the current site website_url ANS property', () => {
  //   const url = mockData.websites['the-sun'].website_url;
  //   const wrapper = mount(<SmallPromo customFields={config} />);
  //   expect(wrapper.find('a.sm-promo-headline')).toHaveProp('href', url);
  // });

  it('should link the image to the current site website_url ANS property', () => {
    const url = mockData.websites['the-sun'].website_url;
    const wrapper = mount(<SmallPromo customFields={config} />);
    expect(wrapper.find('a').at(1)).toHaveProp('href', url);
  });

  it('should have one img when show image is true', () => {
    const wrapper = mount(<SmallPromo customFields={config} />);
    expect(wrapper.find('Image')).toHaveLength(1);
  });

  it('Headline div should have class .col-sm-xl-8 when show image is true', () => {
    const wrapper = mount(<SmallPromo customFields={config} />);
    expect(wrapper.find('.col-sm-xl-8')).toHaveLength(1);
  });

  it('should have no Image when show image is false', () => {
    const noImgConfig = {
      itemContentConfig: { contentService: 'ans-item', contentConfiguration: {} },
      showHeadline: true,
      headlinePosition: 'below',
      showImage: false,
    };
    const wrapper = mount(<SmallPromo customFields={noImgConfig} />);
    expect(wrapper.find('Image')).toHaveLength(0);
  });

  it('headline div should have class .col-sm-xl-12 when show image is false', () => {
    const noImgConfig = {
      itemContentConfig: { contentService: 'ans-item', contentConfiguration: {} },
      showHeadline: true,
      headlinePosition: 'below',
      showImage: false,
    };
    const wrapper = mount(<SmallPromo customFields={noImgConfig} />);
    expect(wrapper.find('.col-sm-xl-12')).toHaveLength(1);
  });

  it('headline div should have class .headline-above when headline position is above', () => {
    const headAboveConfig = {
      itemContentConfig: { contentService: 'ans-item', contentConfiguration: {} },
      showHeadline: true,
      headlinePosition: 'above',
      showImage: false,
    };
    const wrapper = mount(<SmallPromo customFields={headAboveConfig} />);
    expect(wrapper.find('.headline-above')).toHaveLength(1);
    expect(wrapper.find('.headline-below').length).toBe(0);
  });

  it('headline div should have class .headline-below when headline position is below', () => {
    const headBelowConfig = {
      itemContentConfig: { contentService: 'ans-item', contentConfiguration: {} },
      showHeadline: true,
      headlinePosition: 'below',
      showImage: false,
    };
    const wrapper = mount(<SmallPromo customFields={headBelowConfig} />);
    expect(wrapper.find('.headline-below')).toHaveLength(1);
    expect(wrapper.find('.headline-above').length).toBe(0);
  });

  it('should only be one link when showHeadline is false and show image is true', () => {
    const noHeadlineConfig = {
      itemContentConfig: { contentService: 'ans-item', contentConfiguration: {} },
      showHeadline: false,
      showImage: true,
    };
    const wrapper = mount(<SmallPromo customFields={noHeadlineConfig} />);
    expect(wrapper.find('a')).toHaveLength(1);
  });

  it('should have by default an 3:2 image ratio', () => {
    const wrapper = mount(<SmallPromo customFields={config} />);
    const img = wrapper.find('Image');
    expect(img.prop('largeHeight')).toBe(267);
  });

  it('should accept a 16:9 ratio', () => {
    const myConfig = { ...config, imageRatio: '16:9' };
    const wrapper = mount(<SmallPromo customFields={myConfig} />);
    const img = wrapper.find('Image');
    expect(img.prop('largeHeight')).toBe(225);
  });

  it('should accept a 3:2 ratio', () => {
    const myConfig = { ...config, imageRatio: '3:2' };
    const wrapper = mount(<SmallPromo customFields={myConfig} />);
    const img = wrapper.find('Image');
    expect(img.prop('largeHeight')).toBe(267);
  });

  it('should accept a 4:3 ratio', () => {
    const myConfig = { ...config, imageRatio: '4:3' };
    const wrapper = mount(<SmallPromo customFields={myConfig} />);
    const img = wrapper.find('Image');
    expect(img.prop('largeHeight')).toBe(300);
  });

  it('should fetch content using null source and query if none in custom fields', () => {
    const myConfig = {
      showHeadline: true,
      showImage: true,
      itemContentConfig: {
        contentConfigValues: { id: 1234 },
        contentService: 'content-api',
      },
    };
    const wrapper = mount(<SmallPromo customFields={myConfig} />);
    const expectedArgs = {
      query: {
        'arc-site': undefined,
        id: 1234,
      },
      source: 'content-api',
    };
    expect(useContent).toHaveBeenNthCalledWith(1, expectedArgs);
    wrapper.unmount();
  });

  it('returns null if null content', () => {
    const myConfig = {
      showHeadline: true,
      showImage: true,
      imageRatio: '4:3',
      imageOverrideURL: 'overrideImage.jpg',
    };

    useContent.mockReturnValueOnce(undefined);
    const wrapper = mount(<SmallPromo customFields={myConfig} />);
    expect(wrapper).toEqual({});
    wrapper.unmount();
  });

  it('show image useContent for resizer parameter returns undefined if falsy', () => {
    const myConfig = {
      showHeadline: true,
      showImage: true,
      imageRatio: '4:3',
      imageOverrideURL: 'overrideImage.jpg',
    };

    useContent.mockReturnValueOnce({}).mockReturnValueOnce(null);

    const wrapper = mount(<SmallPromo customFields={myConfig} arcSite="dagen" />);

    const image = wrapper.find('Image');
    expect(image.length).toBe(1);
    expect(image.props().resizedImageOptions).toEqual(undefined);
    wrapper.unmount();
  });

  it('shows placeholder image if no image URL', () => {
    useContent.mockReturnValueOnce({});

    const myConfig = {
      showHeadline: true,
      showImage: true,
      imageRatio: '4:3',
    };

    const wrapper = mount(<SmallPromo customFields={myConfig} />);

    expect(wrapper.find('PlaceholderImage').length).toBe(1);
    expect(wrapper.find('Image').length).toBe(0);
    wrapper.unmount();
  });
});
