import React from 'react';
import { mount } from 'enzyme';
import getProperties from 'fusion:properties';
import Navigation from './default';
import SearchBox from './_children/search-box';

jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
jest.mock('fusion:context', () => ({
  useAppContext: jest.fn(() => ({})),
}));
jest.mock('fusion:content', () => ({
  useContent: jest.fn(() => ({})),
}));

describe('the header navigation feature for the default output type', () => {
  it('should be a nav element with class .news-theme-navigation', () => {
    const wrapper = mount(<Navigation />);

    expect(wrapper.find('nav').hasClass('news-theme-navigation')).toBe(true);
  });

  it('should render a SearchBox component in the top navbar', () => {
    const wrapper = mount(<Navigation />);

    expect(wrapper.find('.nav-left').find(SearchBox)).toHaveLength(1);
  });

  it('should render a SearchBox component in the side navbar', () => {
    const wrapper = mount(<Navigation />);

    expect(wrapper.find('#nav-sections').find(SearchBox)).toHaveLength(1);
  });

  describe('when the showSignIn customField is set to true', () => {
    it('should render a Sign In button', () => {
      const wrapper = mount(<Navigation customFields={{ showSignIn: true }} />);

      expect(wrapper.find('.nav-right span')).toIncludeText('Sign In');
    });
  });

  describe('the navigation bar image/logo', () => {
    describe('when the theme manifest provides a logo url', () => {
      it('should make the src of the logo the provided image', () => {
        getProperties.mockImplementation(() => ({ primaryLogo: 'my-nav-logo.svg' }));
        const wrapper = mount(<Navigation />);

        expect(wrapper.find('div.nav-logo > a > img')).toHaveProp('src', 'my-nav-logo.svg');
      });

      it('should make the alt text of the logo the default text', () => {
        const wrapper = mount(<Navigation />);

        expect(wrapper.find('div.nav-logo > a > img')).toHaveProp('alt', 'Navigation bar logo');
      });

      describe('when the theme manifest provides alt text for the logo', () => {
        it('should make the alt text of the logo the provided text', () => {
          getProperties.mockImplementation(() => ({ primaryLogo: 'my-nav-logo.svg', primaryLogoAlt: 'My Nav Logo' }));
          const wrapper = mount(<Navigation />);

          expect(wrapper.find('div.nav-logo > a > img')).toHaveProp('alt', 'My Nav Logo');
        });
      });
    });

    describe('when the theme does not provide a logo url', () => {
      it('should render a default SVG', () => {
        getProperties.mockImplementation(() => ({}));
        const wrapper = mount(<Navigation />);

        expect(wrapper.find('div.nav-logo svg > title')).toIncludeText('Arc Publishing logo');
      });
    });
  });
});
