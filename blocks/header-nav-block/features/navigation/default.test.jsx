import React from 'react';
import { shallow } from 'enzyme';
import getThemeStyle from 'fusion:themes';
import Navigation from './default';

jest.mock('fusion:themes', () => (jest.fn(() => ({}))));

describe('the header navigation feature for the default output type', () => {
  it('should be a nav element', () => {
    const wrapper = shallow(<Navigation />);

    expect(wrapper.at(0).type()).toBe('nav');
  });

  it('should contain two buttons', () => {
    const wrapper = shallow(<Navigation />);

    expect(wrapper.find('nav > button')).toHaveLength(2);
  });

  it('should contain a logo image', () => {
    const wrapper = shallow(<Navigation />);

    expect(wrapper.find('nav > img')).toHaveLength(1);
  });

  describe('the search button', () => {
    it('should have an image that imports the search icon', () => {
      const wrapper = shallow(<Navigation />);

      expect(wrapper.find('nav > button.nav-search > img')).toHaveProp('src', 'search.svg');
    });

    it('should have the default alt text', () => {
      const wrapper = shallow(<Navigation />);

      expect(wrapper.find('nav > button.nav-search > img')).toHaveProp('alt', 'Navigation bar search');
    });
  });

  describe('the sections button', () => {
    it('should contain a span with "Sections" text', () => {
      const wrapper = shallow(<Navigation />);

      expect(wrapper.find('nav > button.nav-sections > span')).toHaveText('Sections');
    });

    it('should contain a image that imports the hamburger icon', () => {
      const wrapper = shallow(<Navigation />);

      expect(wrapper.find('nav > button.nav-sections > img')).toHaveProp('src', 'hamburger.svg');
    });
  });

  describe('the navigation bar image/logo', () => {
    describe('when the theme manifest provides a logo url', () => {
      it('should make the src of the logo the provided image', () => {
        getThemeStyle.mockImplementation(() => ({ primaryLogo: 'my-nav-logo.svg' }));
        const wrapper = shallow(<Navigation />);

        expect(wrapper.find('nav > img')).toHaveProp('src', 'my-nav-logo.svg');
      });
    });

    describe('when the theme does not provide a logo url', () => {
      it('should make the src of the logo the placeholder image', () => {
        getThemeStyle.mockImplementation(() => ({}));
        const wrapper = shallow(<Navigation />);

        expect(wrapper.find('nav > img')).toHaveProp('src', 'arc-placeholder-logo.svg');
      });
    });

    describe('when the theme manifest provides alt text', () => {
      it('should make the alt text of the logo the provided text', () => {
        getThemeStyle.mockImplementation(() => ({ primaryLogoAlt: 'my alt text' }));
        const wrapper = shallow(<Navigation />);

        expect(wrapper.find('nav > img')).toHaveProp('alt', 'my alt text');
      });
    });

    describe('when the theme manifest does not provide alt text', () => {
      it('should make the alt text of the logo the default text', () => {
        getThemeStyle.mockImplementation(() => ({}));
        const wrapper = shallow(<Navigation />);

        expect(wrapper.find('nav > img')).toHaveProp('alt', 'Navigation bar logo');
      });
    });
  });
});
