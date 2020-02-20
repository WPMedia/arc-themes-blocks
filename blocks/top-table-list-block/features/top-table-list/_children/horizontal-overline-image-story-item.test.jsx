import React from 'react';
import { mount } from 'enzyme';

describe('horizontal overline image story item', () => {
  jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
  it('renders with the full required props', () => {
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
    const { default: HorizontalOverlineImageStoryItem } = require('./horizontal-overline-image-story-item');
    const id = 'test';

    const wrapper = mount(
      <HorizontalOverlineImageStoryItem
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
