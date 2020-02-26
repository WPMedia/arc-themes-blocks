import React from 'react';
import { mount } from 'enzyme';

describe('medium list item', () => {
  jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
  it('renders title and image with full props', () => {
    const imageURL = 'pic';
    const constructedURL = 'url';
    const itemTitle = 'title';
    const descriptionText = 'description';
    const primaryFont = 'arial';
    const by = ['jack'];
    const element = { credits: { by: [] } };
    const displayDate = '';
    const id = 'test';
    const { default: MediumListItem } = require('./medium-list-item');

    const wrapper = mount(<MediumListItem
      imageURL={imageURL}
      constructedURL={constructedURL}
      itemTitle={itemTitle}
      descriptionText={descriptionText}
      primaryFont={primaryFont}
      by={by}
      element={element}
      displayDate={displayDate}
      id={id}
    />);

    // placeholder
    // expect(wrapper.find('.top-table-med-image-placeholder').length).toBe(0);

    // doesn't find spacer
    // expect(wrapper.find('.headline-description-spacing').length).toBe(0);

    // finds description text
    // expect(wrapper.find('p.description-text').text()).toBe(descriptionText);
  });

  it('renders image placeholder with empty props', () => {
    const { default: MediumListItem } = require('./medium-list-item');

    const imageURL = '';
    const constructedURL = 'url';
    const itemTitle = 'title';
    const descriptionText = '';
    const primaryFont = 'arial';
    const by = [];
    const element = { };
    const displayDate = '';
    const id = 'test';

    const wrapper = mount(<MediumListItem
      imageURL={imageURL}
      constructedURL={constructedURL}
      itemTitle={itemTitle}
      descriptionText={descriptionText}
      primaryFont={primaryFont}
      by={by}
      element={element}
      displayDate={displayDate}

      id={id}
    />);

    // placeholder
    // expect(wrapper.find('.top-table-med-image-placeholder').length).toBe(1);

    // doesn't find spacer
    // expect(wrapper.find('.headline-description-spacing').length).toBe(1);
  });
});
