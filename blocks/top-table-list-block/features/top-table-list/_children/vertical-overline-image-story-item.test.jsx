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

describe('vertical overline image story item', () => {
  beforeAll(() => {
    jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
    jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
    jest.mock('@wpmedia/engine-theme-sdk', () => ({
      Image: () => <img alt="placeholder" />,
      extractVideoEmbedFromStory: jest.fn(() => '<div class="video-embed"></div>'),
      VideoPlayer: ({ embedHTML, id }) => <div dangerouslySetInnerHTML={{ __html: embedHTML }} id={`video-${id}`} />,
      formatURL: jest.fn((input) => input.toString()),
    }));
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        globalContent: {},
      })),
    }));
    jest.mock('fusion:content', () => ({
      useEditableContent: jest.fn(() => ({ editableContent: () => ({ contentEditable: 'true' }) })),
    }));
  });
  afterAll(() => {
    jest.resetModules();
  });

  it('renders image and overline with full props', () => {
    const { default: VerticalOverlineImageStoryItem } = require('./vertical-overline-image-story-item');

    const wrapper = mount(<VerticalOverlineImageStoryItem {...sampleProps} />);

    // doesn't show placeholder
    expect(wrapper.find('.top-table-extra-large-image-placeholder').length).toBe(0);
    // finds overline
    expect(wrapper.find('a.overline').length).toBe(1);
    expect(wrapper.props().overlineText).toBe('News');
    expect(wrapper.find('a.overline').text()).toBe(sampleProps.overlineText);

    // does not find default spacing for headline descriptions
    expect(wrapper.find('.headline-description-spacing').length).toBe(0);

    // has the correct link
    expect(wrapper.find('a.xl-promo-headline').length).toBe(1);
    expect(wrapper.props().websiteURL).toBe('url');
    expect(wrapper.find('a.xl-promo-headline').props().href).toBe(sampleProps.websiteURL);

    expect(wrapper.find('VerticalOverlineImageStoryItem > hr').length).toBe(1);
    expect(wrapper.find('Image')).toHaveLength(1);
    expect(wrapper.find('VideoPlayer')).toHaveLength(0);
  });

  it('does not render image, overline and byline with empty props', () => {
    const testProps = {
      ...sampleProps,
      imageURL: '',
      descriptionText: '',
      by: [],
      element: [],
      overlineURL: '',
      overlineText: '',
    };
    const { default: VerticalOverlineImageStoryItem } = require('./vertical-overline-image-story-item');

    const wrapper = mount(<VerticalOverlineImageStoryItem {...testProps} />);

    // matches props
    expect(wrapper.props()).toMatchObject(testProps);

    const placeholderImage = wrapper.find('img');

    // There should be no imag present
    expect(placeholderImage.length).toBe(1);
    expect(placeholderImage.html()).toBe('<img alt="placeholder">');

    // finds overline
    expect(wrapper.find('a.overline').length).toBe(0);
    expect(wrapper.props().overlineText).toBe('');

    expect(wrapper.find('VerticalOverlineImageStoryItem > hr').length).toBe(1);
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
        playVideoInPlaceXL: true,
      },
    };

    const { default: VerticalOverlineImageStoryItem } = require('./vertical-overline-image-story-item');

    const wrapper = shallow(<VerticalOverlineImageStoryItem {...testProps} />);

    expect(wrapper.find('.top-table-extra-large-image-placeholder').length).toBe(0);
    expect(wrapper.find('Overline').length).toBe(1);
    expect(wrapper.find('a.xl-promo-headline').length).toBe(1);
    expect(wrapper.find('a.xl-promo-headline').prop('href')).toBe(testProps.websiteURL);
    expect(wrapper.find('hr').length).toBe(1);
    expect(wrapper.find('hr').hasClass('hr-borderless')).toBe(false);
    expect(wrapper.find('Image')).toHaveLength(0);
    expect(wrapper.find('VideoPlayer')).toHaveLength(1);
  });

  it('renders VideoPlayer when type "video" with embed without bottom border', () => {
    const testProps = {
      ...sampleProps,
      element: {
        type: 'video',
        embed_html: '<div></div>',
      },
      customFields: {
        ...config,
        showHeadlineXL: false,
        showDateXL: false,
        playVideoInPlaceXL: true,
        showBottomBorderXL: false,
      },
    };

    const { default: VerticalOverlineImageStoryItem } = require('./vertical-overline-image-story-item');

    const wrapper = shallow(<VerticalOverlineImageStoryItem {...testProps} />);

    expect(wrapper.find('.top-table-extra-large-image-placeholder').length).toBe(0);
    expect(wrapper.find('Overline').length).toBe(1);
    expect(wrapper.find('a.xl-promo-headline').length).toBe(0);
    expect(wrapper.find('hr').hasClass('hr-borderless')).toBe(true);
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
        showHeadlineXL: false,
        showDateXL: false,
        playVideoInPlaceXL: true,
        showBottomBorderXL: true,
      },
    };

    const { default: VerticalOverlineImageStoryItem } = require('./vertical-overline-image-story-item');

    const wrapper = shallow(<VerticalOverlineImageStoryItem {...testProps} />);

    expect(wrapper.find('.top-table-extra-large-image-placeholder').length).toBe(0);
    expect(wrapper.find('Overline').length).toBe(1);
    expect(wrapper.find('a.xl-promo-headline').length).toBe(0);
    expect(wrapper.find('hr').length).toBe(1);
    expect(wrapper.find('Image')).toHaveLength(0);
    expect(wrapper.find('VideoPlayer')).toHaveLength(1);
  });
});
