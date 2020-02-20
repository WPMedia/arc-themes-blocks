import React from 'react';
import { mount } from 'enzyme';

describe('medium list item', () => {
  jest.mock('fusion:themes', () => (jest.fn(() => ({}))));

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
  it('renders with full props', () => {
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
      overlineURL={overlineURL}
      overlineText={overlineText}
      id={id}
    />);

    expect(wrapper.find(`div#${id}`).length).toBe(1);
  });
});
