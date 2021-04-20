/* eslint-disable max-classes-per-file */
import React from 'react';
import { shallow, mount } from 'enzyme';
import {
  EXTRA_LARGE,
  LARGE,
  MEDIUM,
  SMALL,
} from '../shared/storySizeConstants';

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

describe('conditional story item', () => {
  beforeAll(() => {
    jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
    jest.mock('fusion:properties', () => (jest.fn(() => ({
      fallbackImage: 'placeholder.jpg',
      resizerURL: 'https://resizer.me',
      primaryLogo: 'resources/primary_logo.png',
      primaryLogoAlt: 'Primary Logo Alt',
    }))));
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
      })),
    }));
  });
  afterAll(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('renders a small component if small passed in', () => {
    const { default: ConditionalStoryItem } = require('./conditional-story-item');

    const storySize = SMALL;

    const wrapper = shallow(
      <ConditionalStoryItem storySize={storySize} customFields={config} />,
    );

    expect(wrapper.is('SmallListItem')).toBeTruthy();
  });
  it('renders a medium component if small passed in', () => {
    const { default: ConditionalStoryItem } = require('./conditional-story-item');

    const storySize = MEDIUM;

    const wrapper = shallow(
      <ConditionalStoryItem storySize={storySize} customFields={config} />,
    );

    expect(wrapper.is('MediumListItem')).toBeTruthy();
  });
  it('renders a large component if small passed in', () => {
    const { default: ConditionalStoryItem } = require('./conditional-story-item');

    const storySize = LARGE;

    const wrapper = shallow(
      <ConditionalStoryItem storySize={storySize} customFields={config} />,
    );

    expect(wrapper.is('HorizontalOverlineImageStoryItem')).toBeTruthy();
  });
  it('renders a extra large component if small passed in', () => {
    const { default: ConditionalStoryItem } = require('./conditional-story-item');

    const storySize = EXTRA_LARGE;

    const wrapper = shallow(
      <ConditionalStoryItem storySize={storySize} customFields={config} />,
    );

    expect(wrapper.is('VerticalOverlineImageStoryItem')).toBeTruthy();
  });
});

