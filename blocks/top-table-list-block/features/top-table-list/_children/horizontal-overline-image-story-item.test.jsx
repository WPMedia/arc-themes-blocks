import React from 'react';
import { mount } from 'enzyme';

const config = {
  showOverlineXL: true,
  showHeadlineXL: true,
  showImageXL: true,
  showDescriptionXL: true,
  showBylineXL: true,
  showDateXL: true,
  showOverlineLG: true,
  showHeadlineLG: true,
  showImageLG: true,
  showDescriptionLG: true,
  showBylineLG: true,
  showDateLG: true,
  showHeadlineMD: true,
  showImageMD: true,
  showDescriptionMD: true,
  showBylineMD: true,
  showDateMD: true,
  showHeadlineSM: true,
  showImageSM: true,
};

const imageURL = 'pic';
const itemTitle = 'title';
const descriptionText = 'description';
const websiteURL = 'https://arcxp.com';

const sampleProps = {
  element: {
    headlines: {
      basic: itemTitle,
    },
    description: {
      basic: descriptionText,
    },
    websites: {
      'the-sun': {
        website_url: websiteURL,
        website_section: {
          _id: '/news',
          name: 'News',
        },
      },
    },
    credits: { by: ['jack'] },
    promo_items: {
      basic: {
        type: 'image',
        url: imageURL,
        resized_params: {
          '400x267': 'VWgB9mYQ5--6WT0lD6nIw11D_yA=filters:cm=t/',
        },
      },
    },
  },
  id: 'test',
  customFields: config,
};

