import React from 'react';
import { mount } from 'enzyme';

describe('the promo label', () => {
  beforeAll(() => {
    jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({ arcSite: 'the-sun' })),
    }));
    jest.mock('fusion:themes', () => (
      jest.fn(() => ({ 'primary-color': '#ff0000' }))
    ));
  });

  afterAll(() => {
    jest.resetModules();
  });

  it('should not render when the promo type is missing', () => {
    const { default: PromoLabel } = require('./promo_label');
    const wrapper = mount(<PromoLabel />);
    expect(wrapper.find('div.promo-label').length).toBe(0);
  });

  it('should not render when the promo type is "other"', () => {
    const { default: PromoLabel } = require('./promo_label');
    const wrapper = mount(<PromoLabel type="other" />);
    expect(wrapper.find('div.promo-label').length).toBe(0);
  });

  it('should render when type is "video"', () => {
    const { default: PromoLabel } = require('./promo_label');
    const wrapper = mount(<PromoLabel type="Video" />);
    expect(wrapper.find('div.promo-label').length).toBe(1);
    expect(wrapper.find('div.promo-label span').text()).toBe('Video');
  });

  it('should render when type is "gallery"', () => {
    const { default: PromoLabel } = require('./promo_label');
    const wrapper = mount(<PromoLabel type="Gallery" />);
    expect(wrapper.find('div.promo-label').length).toBe(1);
    expect(wrapper.find('div.promo-label span').text()).toBe('Gallery');
  });

  it('should be rendered using the color of the site', () => {
    const { default: PromoLabel } = require('./promo_label');
    const wrapper = mount(<PromoLabel type="Video" />);
    expect(wrapper.find('StyledComponent').at(0).prop('primaryColor')).toEqual('#ff0000');
    expect(wrapper.find('PlayIcon').length).toBe(1);
  });

  it('should render only the Play icon when the label is Video and size is "small"', () => {
    const { default: PromoLabel } = require('./promo_label');
    const wrapper = mount(<PromoLabel type="Video" size="small" />);
    expect(wrapper.find('div.promo-label').length).toBe(1);
    expect(wrapper.find('div.promo-label span').length).toBe(0);
    expect(wrapper.find('PlayIcon').length).toBe(1);
  });

  it('should render only the Camera icon when the label is Gallery and size is "small"', () => {
    const { default: PromoLabel } = require('./promo_label');
    const wrapper = mount(<PromoLabel type="Gallery" size="small" />);
    expect(wrapper.find('div.promo-label').length).toBe(1);
    expect(wrapper.find('div.promo-label span').length).toBe(0);
    expect(wrapper.find('CameraIcon').length).toBe(1);
  });

  it('should render small and using the color of the site when size is "small"', () => {
    const { default: PromoLabel } = require('./promo_label');
    const wrapper = mount(<PromoLabel type="Gallery" size="small" />);
    expect(wrapper.find('StyledComponent').at(0).prop('primaryColor')).toEqual('#ff0000');
    expect(wrapper.find('div.promo-label span').length).toBe(0);
    expect(wrapper.find('CameraIcon').length).toBe(1);
  });

  it('should not render an icon if label type is not recognized', () => {
    const { default: PromoLabel } = require('./promo_label');
    const wrapper = mount(<PromoLabel type="PromoType" />);
    expect(wrapper.find('div.promo-label').length).toBe(1);
    expect(wrapper.find('div.promo-label span').text()).toBe('PromoType');
    expect(wrapper.find('Icon').html()).toBeFalsy();
  });
});
