import React from 'react';
import { mount, shallow } from 'enzyme';
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
    const wrapper = shallow(<Navigation />);

    expect(wrapper.find('button')).toHaveLength(2);
  });

  it('should contain a logo image', () => {
    const wrapper = shallow(<Navigation />);

    expect(wrapper.find('div.logo > ArcLogo')).toHaveLength(1);
  });

  describe('the search button', () => {
    it('should use the SearchIcon component', () => {
      const wrapper = mount(<Navigation />);

      expect(wrapper.find('button.nav-search > SearchIcon')).toHaveLength(1);
    });

    it('should have the correct fill', () => {
      const wrapper = mount(<Navigation />);

      expect(wrapper.find('button.nav-search > SearchIcon')).toHaveProp('fill', 'white');
    });
  });

  describe('the navigation bar image/logo', () => {
    describe('when the theme manifest provides a logo url', () => {
      it('should make the src of the logo the provided image', () => {
        getProperties.mockImplementation(() => ({ primaryLogo: 'my-nav-logo.svg' }));
        const wrapper = mount(<Navigation />);

        expect(wrapper.find('div > img')).toHaveProp('src', 'my-nav-logo.svg');
      });


      describe('when the theme manifest provides alt text', () => {
        it('should make the alt text of the logo the provided text', () => {
          getProperties.mockImplementation(() => ({ primaryLogo: 'my-nav-logo.svg', primaryLogoAlt: 'my alt text' }));
          const wrapper = mount(<Navigation />);

          expect(wrapper.find('div > img')).toHaveProp('alt', 'my alt text');
        });
      });

      describe('when the theme manifest does not provide alt text', () => {
        it('should make the alt text of the logo the default text', () => {
          getProperties.mockImplementation(() => ({ primaryLogo: 'my-nav-logo.svg' }));
          const wrapper = mount(<Navigation />);

          expect(wrapper.find('div > img')).toHaveProp('alt', 'Navigation bar logo');
        });
      });
    });

    describe('when the theme does not provide a logo url', () => {
      it('should make the src of the logo the placeholder image', () => {
        getProperties.mockImplementation(() => ({}));
        const wrapper = shallow(<Navigation />);

        expect(wrapper.find('div.logo > ArcLogo')).toHaveLength(1);
      });
    });
  });
});
