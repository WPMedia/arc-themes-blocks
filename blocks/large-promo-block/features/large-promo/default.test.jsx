import React from 'react';
import { mount, shallow } from 'enzyme';
import { useContent } from 'fusion:content';
import LargePromo from './default';

const { default: mockData } = require('./mock-data');
const { default: mockDataVideo } = require('./mock-data-video');

jest.mock('@wpmedia/engine-theme-sdk', () => ({
  Image: () => <div />,
  localizeDateTime: jest.fn(() => new Date().toDateString()),
}));

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

const mockFusionContext = {
  arcSite: 'the-sun',
};

jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => mockFusionContext),
}));

jest.mock('fusion:content', () => ({
  useContent: jest.fn(() => (mockData)),
  useEditableContent: jest.fn(() => ({ editableContent: () => ({ contentEditable: 'true' }) })),
}));

describe('the large promo feature', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('should have 1 container fluid class', () => {
    const wrapper = mount(<LargePromo customFields={config} />);
    expect(wrapper.find('.container-fluid')).toHaveLength(1);
    wrapper.unmount();
  });

  it('should have two link elements by default', () => {
    const wrapper = mount(<LargePromo customFields={config} />);
    expect(wrapper.find('a')).toHaveLength(2);
    wrapper.unmount();
  });

  it('should link the headline to the current site website_url ANS property', () => {
    const url = mockData.websites['the-sun'].website_url;
    const wrapper = mount(<LargePromo customFields={config} />);
    expect(wrapper.find('a.lg-promo-headline')).toHaveProp('href', url);
    wrapper.unmount();
  });

  it('should link the image to the current site website_url ANS property', () => {
    const url = mockData.websites['the-sun'].website_url;
    const wrapper = mount(<LargePromo customFields={config} />);
    expect(wrapper.find('a').at(1)).toHaveProp('href', url);
    wrapper.unmount();
  });

  it('should have one img when show image is true', () => {
    useContent.mockReturnValueOnce(mockData);
    const wrapper = mount(<LargePromo customFields={config} />);
    expect(wrapper.find('Image')).toHaveLength(1);
    wrapper.unmount();
  });

  it('Headline div should have class .col-md-xl-6 when show image is true', () => {
    useContent.mockReturnValueOnce(mockData);
    const wrapper = mount(<LargePromo customFields={config} />);
    expect(wrapper.find('.col-md-xl-6')).toHaveLength(2);
    wrapper.unmount();
  });

  it('should have no Image when show image is false', () => {
    useContent.mockReturnValueOnce(mockData);
    const noImgConfig = {
      itemContentConfig: { contentService: 'ans-item', contentConfiguration: {} },
      showHeadline: true,
      showImage: false,
    };
    const wrapper = mount(<LargePromo customFields={noImgConfig} />);
    expect(wrapper.find('Image')).toHaveLength(0);
    wrapper.unmount();
  });

  it('headline div should have class .col-sm-xl-12 when show image is false', () => {
    useContent.mockReturnValueOnce(mockData);
    const noImgConfig = {
      itemContentConfig: { contentService: 'ans-item', contentConfiguration: {} },
      showHeadline: true,
      showImage: false,
    };
    const wrapper = mount(<LargePromo customFields={noImgConfig} />);
    expect(wrapper.find('.col-sm-xl-12')).toHaveLength(1);
    wrapper.unmount();
  });

  it('should only be one link when showHeadline is false and show image is true', () => {
    useContent.mockReturnValueOnce(mockData);
    const noHeadlineConfig = {
      itemContentConfig: { contentService: 'ans-item', contentConfiguration: {} },
      showHeadline: false,
      showImage: true,
    };
    const wrapper = mount(<LargePromo customFields={noHeadlineConfig} />);
    expect(wrapper.find('a')).toHaveLength(1);
    wrapper.unmount();
  });

  it('should have by default an 4:3 image ratio', () => {
    useContent.mockReturnValueOnce(mockData);
    const wrapper = mount(<LargePromo customFields={config} />);
    const img = wrapper.find('Image');
    expect(img.prop('largeHeight')).toBe(283);
    wrapper.unmount();
  });

  it('should accept a 16:9 ratio', () => {
    useContent.mockReturnValueOnce(mockData);
    const myConfig = { ...config, imageRatio: '16:9' };
    const wrapper = mount(<LargePromo customFields={myConfig} />);
    const img = wrapper.find('Image');
    expect(img.prop('largeHeight')).toBe(212);
    wrapper.unmount();
  });

  it('should accept a 3:2 ratio', () => {
    useContent.mockReturnValueOnce(mockData);
    const myConfig = { ...config, imageRatio: '3:2' };
    const wrapper = mount(<LargePromo customFields={myConfig} />);
    const img = wrapper.find('Image');
    expect(img.prop('largeHeight')).toBe(251);
    wrapper.unmount();
  });

  it('should accept a 4:3 ratio', () => {
    useContent.mockReturnValueOnce(mockData);
    const myConfig = { ...config, imageRatio: '4:3' };
    const wrapper = mount(<LargePromo customFields={myConfig} />);
    const img = wrapper.find('Image');
    expect(img.prop('largeHeight')).toBe(283);
    wrapper.unmount();
  });

  it('not call content source if not custom fields for url', () => {
    useContent.mockReturnValueOnce(mockData);
    const myConfig = { showHeadline: true, showImage: true, imageRatio: '4:3' };
    const wrapper = mount(<LargePromo customFields={myConfig} />);

    expect(useContent).toHaveBeenNthCalledWith(1, { query: null, source: null });
    expect(useContent).toHaveBeenNthCalledWith(2,
      { query: { raw_image_url: undefined }, source: null });
    wrapper.unmount();
  });

  it('show ALL options if enabled', () => {
    useContent.mockReturnValueOnce(mockData);

    const myConfig = {
      showHeadline: true,
      showImage: true,
      imageRatio: '4:3',
      showOverline: true,
      showDescription: true,
      showByline: true,
      showDate: true,
    };

    const wrapper = mount(<LargePromo customFields={myConfig} arcSite="dagen" />);

    expect(wrapper.find('Overline').length).toBe(1);
    expect(wrapper.find('.lg-promo-headline').length).toBe(4);
    expect(wrapper.find('.description-text').length).toBe(3);
    expect(wrapper.find('ArticleByline').length).toBe(1);
    expect(wrapper.find('ArticleDate').length).toBe(1);
    expect(wrapper.find('Image').length).toBe(1);

    wrapper.unmount();
  });

  it('show ALL options if enabled', () => {
    useContent.mockReturnValueOnce(mockData);

    const myConfig = {
      showHeadline: true,
      showImage: false,
      imageRatio: '4:3',
      showOverline: false,
      showDescription: false,
      showByline: false,
      showDate: false,
    };

    const wrapper = mount(<LargePromo customFields={myConfig} arcSite="dagen" />);

    expect(wrapper.find('Overline').length).toBe(0);
    expect(wrapper.find('HeadlineText').length).toBe(0);
    expect(wrapper.find('DescriptionText').length).toBe(0);
    expect(wrapper.find('Byline').length).toBe(0);
    expect(wrapper.find('ArticleDate').length).toBe(0);
    expect(wrapper.find('Image').length).toBe(0);
    wrapper.unmount();
  });

  it('show placeholder image if no image URL', () => {
    useContent.mockReturnValueOnce({});

    const myConfig = {
      showHeadline: true,
      showImage: true,
      imageRatio: '4:3',
    };

    const wrapper = mount(<LargePromo customFields={myConfig} arcSite="dagen" />);

    expect(wrapper.find('PlaceholderImage').length).toBe(1);
    expect(wrapper.find('Image').length).toBe(0);
    wrapper.unmount();
  });

  it('show image override if provided in custom fields', () => {
    const myConfig = {
      showHeadline: true,
      showImage: true,
      imageRatio: '4:3',
      imageOverrideURL: 'overrideImage.jpg',
    };

    const wrapper = mount(<LargePromo customFields={myConfig} arcSite="dagen" />);

    const image = wrapper.find('Image');
    expect(image.length).toBe(1);
    expect(image.props().url).toEqual('overrideImage.jpg');
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

    const wrapper = mount(<LargePromo customFields={myConfig} arcSite="dagen" />);

    const image = wrapper.find('Image');
    expect(image.length).toBe(1);
    expect(image.props().resizedImageOptions).toEqual(undefined);
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
    const wrapper = mount(<LargePromo customFields={myConfig} arcSite="dagen" />);
    expect(wrapper).toEqual({});
    wrapper.unmount();
  });

  it('uses websiteSection for overline if there is no content.label.basic', () => {
    const myConfig = {
      showHeadline: true,
      showOverline: true,
    };
    useContent.mockReturnValueOnce({ websites: { 'the-sun': { website_section: { _id: 'the-sun-ID', name: 'the-sun-name' } } } });

    const wrapper = mount(<LargePromo customFields={myConfig} />);

    const wrapperOverline = wrapper.find('Overline');
    expect(wrapperOverline.length).toBe(1);

    expect(wrapperOverline.find('a.overline').text()).toEqual('the-sun-name');
    expect(wrapperOverline.find('a.overline').prop('href')).toEqual('the-sun-ID/');
    wrapper.unmount();
  });

  it('uses for content query contentConfigValues if it is present in custom fields', () => {
    const myConfig = {
      showHeadline: true,
      showImage: true,
      imageRatio: '4:3',
      imageOverrideURL: 'overrideImage.jpg',
      itemContentConfig: {
        contentConfigValues: { id: 1234 },
        contentService: 'content-api',
      },
    };
    const wrapper = mount(<LargePromo customFields={myConfig} arcSite="dagen" />);
    const expectedArgs = {
      query: {
        'arc-site': 'the-sun',
        id: 1234,
      },
      source: 'content-api',
    };
    expect(useContent).toHaveBeenNthCalledWith(1, expectedArgs);
    wrapper.unmount();
  });

  describe('when "playVideoInPlace" custom field is "true"', () => {
    describe('when ANS content type is "story"', () => {
      it('should render Image when no video found in ANS lead art', () => {
        useContent.mockReturnValueOnce(mockData);
        const wrapper = shallow(
          <LargePromo
            customFields={{
              ...config,
              playVideoInPlace: true,
            }}
          />,
        );
        expect(wrapper.find('Image')).toHaveLength(1);
        wrapper.unmount();
      });

      it('should render VideoPlayer when video exists in ANS lead art', () => {
        useContent.mockReturnValueOnce({
          ...mockData,
          promo_items: {
            ...mockData.promo_items,
            lead_art: {
              type: 'video',
              embed_html: '<div class="video-embed"></div>',
            },
          },
        });
        const wrapper = shallow(
          <LargePromo
            customFields={{
              ...config,
              playVideoInPlace: true,
            }}
          />,
        );
        expect(wrapper.find('Image')).toHaveLength(0);
        expect(wrapper.find('VideoPlayer')).toHaveLength(1);
        wrapper.unmount();
      });
    });

    describe('when ANS content type is "video"', () => {
      it('should render Image when no video embed found in ANS', () => {
        const mockDataVideoNoEmbed = { ...mockData };
        delete mockDataVideoNoEmbed.embed_html;
        useContent.mockReturnValueOnce(mockDataVideoNoEmbed);
        const wrapper = shallow(
          <LargePromo
            customFields={{
              ...config,
              playVideoInPlace: true,
            }}
          />,
        );
        expect(wrapper.find('Image')).toHaveLength(1);
        wrapper.unmount();
      });

      it('should render VideoPlayer when video embed exists in ANS', () => {
        useContent.mockReturnValueOnce(mockDataVideo);
        const wrapper = shallow(
          <LargePromo
            customFields={{
              ...config,
              playVideoInPlace: true,
            }}
          />,
        );
        expect(wrapper.find('Image')).toHaveLength(0);
        expect(wrapper.find('VideoPlayer')).toHaveLength(1);
        wrapper.unmount();
      });
    });
  });
});
