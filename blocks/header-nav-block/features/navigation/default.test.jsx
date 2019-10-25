import React from 'react';
import { mount } from 'enzyme';
import getProperties from 'fusion:properties';
import Navigation from './default';

jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
jest.mock('fusion:context', () => ({
  useAppContext: jest.fn(() => ({})),
}));

describe('the header navigation feature for the default output type', () => {
  it('should be a nav element', () => {
    const wrapper = mount(<Navigation />);

    expect(wrapper.find('nav').hasClass('news-theme-navigation')).toBe(true);
    expect(wrapper.find('nav').hasClass(/sc-/)).toBe(true);
  });

  it('should contain two buttons', () => {
    const wrapper = mount(<Navigation />);

    expect(wrapper.find('button')).toHaveLength(2);
    expect(wrapper.find('button.nav-search').hasClass(/sc-/)).toBe(true);
    expect(wrapper.find('button.nav-sections').hasClass(/sc-/)).toBe(true);
  });

  it('should contain a logo image', () => {
    const wrapper = mount(<Navigation />);

    expect(wrapper.find('nav > img')).toHaveLength(1);
  });

  describe('the search button', () => {
    it('should have an image that imports the search icon', () => {
      const wrapper = mount(<Navigation />);

      expect(wrapper.find('button.nav-search > img')).toHaveProp('src', 'search.svg');
    });

    it('should have the default alt text', () => {
      const wrapper = mount(<Navigation />);

      expect(wrapper.find('button.nav-search > img')).toHaveProp('alt', 'Navigation bar search');
    });
  });

  describe('the sections button', () => {
    it('should contain a span with "Sections" text', () => {
      const wrapper = mount(<Navigation />);

      expect(wrapper.find('button.nav-sections > span')).toHaveText('Sections');
    });

    it('should contain a image that imports the hamburger icon', () => {
      const wrapper = mount(<Navigation />);

      expect(wrapper.find('button.nav-sections > img')).toHaveProp('src', 'hamburger.svg');
    });
  });

  describe('the navigation bar image/logo', () => {
    describe('when the theme manifest provides a logo url', () => {
      it('should make the src of the logo the provided image', () => {
        getProperties.mockImplementation(() => ({ primaryLogo: 'my-nav-logo.svg' }));
        const wrapper = mount(<Navigation />);

        expect(wrapper.find('nav > img')).toHaveProp('src', 'my-nav-logo.svg');
      });
    });

    describe('when the theme does not provide a logo url', () => {
      it('should make the src of the logo the placeholder image', () => {
        getProperties.mockImplementation(() => ({}));
        const wrapper = mount(<Navigation />);

        expect(wrapper.find('nav > img')).toHaveProp('src', 'arc-placeholder-logo.svg');
      });
    });

    describe('when the theme manifest provides alt text', () => {
      it('should make the alt text of the logo the provided text', () => {
        getProperties.mockImplementation(() => ({ primaryLogoAlt: 'my alt text' }));
        const wrapper = mount(<Navigation />);

        expect(wrapper.find('nav > img')).toHaveProp('alt', 'my alt text');
      });
    });

    describe('when the theme manifest does not provide alt text', () => {
      it('should make the alt text of the logo the default text', () => {
        getProperties.mockImplementation(() => ({}));
        const wrapper = mount(<Navigation />);

        expect(wrapper.find('nav > img')).toHaveProp('alt', 'Navigation bar logo');
      });
    });
  });
});
