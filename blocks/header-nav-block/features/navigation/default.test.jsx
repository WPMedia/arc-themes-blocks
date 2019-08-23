const React = require('react');
const { shallow } = require('enzyme');

jest.mock('fusion:themes', () => ({}));

describe('the header navigation feature', () => {
  it('should be a nav element', () => {
    const { default: Navigation } = require('./default');
    const wrapper = shallow(<Navigation />);

    expect(wrapper.at(0).type()).toBe('nav');
  });

  it('should contain two buttons', () => {
    const { default: Navigation } = require('./default');
    const wrapper = shallow(<Navigation />);

    expect(wrapper.find('nav > button')).toHaveLength(2);
  });

  it('should contain a logo image', () => {
    const { default: Navigation } = require('./default');
    const wrapper = shallow(<Navigation />);

    expect(wrapper.find('nav > img')).toHaveLength(1);
  });

  describe('the search button', () => {
    it('should have an image that imports the search icon', () => {
      const { default: Navigation } = require('./default');
      const wrapper = shallow(<Navigation />);

      expect(wrapper.find('nav > button.nav-search > img')).toHaveProp('src', 'search.svg');
    });

    it('should have the default alt text', () => {
      const { default: Navigation } = require('./default');
      const wrapper = shallow(<Navigation />);

      expect(wrapper.find('nav > button.nav-search > img')).toHaveProp('alt', 'Navigation bar search');
    });
  });

  describe('the sections button', () => {
    it('should contain a span with "Sections" text', () => {
      const { default: Navigation } = require('./default');
      const wrapper = shallow(<Navigation />);

      expect(wrapper.find('nav > button.nav-sections > span')).toHaveText('Sections');
    });

    it('should contain a image that imports the hamburger icon', () => {
      const { default: Navigation } = require('./default');
      const wrapper = shallow(<Navigation />);

      expect(wrapper.find('nav > button.nav-sections > img')).toHaveProp('src', 'hamburger.svg');
    });
  });

  describe('the navigation bar image/logo', () => {
    describe('when the theme manifest provides a logo url', () => {
      it('should make the src of the logo the provided image', () => {
        jest.mock('fusion:themes', () => ({ navLogo: 'my-nav-logo.svg' }));
        const { default: Navigation } = require('./default');
        const wrapper = shallow(<Navigation />);

        expect(wrapper.find('nav > img')).toHaveProp('src', 'my-nav-logo.svg');
      });
    });

    describe('when the theme does not provide a logo ur', () => {
      it('should make the src of the logo the placeholder image', () => {
        jest.mock('fusion:themes', () => ({}));
        const { default: Navigation } = require('./default');
        const wrapper = shallow(<Navigation />);

        expect(wrapper.find('nav > img')).toHaveProp('src', 'arc-placeholder-logo.svg');
      });
    });

    describe('when the theme manifest provides alt text', () => {
      it('should make the alt text of the logo the provided text', () => {
        jest.mock('fusion:themes', () => ({ navLogoAlt: 'my alt text' }));
        const { default: Navigation } = require('./default');
        const wrapper = shallow(<Navigation />);

        expect(wrapper.find('nav > img')).toHaveProp('alt', 'my alt text');
      });
    });

    describe('when the theme manifest does not provide alt text', () => {
      it('should make the alt text of the logo the default text', () => {
        jest.mock('fusion:themes', () => ({}));
        const { default: Navigation } = require('./default');
        const wrapper = shallow(<Navigation />);

        expect(wrapper.find('nav > img')).toHaveProp('alt', 'Navigation bar logo');
      });
    });
  });
});
