import React from 'react';
import { shallow } from 'enzyme';
import {
  EXTRA_LARGE,
  LARGE,
  MEDIUM,
  SMALL,
} from '../shared/storySizeConstants';

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
      <ConditionalStoryItem storySize={storySize} />,
    );

    expect(wrapper.is('ItemWithRightImage')).toBeTruthy();
  });
  it('renders a medium component if small passed in', () => {
    const { default: ConditionalStoryItem } = require('./conditional-story-item');

    const storySize = MEDIUM;

    const wrapper = shallow(
      <ConditionalStoryItem storySize={storySize} />,
    );

    expect(wrapper.is('MediumListItem')).toBeTruthy();
  });
  it('renders a large component if small passed in', () => {
    const { default: ConditionalStoryItem } = require('./conditional-story-item');

    const storySize = LARGE;

    const wrapper = shallow(
      <ConditionalStoryItem storySize={storySize} />,
    );

    expect(wrapper.is('HorizontalOverlineImageStoryItem')).toBeTruthy();
  });
  it('renders a extra large component if small passed in', () => {
    const { default: ConditionalStoryItem } = require('./conditional-story-item');

    const storySize = EXTRA_LARGE;

    const wrapper = shallow(
      <ConditionalStoryItem storySize={storySize} />,
    );

    expect(wrapper.is('VerticalOverlineImageStoryItem')).toBeTruthy();
  });
});