describe('horizontal overline image story item', () => {
  beforeAll(() => {
    jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        globalContent: {},
      })),
    }));
    jest.mock('fusion:content', () => ({
      useEditableContent: jest.fn(() => ({ editableContent: () => ({ contentEditable: 'true' }) })),
      useContent: jest.fn(),
    }));
    jest.mock('fusion:properties', () => (jest.fn(() => ({
      fallbackImage: 'placeholder.jpg',
      resizerURL: 'resizer',
    }))));
    jest.mock('@wpmedia/engine-theme-sdk', () => ({
      Image: () => <img alt="test" />,
      extractVideoEmbedFromStory: jest.fn(() => '<div class="video-embed"></div>'),
      VideoPlayer: ({ embedHTML, id }) => <div dangerouslySetInnerHTML={{ __html: embedHTML }} id={`video-${id}`} />,
      formatURL: jest.fn((input) => input.toString()),
    }));
  });

  afterAll(() => {
    jest.resetModules();
  });

  it('renders with the full required props', () => {
    const { default: HorizontalOverlineImageStoryItem } = require('./horizontal-overline-image-story-item');
    const wrapper = mount(<HorizontalOverlineImageStoryItem {...sampleProps} />);

    // finds overline
    expect(wrapper.find('a.overline').length).toBe(1);
    expect(wrapper.find('a.overline').text()).toBe('News');

    // has the correct link
    expect(wrapper.find('a.lg-promo-headline').length).toBe(1);
    expect(wrapper.find('a.lg-promo-headline').prop('href')).toBe(websiteURL);

    expect(wrapper.find('HorizontalOverlineImageStoryItem > hr').length).toBe(1);
    expect(wrapper.find('Image')).toHaveLength(1);
    expect(wrapper.find('VideoPlayer')).toHaveLength(0);
  });

  it('renders with empty props with defaults', () => {
    const testProps = {
      ...sampleProps,
      element: {},
      id: 'test',
    };

    const { default: HorizontalOverlineImageStoryItem } = require('./horizontal-overline-image-story-item');
    const wrapper = mount(<HorizontalOverlineImageStoryItem {...testProps} />);

    // matches props
    expect(wrapper.props()).toMatchObject(testProps);

    // Should be no img present
    const placeholderImage = wrapper.find('img');
    expect(placeholderImage.length).toBe(1);

    // does not find overline
    expect(wrapper.find('a.overline').length).toBe(0);

    expect(wrapper.find('HorizontalOverlineImageStoryItem > hr').length).toBe(1);
  });

  it('renders VideoPlayer when type "story" with video lead art', () => {
    const testProps = {
      element: {
        ...sampleProps.element,
        type: 'story',
        promo_items: {
          lead_art: {
            type: 'video',
            embed_html: '<div></div>',
          },
        },
      },
      customFields: {
        ...config,
        playVideoInPlaceLG: true,
      },
    };

    const { default: HorizontalOverlineImageStoryItem } = require('./horizontal-overline-image-story-item');
    const wrapper = mount(<HorizontalOverlineImageStoryItem {...testProps} />);

    expect(wrapper.find('.top-table-extra-large-image-placeholder').length).toBe(0);
    expect(wrapper.find('Overline').length).toBe(1);
    expect(wrapper.find('a.lg-promo-headline').length).toBe(1);
    expect(wrapper.find('a.lg-promo-headline').prop('href')).toBe(websiteURL);
    expect(wrapper.find('hr').length).toBe(1);
    expect(wrapper.find('Image')).toHaveLength(0);
    expect(wrapper.find('VideoPlayer')).toHaveLength(1);
  });

  it('renders VideoPlayer when type "video" with embed', () => {
    const testProps = {
      element: {
        ...sampleProps.element,
        type: 'video',
        embed_html: '<div></div>',
      },
      customFields: {
        ...config,
        showOverlineLG: false,
        showDateLG: false,
        playVideoInPlaceLG: true,
      },
    };

    const { default: HorizontalOverlineImageStoryItem } = require('./horizontal-overline-image-story-item');
    const wrapper = mount(<HorizontalOverlineImageStoryItem {...testProps} />);

    expect(wrapper.find('.top-table-extra-large-image-placeholder').length).toBe(0);
    expect(wrapper.find('Overline').length).toBe(0);
    expect(wrapper.find('a.lg-promo-headline').length).toBe(1);
    expect(wrapper.find('a.lg-promo-headline').prop('href')).toBe(websiteURL);
    expect(wrapper.find('hr').length).toBe(1);
    expect(wrapper.find('hr').hasClass('hr-borderless')).toBe(false);
    expect(wrapper.find('Image')).toHaveLength(0);
    expect(wrapper.find('VideoPlayer')).toHaveLength(1);
  });

  it('renders VideoPlayer when type "video" with embed without border line', () => {
    const testProps = {
      element: {
        ...sampleProps.element,
        type: 'video',
        embed_html: '<div></div>',
      },
      customFields: {
        ...config,
        showOverlineLG: false,
        showDateLG: false,
        playVideoInPlaceLG: true,
        showBottomBorderLG: false,
      },
    };

    const { default: HorizontalOverlineImageStoryItem } = require('./horizontal-overline-image-story-item');
    const wrapper = mount(<HorizontalOverlineImageStoryItem {...testProps} />);

    expect(wrapper.find('.top-table-extra-large-image-placeholder').length).toBe(0);
    expect(wrapper.find('Overline').length).toBe(0);
    expect(wrapper.find('a.lg-promo-headline').length).toBe(1);
    expect(wrapper.find('a.lg-promo-headline').prop('href')).toBe(websiteURL);
    expect(wrapper.find('hr').hasClass('hr-borderless')).toBe(true);
    expect(wrapper.find('Image')).toHaveLength(0);
    expect(wrapper.find('VideoPlayer')).toHaveLength(1);
  });

  it('renders VideoPlayer when type "video" with embed with border line', () => {
    const testProps = {
      element: {
        ...sampleProps.element,
        type: 'video',
        embed_html: '<div></div>',
      },
      customFields: {
        ...config,
        showOverlineLG: false,
        showDateLG: false,
        playVideoInPlaceLG: true,
        showBottomBorderLG: true,
      },
    };

    const { default: HorizontalOverlineImageStoryItem } = require('./horizontal-overline-image-story-item');
    const wrapper = mount(<HorizontalOverlineImageStoryItem {...testProps} />);

    expect(wrapper.find('.top-table-extra-large-image-placeholder').length).toBe(0);
    expect(wrapper.find('Overline').length).toBe(0);
    expect(wrapper.find('a.lg-promo-headline').length).toBe(1);
    expect(wrapper.find('a.lg-promo-headline').prop('href')).toBe(websiteURL);
    expect(wrapper.find('hr').length).toBe(1);
    expect(wrapper.find('hr').hasClass('hr-borderless')).toBe(false);
    expect(wrapper.find('Image')).toHaveLength(0); expect(wrapper.find('Image')).toHaveLength(0);
    expect(wrapper.find('VideoPlayer')).toHaveLength(1); expect(wrapper.find('VideoPlayer')).toHaveLength(1);
  });
});
