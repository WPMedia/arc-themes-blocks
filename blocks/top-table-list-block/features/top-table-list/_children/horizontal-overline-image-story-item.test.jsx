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
  headlinePositionLG: 'above',
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

const headBelowConfig = {
  showOverlineXL: true,
  showHeadlineXL: true,
  showImageXL: true,
  showDescriptionXL: true,
  showBylineXL: true,
  showDateXL: true,
  showOverlineLG: true,
  showHeadlineLG: true,
  headlinePositionLG: 'below',
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

describe('horizontal overline image story item', () => {
  beforeAll(() => {
    jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        globalContent: {},
      })),
    }));
    jest.mock('fusion:content', () => ({
      useEditableContent: jest.fn(() => ({ editableContent: () => ({ contentEditable: 'true' }) })),
    }));
    jest.mock('fusion:properties', () => (jest.fn(() => ({
      fallbackImage: 'placeholder.jpg',
      resizerURL: 'resizer',
    }))));
    jest.mock('@wpmedia/engine-theme-sdk', () => ({
      Image: () => <img alt="test" />,
    }));
  });

  afterAll(() => {
    jest.resetModules();
  });

  it('renders with the full required props', () => {
    const imageURL = 'pic';
    const websiteURL = 'url';
    const itemTitle = 'title';
    const descriptionText = 'description';
    const primaryFont = 'arial';
    const secondaryFont = 'Georgia';
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
        secondaryFont={secondaryFont}
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
    expect(wrapper.find('a.overline').at(0).text()).toBe('News');
    expect(wrapper.find('a.overline').text()).toBe('News');

    // has the correct link
    expect(wrapper.find('a.lg-promo-headline').length).toBe(1);
    expect(wrapper.props().websiteURL).toBe('url');
    expect(wrapper.find('a.lg-promo-headline').at(0).props().href).toBe(websiteURL);
    expect(wrapper.find('a.lg-promo-headline').props().href).toBe(websiteURL);

    expect(wrapper.find('HorizontalOverlineImageStoryItem > hr').length).toBe(1);
  });
  it('renders with empty props with defaults', () => {
    const imageURL = '';
    const websiteURL = '';
    const itemTitle = '';
    const descriptionText = '';
    const primaryFont = '';
    const secondaryFont = '';
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
        secondaryFont={secondaryFont}
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
    expect(wrapper.find('.headline-description-spacing').length).toBe(0);

    expect(wrapper.find('HorizontalOverlineImageStoryItem > hr').length).toBe(1);
  });

  it('headline div has class headline-above when headline is above', () => {
    const imageURL = 'pic';
    const websiteURL = 'url';
    const itemTitle = 'title';
    const descriptionText = 'description';
    const primaryFont = 'arial';
    const secondaryFont = 'Georgia';
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
        secondaryFont={secondaryFont}
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

    expect(wrapper.find('.headline-above').length).toBe(1);
    expect(wrapper.find('.headline-below').length).toBe(0);
  });

  it('headline div has class headline-below when headline is below', () => {
    const imageURL = 'pic';
    const websiteURL = 'url';
    const itemTitle = 'title';
    const descriptionText = 'description';
    const primaryFont = 'arial';
    const secondaryFont = 'Georgia';
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
        secondaryFont={secondaryFont}
        by={by}
        element={element}
        displayDate={displayDate}
        id={id}
        overlineDisplay={overlineDisplay}
        overlineUrl={overlineUrl}
        overlineText={overlineText}
        customFields={headBelowConfig}
      />,
    );

    expect(wrapper.find('.headline-below').length).toBe(1);
    expect(wrapper.find('.headline-above').length).toBe(0);
  });
});
