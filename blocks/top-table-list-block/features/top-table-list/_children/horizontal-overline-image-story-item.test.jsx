import React from 'react';
import { mount, shallow } from 'enzyme';

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

const sampleProps = {
  imageURL: 'pic',
  websiteURL: 'url',
  itemTitle: 'title',
  descriptionText: 'description',
  primaryFont: 'arial',
  secondaryFont: 'Georgia',
  by: ['jack'],
  element: { credits: { by: [] } },
  displayDate: '',
  id: 'test',
  overlineUrl: '/news',
  overlineText: 'News',
  overlineDisplay: true,
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
    }));
    jest.mock('fusion:properties', () => (jest.fn(() => ({
      fallbackImage: 'placeholder.jpg',
      resizerURL: 'resizer',
    }))));
    jest.mock('@wpmedia/engine-theme-sdk', () => ({
      Image: () => <img alt="test" />,
      extractVideoEmbedFromStory: jest.fn(() => '<div class="video-embed"></div>'),
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
    // expect(wrapper.find('a.overline').at(0).text()).toBe('News');
    expect(wrapper.find('a.overline').text()).toBe('News');

    // has the correct link
    expect(wrapper.find('a.lg-promo-headline').length).toBe(1);
    expect(wrapper.props().websiteURL).toBe('url');
    // expect(wrapper.find('a.lg-promo-headline').at(0).props().href).toBe(websiteURL);
    expect(wrapper.find('a.lg-promo-headline').props().href).toBe(sampleProps.websiteURL);

    expect(wrapper.find('HorizontalOverlineImageStoryItem > hr').length).toBe(1);
    expect(wrapper.find('Image')).toHaveLength(1);
    expect(wrapper.find('VideoPlayer')).toHaveLength(0);
  });
  it('renders with empty props with defaults', () => {
    const testProps = {
      ...sampleProps,
      imageURL: '',
      websiteURL: '',
      itemTitle: '',
      descriptionText: '',
      primaryFont: '',
      secondaryFont: '',
      by: [],
      element: {},
      displayDate: '',
      overlineURL: '',
      overlineText: '',
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
    expect(wrapper.props().overlineText).toBe('');

    // finds default spacing for headline descriptions
    // expect(wrapper.find('.headline-description-spacing').length).toBe(1);

    expect(wrapper.find('HorizontalOverlineImageStoryItem > hr').length).toBe(1);
  });

  it('renders VideoPlayer when type "story" with video lead art', () => {
    const testProps = {
      ...sampleProps,
      element: {
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
    const wrapper = shallow(<HorizontalOverlineImageStoryItem {...testProps} />);

    expect(wrapper.find('.top-table-extra-large-image-placeholder').length).toBe(0);
    expect(wrapper.find('Overline').length).toBe(1);
    expect(wrapper.find('a.lg-promo-headline').length).toBe(1);
    expect(wrapper.find('a.lg-promo-headline').prop('href')).toBe(testProps.websiteURL);
    expect(wrapper.find('hr').length).toBe(1);
    expect(wrapper.find('Image')).toHaveLength(0);
    expect(wrapper.find('VideoPlayer')).toHaveLength(1);
  });

  it('renders VideoPlayer when type "video" with embed', () => {
    const testProps = {
      ...sampleProps,
      element: {
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
    const wrapper = shallow(<HorizontalOverlineImageStoryItem {...testProps} />);

    expect(wrapper.find('.top-table-extra-large-image-placeholder').length).toBe(0);
    expect(wrapper.find('Overline').length).toBe(0);
    expect(wrapper.find('a.lg-promo-headline').length).toBe(1);
    expect(wrapper.find('a.lg-promo-headline').prop('href')).toBe(testProps.websiteURL);
    expect(wrapper.find('hr').length).toBe(1);
    expect(wrapper.find('hr').hasClass('hr-borderless')).toBe(false);
    expect(wrapper.find('Image')).toHaveLength(0);
    expect(wrapper.find('VideoPlayer')).toHaveLength(1);
  });

  it('renders VideoPlayer when type "video" with embed without border line', () => {
    const testProps = {
      ...sampleProps,
      element: {
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
    const wrapper = shallow(<HorizontalOverlineImageStoryItem {...testProps} />);

    expect(wrapper.find('.top-table-extra-large-image-placeholder').length).toBe(0);
    expect(wrapper.find('Overline').length).toBe(0);
    expect(wrapper.find('a.lg-promo-headline').length).toBe(1);
    expect(wrapper.find('a.lg-promo-headline').prop('href')).toBe(testProps.websiteURL);
    expect(wrapper.find('hr').hasClass('hr-borderless')).toBe(true);
    expect(wrapper.find('Image')).toHaveLength(0);
    expect(wrapper.find('VideoPlayer')).toHaveLength(1);
  });

  it('renders VideoPlayer when type "video" with embed with border line', () => {
    const testProps = {
      ...sampleProps,
      element: {
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
    const wrapper = shallow(<HorizontalOverlineImageStoryItem {...testProps} />);

    expect(wrapper.find('.top-table-extra-large-image-placeholder').length).toBe(0);
    expect(wrapper.find('Overline').length).toBe(0);
    expect(wrapper.find('a.lg-promo-headline').length).toBe(1);
    expect(wrapper.find('a.lg-promo-headline').prop('href')).toBe(testProps.websiteURL);
    expect(wrapper.find('hr').length).toBe(1);
    expect(wrapper.find('hr').hasClass('hr-borderless')).toBe(false);
    expect(wrapper.find('Image')).toHaveLength(0);
    expect(wrapper.find('VideoPlayer')).toHaveLength(1);
  });
});
