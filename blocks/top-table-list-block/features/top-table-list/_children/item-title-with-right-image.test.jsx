import React from 'react';
import { mount } from 'enzyme';

jest.mock('fusion:properties', () => (jest.fn(() => ({
  fallbackImage: 'placeholder.jpg',
  resizerURL: 'http://example.com',
}))));

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

describe('item title with right image block', () => {
  it('renders title and image with full props', () => {
    const imageURL = 'pic';
    const itemTitle = 'title';
    const primaryFont = 'arial';
    const id = 'test';
    const { default: ItemTitleWithRightImage } = require('./item-title-with-right-image');

    // eslint-disable-next-line no-unused-vars
    const wrapper = mount(
      <ItemTitleWithRightImage
        imageURL={imageURL}
        itemTitle={itemTitle}
        primaryFont={primaryFont}
        id={id}
        customFields={config}
        resizedImageOptions={{ '400x267': '' }}
      />,
    );

    // expect(wrapper.find('h2.simple-list-headline-text').length).toBe(1);
    // expect(wrapper.find('h2.simple-list-headline-text').text()).toBe(itemTitle);

    // placeholder
    // expect(wrapper.find('.simple-list-placeholder').length).toBe(0);
    // expect(wrapper.find('.simple-list-img').length).toBe(1);

    expect(wrapper.find('ItemTitleWithRightImage > article > hr').length).toBe(1);
  });
  xit('renders neither title nor image with empty props, renders placeholder', () => {
    const imageURL = '';
    const itemTitle = '';
    const primaryFont = 'arial';
    const id = 'test';
    const { default: ItemTitleWithRightImage } = require('./item-title-with-right-image');

    // eslint-disable-next-line no-unused-vars
    const wrapper = mount(
      <ItemTitleWithRightImage
        imageURL={imageURL}
        itemTitle={itemTitle}
        primaryFont={primaryFont}
        id={id}
        customFields={config}
      />,
    );

    // expect(wrapper.find('h2.simple-list-headline-text').length).toBe(0);

    // placeholder
    // expect(wrapper.find('.simple-list-placeholder').length).toBe(1);
    // expect(wrapper.find('.simple-list-img').length).toBe(0);
  });
});
