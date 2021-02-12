import React from 'react';
import { mount } from 'enzyme';
import {
  LEFT, RIGHT, ABOVE, BELOW,
} from '../shared/imagePositionConstants';

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
  imagePositionSM: RIGHT,
};

describe('small image block', () => {
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

  it('must render title and image with full props', () => {
    const imageURL = 'pic';
    const itemTitle = 'title';
    const primaryFont = 'arial';
    const id = 'test';
    const subTypeClassName = 'subtype_editorial';
    const { default: SmallListItem } = require('./small-list-item');

    const wrapper = mount(
      <SmallListItem
        imageURL={imageURL}
        itemTitle={itemTitle}
        primaryFont={primaryFont}
        id={id}
        customFields={config}
        resizedImageOptions={{ '400x267': '' }}
        subType={subTypeClassName}
      />,
    );

    expect(wrapper.find('h2.sm-promo-headline').length).toBe(1);
    expect(wrapper.find('h2.sm-promo-headline').text()).toBe(itemTitle);

    expect(wrapper.find('Image').length).toBe(1);
    expect(wrapper.find('Image').prop('url')).toBe(imageURL);

    expect(wrapper.find('SmallListItem > article > hr').length).toBe(1);
    expect(wrapper.find('SmallListItem > article').hasClass(subTypeClassName)).toBe(true);
  });

  it('must renders neither title nor image with empty props, renders placeholder image', () => {
    const imageURL = '';
    const fallbackImage = 'fallback';
    const itemTitle = '';
    const primaryFont = 'arial';
    const id = 'test';
    const { default: SmallListItem } = require('./small-list-item');

    const wrapper = mount(
      <SmallListItem
        imageURL={imageURL}
        itemTitle={itemTitle}
        primaryFont={primaryFont}
        id={id}
        customFields={config}
        placeholderResizedImageOptions={{ '400x267': '' }}
        targetFallbackImage={fallbackImage}
      />,
    );

    expect(wrapper.find('h2.sm-promo-headline').length).toBe(0);

    expect(wrapper.find('Image').length).toBe(1);
    expect(wrapper.find('Image').prop('url')).toBe(fallbackImage);

    expect(wrapper.find('SmallListItem > article > hr').length).toBe(1);
  });

  it('must render only title if showImageSM false', () => {
    const imageURL = 'pic';
    const itemTitle = 'title';
    const primaryFont = 'arial';
    const id = 'test';
    const { default: SmallListItem } = require('./small-list-item');

    const wrapper = mount(
      <SmallListItem
        imageURL={imageURL}
        itemTitle={itemTitle}
        primaryFont={primaryFont}
        id={id}
        /* eslint-disable-next-line */
        customFields={Object.assign({}, config, { showImageSM: false })}
        resizedImageOptions={{ '400x267': '' }}
      />,
    );

    expect(wrapper.find('h2.sm-promo-headline').length).toBe(1);
    expect(wrapper.find('h2.sm-promo-headline').text()).toBe(itemTitle);

    expect(wrapper.find('Image').length).toBe(0);

    expect(wrapper.find('SmallListItem > article > hr').length).toBe(1);
  });

  it('must render only image if showHeadlinesSM false', () => {
    const imageURL = 'pic';
    const itemTitle = 'title';
    const primaryFont = 'arial';
    const id = 'test';
    const { default: SmallListItem } = require('./small-list-item');

    const wrapper = mount(
      <SmallListItem
        imageURL={imageURL}
        itemTitle={itemTitle}
        primaryFont={primaryFont}
        id={id}
        /* eslint-disable-next-line */
        customFields={Object.assign({}, config, { showHeadlineSM: false })}
        resizedImageOptions={{ '400x267': '' }}
      />,
    );

    expect(wrapper.find('h2.sm-promo-headline').length).toBe(0);

    expect(wrapper.find('Image').length).toBe(1);

    expect(wrapper.find('SmallListItem > article > hr').length).toBe(1);
  });

  it('must render with layout horizontal if image position is "left" or "right"', () => {
    const imageURL = 'pic';
    const itemTitle = 'title';
    const primaryFont = 'arial';
    const id = 'test';
    const { default: SmallListItem } = require('./small-list-item');

    const wrapper = mount(
      <SmallListItem
        imageURL={imageURL}
        itemTitle={itemTitle}
        primaryFont={primaryFont}
        id={id}
        /* eslint-disable-next-line */
        customFields={Object.assign({}, config, { imagePositionSM: LEFT })}
        resizedImageOptions={{ '400x267': '' }}
      />,
    );

    expect(wrapper.find('article > .horizontal').length).toBe(1);
  });

  it('must render with layout vertical if image position is "above" or "below"', () => {
    const imageURL = 'pic';
    const itemTitle = 'title';
    const primaryFont = 'arial';
    const id = 'test';
    const { default: SmallListItem } = require('./small-list-item');

    const wrapper = mount(
      <SmallListItem
        imageURL={imageURL}
        itemTitle={itemTitle}
        primaryFont={primaryFont}
        id={id}
        /* eslint-disable-next-line */
        customFields={Object.assign({}, config, { imagePositionSM: BELOW })}
        resizedImageOptions={{ '400x267': '' }}
      />,
    );
    expect(wrapper.find('article > .vertical').length).toBe(1);
  });

  it('must render only title if showImageSM false in horizontal layuout', () => {
    const imageURL = 'pic';
    const itemTitle = 'title';
    const primaryFont = 'arial';
    const id = 'test';
    const { default: SmallListItem } = require('./small-list-item');

    const wrapper = mount(
      <SmallListItem
        imageURL={imageURL}
        itemTitle={itemTitle}
        primaryFont={primaryFont}
        id={id}
        /* eslint-disable-next-line */
        customFields={Object.assign({}, config, { storiesPerRowSM: 2, showImageSM: false })}
        resizedImageOptions={{ '400x267': '' }}
      />,
    );

    expect(wrapper.find('h2.sm-promo-headline').length).toBe(1);
    expect(wrapper.find('h2.sm-promo-headline').text()).toBe(itemTitle);

    expect(wrapper.find('Image').length).toBe(0);
    expect(wrapper.find('article > .horizontal').length).toBe(1);
  });

  it('must render only image if showHeadlineSM false in horizontal layuout', () => {
    const imageURL = 'pic';
    const itemTitle = 'title';
    const primaryFont = 'arial';
    const id = 'test';
    const { default: SmallListItem } = require('./small-list-item');

    const wrapper = mount(
      <SmallListItem
        imageURL={imageURL}
        itemTitle={itemTitle}
        primaryFont={primaryFont}
        id={id}
        /* eslint-disable-next-line */
        customFields={Object.assign({}, config, { storiesPerRowSM: 2, showHeadlineSM: false })}
        resizedImageOptions={{ '400x267': '' }}
      />,
    );

    expect(wrapper.find('h2.sm-promo-headline').length).toBe(0);

    expect(wrapper.find('Image').length).toBe(1);
    expect(wrapper.find('article > .horizontal').length).toBe(1);
  });

  it('must render only image if showHeadlineSM false in vertical layout', () => {
    const imageURL = 'pic';
    const itemTitle = '';
    const primaryFont = 'arial';
    const id = 'test';
    const { default: SmallListItem } = require('./small-list-item');

    const wrapper = mount(
      <SmallListItem
        imageURL={imageURL}
        itemTitle={itemTitle}
        primaryFont={primaryFont}
        id={id}
        /* eslint-disable-next-line */
        customFields={Object.assign({}, config, { imagePositionSM: ABOVE, showHeadlineSM: false})}
        resizedImageOptions={{ '400x267': '' }}
      />,
    );

    expect(wrapper.find('h2.sm-promo-headline').length).toBe(0);
    expect(wrapper.find('article > .vertical').length).toBe(1);
  });

  it('must render only title if showImageSM false in vertical layout', () => {
    const imageURL = 'pic';
    const itemTitle = 'title';
    const primaryFont = 'arial';
    const id = 'test';
    const { default: SmallListItem } = require('./small-list-item');

    const wrapper = mount(
      <SmallListItem
        imageURL={imageURL}
        itemTitle={itemTitle}
        primaryFont={primaryFont}
        id={id}
        /* eslint-disable-next-line */
        customFields={Object.assign({}, config, { imagePositionSM: BELOW, showImageSM: false})}
        resizedImageOptions={{ '400x267': '' }}
      />,
    );

    expect(wrapper.find('h2.sm-promo-headline').length).toBe(1);
    expect(wrapper.find('h2.sm-promo-headline').text()).toBe(itemTitle);
    expect(wrapper.find('Image').length).toBe(0);
    expect(wrapper.find('article > .vertical').length).toBe(1);
  });

  it('must render only title if showImageSM false in vertical layout with bottom border', () => {
    const imageURL = 'pic';
    const itemTitle = 'title';
    const primaryFont = 'arial';
    const id = 'test';
    const { default: SmallListItem } = require('./small-list-item');

    const wrapper = mount(
      <SmallListItem
        imageURL={imageURL}
        itemTitle={itemTitle}
        primaryFont={primaryFont}
        id={id}
        /* eslint-disable-next-line */
        customFields={Object.assign({}, config, { imagePositionSM: BELOW, showImageSM: false, showBottomBorderSM: true})}
        resizedImageOptions={{ '400x267': '' }}
      />,
    );

    expect(wrapper.find('h2.sm-promo-headline').length).toBe(1);
    expect(wrapper.find('h2.sm-promo-headline').text()).toBe(itemTitle);
    expect(wrapper.find('Image').length).toBe(0);
    expect(wrapper.find('article > .vertical').length).toBe(1);
    expect(wrapper.find('hr').length).toBe(1);
    expect(wrapper.find('hr').hasClass('hr-borderless')).toBe(false);
  });

  it('must render only title if showImageSM false in vertical layout without bottom border', () => {
    const imageURL = 'pic';
    const itemTitle = 'title';
    const primaryFont = 'arial';
    const id = 'test';
    const { default: SmallListItem } = require('./small-list-item');

    const wrapper = mount(
      <SmallListItem
        imageURL={imageURL}
        itemTitle={itemTitle}
        primaryFont={primaryFont}
        id={id}
        /* eslint-disable-next-line */
        customFields={Object.assign({}, config, { imagePositionSM: BELOW, showImageSM: false, showBottomBorderSM: false})}
        resizedImageOptions={{ '400x267': '' }}
      />,
    );

    expect(wrapper.find('h2.sm-promo-headline').length).toBe(1);
    expect(wrapper.find('h2.sm-promo-headline').text()).toBe(itemTitle);
    expect(wrapper.find('Image').length).toBe(0);
    expect(wrapper.find('article > .vertical').length).toBe(1);
    expect(wrapper.find('hr').hasClass('hr-borderless')).toBe(true);
  });
});
