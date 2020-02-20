import React from 'react';
import { mount } from 'enzyme';
import {
  EXTRA_LARGE,
  LARGE,
  MEDIUM,
  SMALL,
} from '../shared/storySizeConstants';

describe('conditional story item', () => {
  jest.mock('fusion:themes', () => (jest.fn(() => ({}))));

  const id = 'fjfjf';
  it('renders a small component if small passed in', () => {
    const { default: ConditionalStoryItem } = require('./conditional-story-item');

    const storySize = SMALL;

    const wrapper = mount(
      <ConditionalStoryItem id={id} storySize={storySize} />,
    );

    const storySizeId = `item-${storySize}-${id}`;

    expect(wrapper.find(`div#${storySizeId}`).length).toBe(1);
  });
  it('renders a medium component if small passed in', () => {
    const { default: ConditionalStoryItem } = require('./conditional-story-item');

    const storySize = MEDIUM;

    const wrapper = mount(
      <ConditionalStoryItem id={id} storySize={storySize} />,
    );

    const storySizeId = `item-${storySize}-${id}`;

    expect(wrapper.find(`div#${storySizeId}`).length).toBe(1);
  });
  it('renders a large component if small passed in', () => {
    const { default: ConditionalStoryItem } = require('./conditional-story-item');

    const storySize = LARGE;

    const wrapper = mount(
      <ConditionalStoryItem id={id} storySize={storySize} />,
    );

    const storySizeId = `item-${storySize}-${id}`;

    expect(wrapper.find(`div#${storySizeId}`).length).toBe(1);
  });
  it('renders a extra large component if small passed in', () => {
    const { default: ConditionalStoryItem } = require('./conditional-story-item');

    const storySize = EXTRA_LARGE;

    const wrapper = mount(
      <ConditionalStoryItem id={id} storySize={storySize} />,
    );

    const storySizeId = `item-${storySize}-${id}`;

    expect(wrapper.find(`div#${storySizeId}`).length).toBe(1);
  });
});
