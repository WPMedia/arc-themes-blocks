import React from 'react';
import { mount } from 'enzyme';
import { useContent } from 'fusion:content';
import { extractVideoEmbedFromStory } from '@wpmedia/engine-theme-sdk';
import ExtraLargePromo from './default';

const { default: mockData } = require('./mock-data');
const { default: mockDataVideo } = require('./mock-data-video');

jest.mock('@wpmedia/engine-theme-sdk', () => ({
  Image: () => <div />,
  localizeDateTime: jest.fn(() => new Date().toDateString()),
  extractVideoEmbedFromStory: jest.fn(() => '<div class="video-embed"></div>'),
  VideoPlayer: ({ embedHTML, id }) => <div dangerouslySetInnerHTML={{ __html: embedHTML }} id={`video-${id}`} />,
  LazyLoad: ({ children }) => <>{ children }</>,
  isServerSide: () => true,
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
  showImage: true,
};

const mockFusionContext = {
  arcSite: 'the-sun',
};

jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => mockFusionContext),
}));

describe('the extra large promo feature', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => mockFusionContext),
    }));
  });

  it('should return null if lazyLoad on the server and not in the admin', () => {
    const updatedConfig = {
      ...config,
      lazyLoad: true,
    };
    const wrapper = mount(<ExtraLargePromo customFields={updatedConfig} />);
    expect(wrapper.html()).toBe(null);
  });

  it('should have 1 container fluid class', () => {
    const wrapper = mount(<ExtraLargePromo customFields={config} />);
    expect(wrapper.find('.container-fluid')).toHaveLength(1);
  });

  it('should have two link elements by default', () => {
    const wrapper = mount(<ExtraLargePromo customFields={config} />);
    expect(wrapper.find('a')).toHaveLength(2);
  });

  it('should link the headline to the current site website_url ANS property', () => {
    const url = mockData.websites['the-sun'].website_url;
    const wrapper = mount(<ExtraLargePromo customFields={config} />);
    expect(wrapper.find('a.xl-promo-headline')).toHaveProp('href', url);
  });

  it('should link the image to the current site website_url ANS property', () => {
    const url = mockData.websites['the-sun'].website_url;
    const wrapper = mount(<ExtraLargePromo customFields={config} />);
    expect(wrapper.find('a').at(1)).toHaveProp('href', url);
  });

  it('should have one img when show image is true', () => {
    const wrapper = mount(<ExtraLargePromo customFields={config} />);
    expect(wrapper.find('Image')).toHaveLength(1);
  });

  it('should have no Image when show image is false', () => {
    const noImgConfig = {
      itemContentConfig: { contentService: 'ans-item', contentConfiguration: {} },
      showHeadline: true,
      showImage: false,
    };
    const wrapper = mount(<ExtraLargePromo customFields={noImgConfig} />);
    expect(wrapper.find('Image')).toHaveLength(0);
  });

  it('should have by default an 4:3 image ratio', () => {
    const wrapper = mount(<ExtraLargePromo customFields={config} />);
    const img = wrapper.find('Image');
    expect(img.prop('largeHeight')).toBe(600);
  });

  it('should accept a 16:9 ratio', () => {
    const myConfig = { ...config, imageRatio: '16:9' };
    const wrapper = mount(<ExtraLargePromo customFields={myConfig} />);
    const img = wrapper.find('Image');
    expect(img.prop('largeHeight')).toBe(450);
  });

  it('should accept a 3:2 ratio', () => {
    const myConfig = { ...config, imageRatio: '3:2' };
    const wrapper = mount(<ExtraLargePromo customFields={myConfig} />);
    const img = wrapper.find('Image');
    expect(img.prop('largeHeight')).toBe(533);
  });

  it('should accept a 4:3 ratio', () => {
    const myConfig = { ...config, imageRatio: '4:3' };
    const wrapper = mount(<ExtraLargePromo customFields={myConfig} />);
    const img = wrapper.find('Image');
    expect(img.prop('largeHeight')).toBe(600);
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
    const wrapper = mount(<ExtraLargePromo customFields={myConfig} />);
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

  it('if undefined content return null result', () => {
    const myConfig = {
      showHeadline: true,
      showImage: true,
      itemContentConfig: {
        contentConfigValues: { id: 1234 },
        contentService: 'content-api',
      },
    };
    const wrapper = mount(<ExtraLargePromo customFields={myConfig} />);
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

  it('returns null if null content', () => {
    const myConfig = {
      showHeadline: true,
      showImage: true,
      imageRatio: '4:3',
      imageOverrideURL: 'overrideImage.jpg',
    };

    useContent.mockReturnValueOnce(undefined);
    const wrapper = mount(<ExtraLargePromo customFields={myConfig} arcSite="dagen" />);
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

    const wrapper = mount(<ExtraLargePromo customFields={myConfig} arcSite="dagen" />);

    const image = wrapper.find('Image');
    expect(image.length).toBe(0);
    wrapper.unmount();
  });

  it('uses websiteSection for overline if there is no content.label.basic', () => {
    const myConfig = {
      showHeadline: true,
      showOverline: true,
    };
    useContent.mockReturnValueOnce({ websites: { 'the-sun': { website_section: { _id: 'the-sun-ID', name: 'the-sun-name' } } } });

    const wrapper = mount(<ExtraLargePromo customFields={myConfig} />);

    const wrapperOverline = wrapper.find('Overline');
    expect(wrapperOverline.length).toBe(1);

    expect(wrapperOverline.find('a.overline').text()).toEqual('the-sun-name');
    expect(wrapperOverline.find('a.overline').prop('href')).toEqual('the-sun-ID/');
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

    const wrapper = mount(<ExtraLargePromo customFields={myConfig} />);

    expect(wrapper.find('Overline').length).toBe(1);
    expect(wrapper.find('.xl-promo-headline').length).toBe(4);
    expect(wrapper.find('.description-text').length).toBe(3);
    expect(wrapper.find('ArticleByline').length).toBe(1);
    expect(wrapper.find('ArticleDate').length).toBe(1);
    expect(wrapper.find('Image').length).toBe(1);
    wrapper.unmount();
  });

  it('show image if has showDescription enabled', () => {
    const myConfig = {
      showHeadline: true,
      showImage: true,
      imageRatio: '4:3',
      showOverline: false,
      showDescription: true,
      showByline: false,
      showDate: false,
    };

    const wrapper = mount(<ExtraLargePromo customFields={myConfig} />);
    expect(wrapper.find('.description-text').length).toBe(3);
    expect(wrapper.find('Image').length).toBe(1);
    wrapper.unmount();
  });

  it('show image if has showByline enabled', () => {
    const myConfig = {
      showHeadline: true,
      showImage: true,
      imageRatio: '4:3',
      showOverline: false,
      showDescription: false,
      showByline: true,
      showDate: false,
    };

    const wrapper = mount(<ExtraLargePromo customFields={myConfig} />);
    expect(wrapper.find('ArticleByline').length).toBe(1);
    expect(wrapper.find('Image').length).toBe(1);
    wrapper.unmount();
  });

  it('show image if has showDate enabled', () => {
    const myConfig = {
      showHeadline: true,
      showImage: true,
      imageRatio: '4:3',
      showOverline: false,
      showDescription: false,
      showByline: false,
      showDate: true,
    };

    const wrapper = mount(<ExtraLargePromo customFields={myConfig} />);
    expect(wrapper.find('ArticleDate').length).toBe(1);
    expect(wrapper.find('Image').length).toBe(1);
    wrapper.unmount();
  });

  it('shows placeholder image if no image URL', () => {
    useContent.mockReturnValueOnce({});

    const myConfig = {
      showHeadline: true,
      showImage: true,
      imageRatio: '4:3',
    };

    const wrapper = mount(<ExtraLargePromo customFields={myConfig} />);

    expect(wrapper.find('PlaceholderImage').length).toBe(1);
    expect(wrapper.find('Image').length).toBe(0);
    wrapper.unmount();
  });

  describe('when "playVideoInPlace" custom field is "true"', () => {
    describe('when ANS content type is "story"', () => {
      it('should render Image when no video found in ANS lead art', () => {
        useContent.mockReturnValueOnce(mockData);
        extractVideoEmbedFromStory.mockReturnValueOnce(undefined);
        const wrapper = mount(
          <ExtraLargePromo
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
        const wrapper = mount(
          <ExtraLargePromo
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
        extractVideoEmbedFromStory.mockReturnValueOnce(undefined);
        const wrapper = mount(
          <ExtraLargePromo
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
        const wrapper = mount(
          <ExtraLargePromo
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