describe('default ratios', () => {
  beforeAll(() => {
    jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
    jest.mock('fusion:properties', () => (jest.fn(() => ({
      fallbackImage: 'placeholder.jpg',
      resizerURL: 'https://resizer.me',
      primaryLogo: 'resources/primary_logo.png',
      primaryLogoAlt: 'Primary Logo Alt',
    }))));
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
      })),
    }));
    jest.mock('fusion:content', () => ({
      useEditableContent: jest.fn(() => ({ editableContent: () => ({ contentEditable: 'true' }) })),
      useContent: jest.fn(() => ({
        content_elements: [{
          _id: 'kjdfh',
          promo_items: {
            basic: {
              type: 'image',
              url: 'url',
              resized_params: {
                '377x283': '',
                '377x251': '',
                '377x212': '',
                '400x225': '',
                '400x267': '',
                '400x300': '',
                '800x600': '',
                '800x533': '',
                '800x450': '',
              },
            },
          },
          headlines: {
            basic: 'Basic Headline',
          },
          description: {
            basic: 'Basic description',
          },
          credits: {
            by: ['Bob Woodward'],
          },
          websites: {
            'the-sun': {
              website_url: 'url',
            },
          },
        }],
      })),
    }));
  });
  afterAll(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('must have a default 4:3 ratio for XL', () => {
    const xlConfig = {
      extraLarge: 1,
      showImageXL: true,
      showHeadlineXL: true,
    };
    const { default: ConditionalStoryItem } = require('./conditional-story-item');
    const wrapper = mount(
      <ConditionalStoryItem storySize={EXTRA_LARGE} customFields={xlConfig} />,
    );
    expect(wrapper.find('PlaceholderImage').prop('largeHeight')).toBe(600);
  });

  it('must have a default 4:3 ratio for LG', () => {
    const lgConfig = {
      large: 1,
      showImageLG: true,
    };
    const { default: ConditionalStoryItem } = require('./conditional-story-item');
    const wrapper = mount(
      <ConditionalStoryItem storySize={LARGE} customFields={lgConfig} />,
    );
    expect(wrapper.find('PlaceholderImage').prop('largeHeight')).toBe(283);
  });

  it('must have a default 16:9 ratio for MD', () => {
    const mdConfig = {
      medium: 1,
      showImageMD: true,
    };
    const { default: ConditionalStoryItem } = require('./conditional-story-item');
    const wrapper = mount(
      <ConditionalStoryItem storySize={MEDIUM} customFields={mdConfig} />,
    );
    expect(wrapper.find('PlaceholderImage').prop('largeHeight')).toBe(225);
  });

  it('must have a default 3:2 ratio for SM', () => {
    const smConfig = {
      small: 1,
      showImageSM: true,
    };
    const { default: ConditionalStoryItem } = require('./conditional-story-item');
    const wrapper = mount(
      <ConditionalStoryItem storySize={SMALL} customFields={smConfig} />,
    );
    expect(wrapper.find('PlaceholderImage').prop('largeHeight')).toBe(267);
  });

  it('XL can be changed to 16:9', () => {
    const xlConfig = {
      extraLarge: 1,
      showImageXL: true,
      showHeadlineXL: true,
      imageRatioXL: '16:9',
    };
    const { default: ConditionalStoryItem } = require('./conditional-story-item');
    const wrapper = mount(
      <ConditionalStoryItem storySize={EXTRA_LARGE} customFields={xlConfig} />,
    );
    expect(wrapper.find('PlaceholderImage').prop('largeHeight')).toBe(450);
  });

  it('XL can be changed to 4:3', () => {
    const xlConfig = {
      extraLarge: 1,
      showImageXL: true,
      showHeadlineXL: true,
      imageRatioXL: '4:3',
    };
    const { default: ConditionalStoryItem } = require('./conditional-story-item');
    const wrapper = mount(
      <ConditionalStoryItem storySize={EXTRA_LARGE} customFields={xlConfig} />,
    );
    expect(wrapper.find('PlaceholderImage').prop('largeHeight')).toBe(600);
  });

  it('XL can be changed to 3:2', () => {
    const xlConfig = {
      extraLarge: 1,
      showImageXL: true,
      showHeadlineXL: true,
      imageRatioXL: '3:2',
    };
    const { default: ConditionalStoryItem } = require('./conditional-story-item');
    const wrapper = mount(
      <ConditionalStoryItem storySize={EXTRA_LARGE} customFields={xlConfig} />,
    );
    expect(wrapper.find('PlaceholderImage').prop('largeHeight')).toBe(533);
  });

  it('LG can be changed to 16:9', () => {
    const lgConfig = {
      large: 1,
      showImageLG: true,
      imageRatioLG: '16:9',
    };
    const { default: ConditionalStoryItem } = require('./conditional-story-item');
    const wrapper = mount(
      <ConditionalStoryItem storySize={LARGE} customFields={lgConfig} />,
    );
    expect(wrapper.find('PlaceholderImage').prop('largeHeight')).toBe(212);
  });

  it('LG can be changed to 4:3', () => {
    const lgConfig = {
      large: 1,
      showImageLG: true,
      imageRatioLG: '4:3',
    };
    const { default: ConditionalStoryItem } = require('./conditional-story-item');
    const wrapper = mount(
      <ConditionalStoryItem storySize={LARGE} customFields={lgConfig} />,
    );
    expect(wrapper.find('PlaceholderImage').prop('largeHeight')).toBe(283);
  });

  it('LG can be changed to 3:2', () => {
    const lgConfig = {
      large: 1,
      showImageLG: true,
      imageRatioLG: '3:2',
    };
    const { default: ConditionalStoryItem } = require('./conditional-story-item');
    const wrapper = mount(
      <ConditionalStoryItem storySize={LARGE} customFields={lgConfig} />,
    );
    expect(wrapper.find('PlaceholderImage').prop('largeHeight')).toBe(251);
  });

  it('MD can be changed to 16:9', () => {
    const mdConfig = {
      medium: 1,
      showImageMD: true,
      imageRatioMD: '16:9',
    };
    const { default: ConditionalStoryItem } = require('./conditional-story-item');
    const wrapper = mount(
      <ConditionalStoryItem storySize={MEDIUM} customFields={mdConfig} />,
    );
    expect(wrapper.find('PlaceholderImage').prop('largeHeight')).toBe(225);
  });

  it('MD can be changed to 4:3', () => {
    const mdConfig = {
      medium: 1,
      showImageMD: true,
      imageRatioMD: '4:3',
    };
    const { default: ConditionalStoryItem } = require('./conditional-story-item');
    const wrapper = mount(
      <ConditionalStoryItem storySize={MEDIUM} customFields={mdConfig} />,
    );
    expect(wrapper.find('PlaceholderImage').prop('largeHeight')).toBe(300);
  });

  it('MD can be changed to 3:2', () => {
    const mdConfig = {
      medium: 1,
      showImageMD: true,
      imageRatioMD: '3:2',
    };
    const { default: ConditionalStoryItem } = require('./conditional-story-item');
    const wrapper = mount(
      <ConditionalStoryItem storySize={MEDIUM} customFields={mdConfig} />,
    );
    expect(wrapper.find('PlaceholderImage').prop('largeHeight')).toBe(267);
  });

  it('SM can be changed to 16:9', () => {
    const smConfig = {
      small: 1,
      showImageSM: true,
      imageRatioSM: '16:9',
    };
    const { default: ConditionalStoryItem } = require('./conditional-story-item');
    const wrapper = mount(
      <ConditionalStoryItem storySize={SMALL} customFields={smConfig} />,
    );
    expect(wrapper.find('PlaceholderImage').prop('largeHeight')).toBe(225);
  });

  it('SM can be changed to 4:3', () => {
    const smConfig = {
      small: 1,
      showImageSM: true,
      imageRatioSM: '4:3',
    };
    const { default: ConditionalStoryItem } = require('./conditional-story-item');
    const wrapper = mount(
      <ConditionalStoryItem storySize={SMALL} customFields={smConfig} />,
    );
    expect(wrapper.find('PlaceholderImage').prop('largeHeight')).toBe(300);
  });

  it('SM can be changed to 3:2', () => {
    const smConfig = {
      small: 1,
      showImageSM: true,
      imageRatioSM: '3:2',
    };
    const { default: ConditionalStoryItem } = require('./conditional-story-item');
    const wrapper = mount(
      <ConditionalStoryItem storySize={SMALL} customFields={smConfig} />,
    );
    expect(wrapper.find('PlaceholderImage').prop('largeHeight')).toBe(267);
  });
});
