import React from 'react';
import { mount } from 'enzyme';

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
    const constructedURL = 'url';
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
        constructedURL={constructedURL}
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

    // doesn't show placeholder
    // expect(wrapper.find('.top-table-large-image-placeholder').length).toBe(0);

    // finds overline
    expect(wrapper.find('a.overline').length).toBe(1);
    expect(wrapper.find('a.overline').text()).toBe('News');

    // does not find default spacing for headline descriptions
    // expect(wrapper.find('.headline-description-spacing').length).toBe(0);
  });
  it('renders with empty props with defaults', () => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        globalContent: {},
      })),
    }));
    const imageURL = '';
    const constructedURL = '';
    const itemTitle = '';
    const descriptionText = '';
    const primaryFont = '';
    const by = [];
    const element = {};
    const displayDate = '';
    const overlineURL = '';
    const overlineText = '';
    const id = 'test';
    const { default: HorizontalOverlineImageStoryItem } = require('./horizontal-overline-image-story-item');

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
        customFields={config}
      />,
    );

    // Should be no img present
    expect(wrapper.find('img').length).toBe(0);

    // does not find overline
    expect(wrapper.find('a.overline').length).toBe(0);
    expect(wrapper.props().overlineText).toBe('');

    // finds default spacing for headline descriptions
    // expect(wrapper.find('.headline-description-spacing').length).toBe(1);
  });
});
