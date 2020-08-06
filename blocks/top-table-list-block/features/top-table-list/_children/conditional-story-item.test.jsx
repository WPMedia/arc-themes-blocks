/* eslint-disable max-classes-per-file */
import React from 'react';
import { shallow } from 'enzyme';
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

jest.mock('./item-title-with-right-image', () => class ItemWithRightImage {});
jest.mock('./medium-list-item', () => class MediumListItem {});
jest.mock('./horizontal-overline-image-story-item', () => class HorizontalOverlineImageStoryItem {});
jest.mock('./vertical-overline-image-story-item', () => class VerticalOverlineImageStoryItem {});

describe('conditional story item', () => {
  jest.mock('fusion:themes', () => (jest.fn(() => ({}))));

  it('renders a small component if small passed in', () => {
    const { default: ConditionalStoryItem } = require('./conditional-story-item');

    const storySize = SMALL;

    const wrapper = shallow(
      <ConditionalStoryItem storySize={storySize} customFields={config} />,
    );

    expect(wrapper.is('ItemWithRightImage')).toBeTruthy();
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

  it('renders a small component with padding if storiesPerRowSM is 2 and the position is even', () => {
    const { default: ConditionalStoryItem } = require('./conditional-story-item');

    const storySize = SMALL;
    const setup = Object.assign(config, { storiesPerRowSM: 2 });
    const storySizeMap = {
      extraLarge: 0,
      large: 0,
      medium: 0,
      small: 1,
    };

    const wrapper = shallow(
      <ConditionalStoryItem
        storySize={storySize}
        customFields={setup}
        index={2}
        storySizeMap={storySizeMap}
      />,
    );

    expect(wrapper.is('ItemWithRightImage')).toBeTruthy();
    expect(wrapper.find('ItemWithRightImage').prop('paddingRight')).toBe(true);
  });

  it('renders a small component with padding if storiesPerRowSM is undefined and the position is even', () => {
    const { default: ConditionalStoryItem } = require('./conditional-story-item');

    const storySize = SMALL;
    const storySizeMap = {
      extraLarge: 0,
      large: 0,
      medium: 0,
      small: 1,
    };

    const wrapper = shallow(
      <ConditionalStoryItem
        storySize={storySize}
        customFields={config}
        index={2}
        storySizeMap={storySizeMap}
      />,
    );

    expect(wrapper.is('ItemWithRightImage')).toBeTruthy();
    expect(wrapper.find('ItemWithRightImage').prop('paddingRight')).toBe(true);
  });

  it('renders a small component without padding if storiesPerRowSM is 1', () => {
    const { default: ConditionalStoryItem } = require('./conditional-story-item');

    const storySize = SMALL;
    const storySizeMap = {
      extraLarge: 0,
      large: 0,
      medium: 0,
      small: 1,
    };

    const wrapper = shallow(
      <ConditionalStoryItem
        storySize={storySize}
        customFields={config}
        index={1}
        storySizeMap={storySizeMap}
      />,
    );

    expect(wrapper.is('ItemWithRightImage')).toBeTruthy();
    expect(wrapper.find('ItemWithRightImage').prop('paddingRight')).toBe(false);
  });
});
