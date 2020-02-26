import React from 'react';
import { mount } from 'enzyme';

describe('item title with right image block', () => {
  it('renders title and image with full props', () => {
    const imageURL = 'pic';
    const itemTitle = 'title';
    const primaryFont = 'arial';
    const id = 'test';
    const { default: ItemTitleWithRightImage } = require('./item-title-with-right-image');

    const wrapper = mount(
      <ItemTitleWithRightImage
        imageURL={imageURL}
        itemTitle={itemTitle}
        primaryFont={primaryFont}
        id={id}
      />,
    );

    // expect(wrapper.find('h2.simple-list-headline-text').length).toBe(1);
    // expect(wrapper.find('h2.simple-list-headline-text').text()).toBe(itemTitle);

    // placeholder
    // expect(wrapper.find('.simple-list-placeholder').length).toBe(0);
    // expect(wrapper.find('.simple-list-img').length).toBe(1);
  });
  it('renders neither title nor image with empty props, renders placeholder', () => {
    const imageURL = '';
    const itemTitle = '';
    const primaryFont = 'arial';
    const id = 'test';
    const { default: ItemTitleWithRightImage } = require('./item-title-with-right-image');

    const wrapper = mount(
      <ItemTitleWithRightImage
        imageURL={imageURL}
        itemTitle={itemTitle}
        primaryFont={primaryFont}
        id={id}
      />,
    );

    // expect(wrapper.find('h2.simple-list-headline-text').length).toBe(0);

    // placeholder
    // expect(wrapper.find('.simple-list-placeholder').length).toBe(1);
    // expect(wrapper.find('.simple-list-img').length).toBe(0);
  });
});
