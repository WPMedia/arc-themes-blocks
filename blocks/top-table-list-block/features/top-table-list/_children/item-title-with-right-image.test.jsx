import React from 'react';
import { mount } from 'enzyme';

describe('item title with right image', () => {
  const imageURL = 'pic';
  const itemTitle = 'title';
  const primaryFont = 'arial';
  const id = 'test';

  it('renders with full props', () => {
    const { default: ItemTitleWithRightImage } = require('./item-title-with-right-image');

    const wrapper = mount(
      <ItemTitleWithRightImage
        imageURL={imageURL}
        itemTitle={itemTitle}
        primaryFont={primaryFont}
        id={id}
      />,
    );

    expect(wrapper.find(`div#${id}`).length).toBe(1);
  });
});
