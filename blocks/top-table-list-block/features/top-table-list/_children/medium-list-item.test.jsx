import React from 'react';
import { mount } from 'enzyme';

jest.mock('fusion:properties', () => (jest.fn(() => ({
  fallbackImage: 'placeholder.jpg',
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

describe('medium list item', () => {
  jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
  it.todo('renders title and image with full props');
  /*
  it('renders image placeholder with empty props', () => {
    const { default: MediumListItem } = require('./medium-list-item');

    const imageURL = '';
    const constructedURL = 'url';
    const itemTitle = '';
    const descriptionText = '';
    const primaryFont = 'arial';
    const by = [];
    const element = { };
    const displayDate = '';
    const id = 'test';

    // eslint-disable-next-line no-unused-vars
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
      customFields={config}
    />);

    const placeholderImage = wrapper.find('img');

    // There should be no imag present
    expect(placeholderImage.length).toBe(1);
    expect(placeholderImage.props().src.includes('placeholder.jpg')).toBe(true);

    // doesn't find a headline
    expect(wrapper.find('a.md-promo-headline').length).toBe(0);
  });
  */
});
