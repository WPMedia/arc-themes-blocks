import React from 'react';
import { mount } from 'enzyme';

jest.mock('fusion:properties', () => (jest.fn(() => ({
  fallbackImage: 'placeholder.jpg',
  resizerURL: 'resizer',
}))));
jest.mock('@wpmedia/engine-theme-sdk', () => ({
  Image: () => <img alt="test" />,
}));

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

jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({
    arcSite: 'the-sun',
    globalContent: {},
  })),
}));

jest.mock('fusion:content', () => ({
  useEditableContent: jest.fn(() => ({ editableContent: () => ({ contentEditable: 'true' }) })),
}));

describe('horizontal overline image story item', () => {
  jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
  it('renders with the full required props', () => {
    const imageURL = 'pic';
    const websiteURL = 'url';
    const itemTitle = 'title';
    const descriptionText = 'description';
    const primaryFont = 'arial';
    const by = ['jack'];
    const element = { credits: { by: [] } };
    const displayDate = '';
    const { default: HorizontalOverlineImageStoryItem } = require('./horizontal-overline-image-story-item');
    const id = 'test';
    const overlineUrl = '/news';
    const overlineText = 'News';
    const overlineDisplay = true;

    const wrapper = mount(
      <HorizontalOverlineImageStoryItem
        imageURL={imageURL}
        websiteURL={websiteURL}
        itemTitle={itemTitle}
        descriptionText={descriptionText}
        primaryFont={primaryFont}
        by={by}
        element={element}
        displayDate={displayDate}
        id={id}
        overlineDisplay={overlineDisplay}
        overlineUrl={overlineUrl}
        overlineText={overlineText}
        customFields={config}
      />,
    );

    // finds overline
    expect(wrapper.find('a.overline').length).toBe(1);
    expect(wrapper.find('a.overline').text()).toBe('News');

    // has the correct link
    expect(wrapper.find('a.lg-promo-headline').length).toBe(1);
    expect(wrapper.props().websiteURL).toBe('url');
    expect(wrapper.find('a.lg-promo-headline').props().href).toBe(websiteURL);
  });
  it('renders with empty props with defaults', () => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        globalContent: {},
      })),
    }));
    const imageURL = '';
    const websiteURL = '';
    const itemTitle = '';
    const descriptionText = '';
    const primaryFont = '';
    const by = [];
    const element = {};
    const displayDate = '';
    const overlineURL = '';
    const overlineText = '';
    const id = 'test';
    const props = {
      imageURL,
      websiteURL,
      itemTitle,
      descriptionText,
      primaryFont,
      by,
      element,
      displayDate,
      overlineURL,
      overlineText,
      id,
    };
    const { default: HorizontalOverlineImageStoryItem } = require('./horizontal-overline-image-story-item');

    const wrapper = mount(
      <HorizontalOverlineImageStoryItem
        imageURL={imageURL}
        websiteURL={websiteURL}
        itemTitle={itemTitle}
        descriptionText={descriptionText}
        primaryFont={primaryFont}
        by={by}
        element={element}
        displayDate={displayDate}
        overlineURL={overlineURL}
        overlineText={overlineText}
        id={id}
        customFields={config}
      />,
    );

    // matches props
    expect(wrapper.props()).toMatchObject(props);

    // Should be no img present
    const placeholderImage = wrapper.find('img');
    expect(placeholderImage.length).toBe(1);

    // does not find overline
    expect(wrapper.find('a.overline').length).toBe(0);
    expect(wrapper.props().overlineText).toBe('');

    // finds default spacing for headline descriptions
    // expect(wrapper.find('.headline-description-spacing').length).toBe(1);
  });
});
