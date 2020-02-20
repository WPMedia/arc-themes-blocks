import React from 'react';
import { mount } from 'enzyme';

describe('vertical overline image story item', () => {
  jest.mock('fusion:themes', () => (jest.fn(() => ({}))));

  it('renders with full props', () => {
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

    expect(wrapper.find(`div#${id}`).length).toBe(1);
  });
});
