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
  headlinePositionSM: 'above',
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
  headlinePositionSM: 'below',
  showImageSM: true,
};

describe('item title with right image block', () => {
  beforeAll(() => {
    jest.mock('fusion:properties', () => (jest.fn(() => ({
      fallbackImage: 'placeholder.jpg',
      resizerURL: 'http://example.com',
    }))));
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        globalContent: {},
      })),
    }));
  });

  afterAll(() => {
    jest.resetModules();
  });

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

  it('headline has class headline-above when headline position is above', () => {
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
        customFields={config}
        resizedImageOptions={{ '400x267': '' }}
      />,
    );

    expect(wrapper.find('.headline-above').length).toBe(1);
    expect(wrapper.find('.headline-below').length).toBe(0);
  });

  it('headline has class headline-below when headline position is below', () => {
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
        customFields={headBelowConfig}
        resizedImageOptions={{ '400x267': '' }}
      />,
    );

    expect(wrapper.find('.headline-below').length).toBe(1);
    expect(wrapper.find('.headline-above').length).toBe(0);
  });
});

describe('small promo display', () => {
  it('when storiesPerRowSM is undefined must not add class small-promo-one', () => {
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
        customFields={config}
        resizedImageOptions={{ '400x267': '' }}
      />,
    );

    expect(wrapper.find('.small-promo-one').length).toBe(0);
    expect(wrapper.find('article.wrap-bottom').length).toBe(1);
  });

  it('when storiesPerRowSM is 2 must not add class small-promo-one', () => {
    const imageURL = 'pic';
    const itemTitle = 'title';
    const primaryFont = 'arial';
    const id = 'test';
    const { default: ItemTitleWithRightImage } = require('./item-title-with-right-image');
    const setup = Object.assign(config, { storiesPerRowSM: 2 });

    const wrapper = mount(
      <ItemTitleWithRightImage
        imageURL={imageURL}
        itemTitle={itemTitle}
        primaryFont={primaryFont}
        id={id}
        customFields={setup}
        resizedImageOptions={{ '400x267': '' }}
      />,
    );

    expect(wrapper.find('.small-promo-one').length).toBe(0);
    expect(wrapper.find('article.wrap-bottom').length).toBe(1);
  });

  it('when storiesPerRowSM is 1 must add class small-promo-one', () => {
    const imageURL = 'pic';
    const itemTitle = 'title';
    const primaryFont = 'arial';
    const id = 'test';
    const { default: ItemTitleWithRightImage } = require('./item-title-with-right-image');
    const setup = Object.assign(config, { storiesPerRowSM: 1 });

    const wrapper = mount(
      <ItemTitleWithRightImage
        imageURL={imageURL}
        itemTitle={itemTitle}
        primaryFont={primaryFont}
        id={id}
        customFields={setup}
        resizedImageOptions={{ '400x267': '' }}
      />,
    );

    expect(wrapper.find('.small-promo-one').length).toBe(1);
    expect(wrapper.find('article.wrap-bottom').length).toBe(0);
  });
});
