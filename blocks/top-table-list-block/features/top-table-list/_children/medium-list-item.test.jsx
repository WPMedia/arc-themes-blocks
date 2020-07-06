import React from 'react';
import { mount } from 'enzyme';

jest.mock('@wpmedia/engine-theme-sdk', () => ({
  Image: () => <img alt="placeholder" />,
}));
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
  xit('renders title and image with full props', () => {
    const imageURL = 'pic';
    const constructedURL = 'url';
    const itemTitle = 'title';
    const descriptionText = 'description';
    const primaryFont = 'arial';
    const secondaryFont = 'Georgia';
    const by = ['jack'];
    const element = { credits: { by: [] } };
    const displayDate = '';
    const id = 'test';
    const { default: MediumListItem } = require('./medium-list-item');

    // eslint-disable-next-line no-unused-vars
    const wrapper = mount(<MediumListItem
      imageURL={imageURL}
      constructedURL={constructedURL}
      itemTitle={itemTitle}
      descriptionText={descriptionText}
      primaryFont={primaryFont}
      secondaryFont={secondaryFont}
      by={by}
      element={element}
      displayDate={displayDate}
      id={id}
      customFields={config}
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
    const itemTitle = '';
    const descriptionText = '';
    const primaryFont = 'arial';
    const secondaryFont = 'Georgia';
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
      secondaryFont={secondaryFont}
      by={by}
      element={element}
      displayDate={displayDate}
      id={id}
      customFields={config}
    />);

    const placeholderImage = wrapper.find('img');

    // There should be no imag present
    expect(placeholderImage.length).toBe(1);
    expect(placeholderImage.html()).toBe('<img alt="placeholder">');

    // doesn't find a headline
    expect(wrapper.find('a.md-promo-headline').length).toBe(0);
  });
});
