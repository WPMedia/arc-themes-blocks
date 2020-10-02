import React from 'react';
import { mount } from 'enzyme';

const config = {
  showOverlineXL: true,
  showHeadlineXL: true,
  // headlinePositionXL: 'above',
  showImageXL: true,
  showDescriptionXL: true,
  showBylineXL: true,
  showDateXL: true,
  showOverlineLG: true,
  showHeadlineLG: true,
  // headlinePositionLG: 'below',
  showImageLG: true,
  showDescriptionLG: true,
  showBylineLG: true,
  showDateLG: true,
  showHeadlineMD: true,
  // headlinePositionMD: 'below',
  showImageMD: true,
  showDescriptionMD: true,
  showBylineMD: true,
  showDateMD: true,
  showHeadlineSM: true,
  // headlinePositionSM: 'below',
  showImageSM: true,
};

// const headBelowConfig = {
//   showOverlineXL: true,
//   showHeadlineXL: true,
//   headlinePositionXL: 'below',
//   showImageXL: true,
//   showDescriptionXL: true,
//   showBylineXL: true,
//   showDateXL: true,
//   showOverlineLG: true,
//   showHeadlineLG: true,
//   headlinePositionLG: 'below',
//   showImageLG: true,
//   showDescriptionLG: true,
//   showBylineLG: true,
//   showDateLG: true,
//   showHeadlineMD: true,
//   headlinePositionMD: 'below',
//   showImageMD: true,
//   showDescriptionMD: true,
//   showBylineMD: true,
//   showDateMD: true,
//   showHeadlineSM: true,
//   headlinePositionSM: 'below',
//   showImageSM: true,
// };

describe('vertical overline image story item', () => {
  beforeAll(() => {
    jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
    jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
    jest.mock('@wpmedia/engine-theme-sdk', () => ({
      Image: () => <img alt="placeholder" />,
    }));
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        globalContent: {},
      })),
    }));
    jest.mock('fusion:content', () => ({
      useEditableContent: jest.fn(() => ({ editableContent: () => ({ contentEditable: 'true' }) })),
    }));
  });
  afterAll(() => {
    jest.resetModules();
  });

  it('renders image and overline with full props', () => {
    const imageURL = 'pic';
    const websiteURL = 'url';
    const itemTitle = 'title';
    const descriptionText = 'description';
    const primaryFont = 'arial';
    const by = ['jack'];
    const element = { credits: { by: [] } };
    const displayDate = '';
    const id = 'test';
    const overlineUrl = '/news';
    const overlineText = 'News';
    const overlineDisplay = true;

    const { default: VerticalOverlineImageStoryItem } = require('./vertical-overline-image-story-item');

    const wrapper = mount(
      <VerticalOverlineImageStoryItem
        imageURL={imageURL}
        websiteURL={websiteURL}
        itemTitle={itemTitle}
        descriptionText={descriptionText}
        primaryFont={primaryFont}
        by={by}
        element={element}
        displayDate={displayDate}
        overlineUrl={overlineUrl}
        overlineText={overlineText}
        id={id}
        overlineDisplay={overlineDisplay}
        customFields={config}
      />,
    );

    // doesn't show placeholder
    expect(wrapper.find('.top-table-extra-large-image-placeholder').length).toBe(0);
    // finds overline
    expect(wrapper.find('a.overline').length).toBe(1);
    expect(wrapper.props().overlineText).toBe('News');
    expect(wrapper.find('a.overline').text()).toBe(overlineText);

    // does not find default spacing for headline descriptions
    expect(wrapper.find('.headline-description-spacing').length).toBe(0);

    // has the correct link
    expect(wrapper.find('a.xl-promo-headline').length).toBe(1);
    expect(wrapper.props().websiteURL).toBe('url');
    expect(wrapper.find('a.xl-promo-headline').props().href).toBe(websiteURL);

    expect(wrapper.find('VerticalOverlineImageStoryItem > hr').length).toBe(1);
  });

  // it('headline has class headline-above when headline position is above', () => {
  //   const imageURL = 'pic';
  //   const websiteURL = 'url';
  //   const itemTitle = 'title';
  //   const descriptionText = 'description';
  //   const primaryFont = 'arial';
  //   const by = ['jack'];
  //   const element = { credits: { by: [] } };
  //   const displayDate = '';
  //   const id = 'test';
  //   const overlineUrl = '/news';
  //   const overlineText = 'News';
  //   const overlineDisplay = true;

  //   const { default: VerticalOverlineImageStoryItem } = require('./vertical-overline-image-story-item');

  //   const wrapper = mount(
  //     <VerticalOverlineImageStoryItem
  //       imageURL={imageURL}
  //       websiteURL={websiteURL}
  //       itemTitle={itemTitle}
  //       descriptionText={descriptionText}
  //       primaryFont={primaryFont}
  //       by={by}
  //       element={element}
  //       displayDate={displayDate}
  //       overlineUrl={overlineUrl}
  //       overlineText={overlineText}
  //       id={id}
  //       overlineDisplay={overlineDisplay}
  //       customFields={config}
  //     />,
  //   );

  //   expect(wrapper.find('.headline-above').length).toBe(1);
  //   expect(wrapper.find('.headline-below').length).toBe(0);
  // });

  // it('headline has class headline-below when headline position is below', () => {
  //   const imageURL = 'pic';
  //   const websiteURL = 'url';
  //   const itemTitle = 'title';
  //   const descriptionText = 'description';
  //   const primaryFont = 'arial';
  //   const by = ['jack'];
  //   const element = { credits: { by: [] } };
  //   const displayDate = '';
  //   const id = 'test';
  //   const overlineUrl = '/news';
  //   const overlineText = 'News';
  //   const overlineDisplay = true;

  //   const { default: VerticalOverlineImageStoryItem } = require('./vertical-overline-image-story-item');

  //   const wrapper = mount(
  //     <VerticalOverlineImageStoryItem
  //       imageURL={imageURL}
  //       websiteURL={websiteURL}
  //       itemTitle={itemTitle}
  //       descriptionText={descriptionText}
  //       primaryFont={primaryFont}
  //       by={by}
  //       element={element}
  //       displayDate={displayDate}
  //       overlineUrl={overlineUrl}
  //       overlineText={overlineText}
  //       id={id}
  //       overlineDisplay={overlineDisplay}
  //       customFields={headBelowConfig}
  //     />,
  //   );

  //   expect(wrapper.find('.headline-below').length).toBe(1);
  //   expect(wrapper.find('.headline-above').length).toBe(0);
  // });

  it('does not render image, overline and byline with empty props', () => {
    const imageURL = '';
    const websiteURL = 'url';
    const itemTitle = 'title';
    const descriptionText = '';
    const primaryFont = 'arial';
    const secondaryFont = 'Georgia';
    const by = [];
    const element = { };
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
      secondaryFont,
      by,
      element,
      displayDate,
      overlineURL,
      overlineText,
      id,
    };
    const { default: VerticalOverlineImageStoryItem } = require('./vertical-overline-image-story-item');

    const wrapper = mount(
      <VerticalOverlineImageStoryItem
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

    const placeholderImage = wrapper.find('img');

    // There should be no imag present
    expect(placeholderImage.length).toBe(1);
    expect(placeholderImage.html()).toBe('<img alt="placeholder">');

    // finds overline
    expect(wrapper.find('a.overline').length).toBe(0);
    expect(wrapper.props().overlineText).toBe('');

    expect(wrapper.find('VerticalOverlineImageStoryItem > hr').length).toBe(1);
  });
});
