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
      useComponentContext: jest.fn(() => ({
        registerSuccessEvent: () => ({}),
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
      useComponentContext: jest.fn(() => ({
        registerSuccessEvent: () => ({}),
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

  it('must return empty if there is no size passed in', () => {
    const { default: ConditionalStoryItem } = require('./conditional-story-item');
    const wrapper = mount(
      <ConditionalStoryItem />,
    );
    expect(wrapper.children().exists()).toBe(false);
  });
});

describe('settings export', () => {
  it('must export the pagebuilder settings', () => {
    const { conditionalStoryFields } = require('./conditional-story-item');
    const { verticalOverlineImageStoryFields } = require('./vertical-overline-image-story-item');
    const { horizontalOverlineImageStoryFields } = require('./horizontal-overline-image-story-item');
    const expectedFields = {
      EXTRA_LARGE: verticalOverlineImageStoryFields,
      LARGE: horizontalOverlineImageStoryFields,
    };

    expect(conditionalStoryFields).toStrictEqual(expectedFields);
  });
});
