import React from 'react';
import { mount } from 'enzyme';

describe('vertical overline image story item', () => {
  jest.mock('fusion:themes', () => (jest.fn(() => ({}))));

  it('renders image and overline with full props', () => {
    const imageURL = 'pic';
    const constructedURL = 'url';
    const itemTitle = 'title';
    const descriptionText = 'description';
    const primaryFont = 'arial';
    const by = ['jack'];
    const element = { credits: { by: [] } };
    const displayDate = '';
    const overlineURL = '';
    const overlineText = 'overline';
    const id = 'test';

    const { default: VerticalOverlineImageStoryItem } = require('./vertical-overline-image-story-item');

    const wrapper = mount(
      <VerticalOverlineImageStoryItem
        imageURL={imageURL}
        constructedURL={constructedURL}
        itemTitle={itemTitle}
        descriptionText={descriptionText}
        primaryFont={primaryFont}
        by={by}
        element={element}
        displayDate={displayDate}
        overlineURL={overlineURL}
        overlineText={overlineText}
        id={id}
      />,
    );
    // doesn't show placeholder
    expect(wrapper.find('.top-table-extra-large-image-placeholder').length).toBe(0);

    // finds overline
    expect(wrapper.find('a.overline').length).toBe(1);
    expect(wrapper.find('a.overline').text()).toBe(overlineText);

    // does not find default spacing for headline descriptions
    expect(wrapper.find('.headline-description-spacing').length).toBe(0);
  });
  it('does not render image, overline and byline with empty props', () => {
    const imageURL = '';
    const constructedURL = 'url';
    const itemTitle = 'title';
    const descriptionText = '';
    const primaryFont = 'arial';
    const by = [];
    const element = { };
    const displayDate = '';
    const overlineURL = '';
    const overlineText = '';
    const id = 'test';

    const { default: VerticalOverlineImageStoryItem } = require('./vertical-overline-image-story-item');

    const wrapper = mount(
      <VerticalOverlineImageStoryItem
        imageURL={imageURL}
        constructedURL={constructedURL}
        itemTitle={itemTitle}
        descriptionText={descriptionText}
        primaryFont={primaryFont}
        by={by}
        element={element}
        displayDate={displayDate}
        overlineURL={overlineURL}
        overlineText={overlineText}
        id={id}
      />,
    );
    // doesn't show placeholder
    expect(wrapper.find('.top-table-extra-large-image-placeholder').length).toBe(1);

    // finds overline
    expect(wrapper.find('a.overline').length).toBe(0);

    // does not find default spacing for headline descriptions
    expect(wrapper.find('.headline-description-spacing').length).toBe(1);
  });
});
