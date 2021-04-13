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

describe('conditional story item', () => {
  beforeAll(() => {
    jest.mock('./small-list-item', () => class SmallListItem {});
    jest.mock('./medium-list-item', () => class MediumListItem {});
    jest.mock('./horizontal-overline-image-story-item', () => class HorizontalOverlineImageStoryItem {});
    jest.mock('./vertical-overline-image-story-item', () => class VerticalOverlineImageStoryItem {});
    jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
  });
  afterAll(() => {
    jest.resetModules();
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
