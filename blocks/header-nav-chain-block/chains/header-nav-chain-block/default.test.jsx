import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, shallow } from 'enzyme';
import getProperties from 'fusion:properties';
import Navigation from './default';
import SearchBox from './_children/search-box';

jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({
    contextPath: 'pf',
    deployment: jest.fn(() => ({})).mockReturnValue('path/image.svg'),
  })),
}));
jest.mock('fusion:content', () => ({
  useContent: jest.fn(() => ({})),
}));

describe('the header navigation feature for the default output type', () => {
  it('should render a SearchBox component in the top navbar', () => {
    const wrapper = mount(<Navigation />);

    expect(wrapper.find('.nav-left').find(SearchBox)).toHaveLength(1);
  });

  it('should render a SearchBox component in the side navbar', () => {
    const wrapper = mount(<Navigation />);

    expect(wrapper.find('#nav-sections').find(SearchBox)).toHaveLength(1);
  });

  it('should render nothing inside the .nav-right', () => {
    const wrapper = mount(<Navigation />);

    expect(wrapper.find('.nav-right').children()).toHaveLength(0);
  });

  describe('when the signInOrder customField is set', () => {
    describe('when no child component exists at the signInOrder index', () => {
      it('should render nothing inside the .nav-right', () => {
        const wrapper = mount(
          <Navigation customFields={{ signInOrder: 2 }}>
            {[<button key={1} type="button">Sign In</button>]}
          </Navigation>,
        );

        expect(wrapper.find('.nav-right').children()).toHaveLength(0);
      });
    });

    describe('when a child component exists at the signInOrder index', () => {
      it('should render the child component inside the .nav-right', () => {
        const wrapper = mount(
          <Navigation customFields={{ signInOrder: 1 }}>
            {[<button key={1} type="button">Sign In</button>]}
          </Navigation>,
        );

        expect(wrapper.find('.nav-right').children()).toHaveLength(1);
        expect(wrapper.find('.nav-right > button')).toHaveText('Sign In');
      });
    });
  });

  describe('the navigation bar image/logo', () => {
    describe('when the theme manifest provides a logo url', () => {
      it('should make the src of the logo the provided image', () => {
        getProperties.mockImplementation(() => ({ primaryLogo: 'https://test.com/my-nav-logo.svg' }));
        const wrapper = mount(<Navigation />);

        expect(wrapper.find('div.nav-logo > a > img')).toHaveProp('src', 'https://test.com/my-nav-logo.svg');
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

      describe('when the provided logo is a relative url', () => {
        it('should create a url with a context path', () => {
          getProperties.mockImplementation(() => ({ primaryLogo: 'image.svg' }));
          const wrapper = mount(<Navigation />);
          expect(wrapper.find('div.nav-logo > a > img')).toHaveProp('src', 'path/image.svg');
        });
      });
    });

    describe('when the theme does not provide a logo url', () => {
      it('should not render a logo', () => {
        getProperties.mockImplementation(() => ({}));
        const wrapper = mount(<Navigation />);

        expect(wrapper.find('div.nav-logo > a > img').length).toBe(0);
      });
    });

    describe('when no "logoAlignment" custom field is provided to nav bar', () => {
      it('should default nav logo to "center-aligned" (direct child of the nav bar container)', () => {
        getProperties.mockImplementation(() => ({ primaryLogo: 'https://test.com/my-nav-logo.svg' }));
        const wrapper = mount(<Navigation />);
        expect(wrapper.props().customFields).not.toBeDefined();
        expect(wrapper.find('.news-theme-navigation-bar > div.nav-left > NavLogo > div.nav-logo')).toHaveLength(0);
        const navLogoEl = wrapper.find('.news-theme-navigation-bar > NavLogo > div.nav-logo');
        expect(navLogoEl).toHaveLength(1);
        expect(navLogoEl.hasClass('nav-logo-center')).toBe(true);
      });
    });

    describe('when the nav logo is center-aligned', () => {
      it('should render in nav bar (center-aligned)', () => {
        getProperties.mockImplementation(() => ({ primaryLogo: 'https://test.com/my-nav-logo.svg' }));
        const wrapper = mount(<Navigation customFields={{ logoAlignment: 'center' }} />);
        expect(wrapper.props().customFields.logoAlignment).toBeDefined();
        expect(wrapper.props().customFields.logoAlignment).toEqual('center');
        const navBarEl = wrapper.find('.news-theme-navigation-bar');
        expect(navBarEl.hasClass('logo-center')).toBe(true);
        const navLogoEl = navBarEl.find('NavLogo > div.nav-logo');
        expect(navLogoEl).toHaveLength(1);
        expect(navLogoEl.hasClass('nav-logo-center')).toBe(true);
      });
    });

    describe('when the nav logo is left-aligned', () => {
      it('should render in nav bar (left-aligned)', () => {
        getProperties.mockImplementation(() => ({ primaryLogo: 'https://test.com/my-nav-logo.svg' }));
        const wrapper = mount(<Navigation customFields={{ logoAlignment: 'left' }} />);
        expect(wrapper.props().customFields.logoAlignment).toBeDefined();
        expect(wrapper.props().customFields.logoAlignment).toEqual('left');
        const navBarEl = wrapper.find('.news-theme-navigation-bar');
        expect(navBarEl.hasClass('logo-left')).toBe(true);
        const navLogoEl = navBarEl.find('NavLogo > div.nav-logo');
        expect(navLogoEl).toHaveLength(1);
        expect(navLogoEl.hasClass('nav-logo-left')).toBe(true);
      });
    });

    describe('when the page has a masthead-block', () => {
      it('should hide the logo on the initial render', () => {
        getProperties.mockImplementation(() => ({}));
        const wrapper = mount(
          <>
            <Navigation />
            <div className="masthead-block-container" />
          </>,
        );

        expect(wrapper.find('.nav-logo.nav-logo-hidden').length).toBe(1);
      });

      it('should show the logo after 1 second if there is not a masthead', () => {
        jest.useFakeTimers();
        getProperties.mockImplementation(() => ({}));
        const wrapper = mount(<Navigation />);
        act(() => {
          jest.runAllTimers();
          wrapper.setProps({});
        });

        expect(wrapper.find('.nav-logo.nav-logo-show').length).toBe(1);
      });

      it('should show the logo after 1 second on mobile devices', () => {
        jest.useFakeTimers();
        // we need to fake medium breakpoint because jest can't spy on innerWidth yet
        getProperties.mockImplementation(() => ({
          breakpoints: { small: 0, medium: 1500, large: 2000 },
        }));
        const wrapper = mount(<Navigation />);
        act(() => {
          jest.runAllTimers();
          wrapper.setProps({});
        });

        expect(wrapper.find('.nav-logo.nav-logo-show').length).toBe(1);
      });

      it('should show the logo after 1 second if there is a masthead but no logo', () => {
        jest.useFakeTimers();
        getProperties.mockImplementation(() => ({}));
        const spy = jest.spyOn(document, 'querySelector').mockImplementation((selector) => (
          (selector === '.masthead-block-container .masthead-block-logo') ? undefined : {}
        ));
        const wrapper = mount(<Navigation />);
        act(() => {
          jest.runAllTimers();
          wrapper.setProps({});
        });

        expect(wrapper.find('.nav-logo.nav-logo-show').length).toBe(1);
        spy.mockRestore();
      });

      it('should not show the logo after 1 second if there is a masthead and logo', () => {
        jest.useFakeTimers();
        getProperties.mockImplementation(() => ({}));
        const spy = jest.spyOn(document, 'querySelector').mockImplementation((selector) => (
          (selector === '.masthead-block-container .masthead-block-logo') ? {} : undefined
        ));

        const wrapper = mount(<Navigation />);
        act(() => {
          jest.runAllTimers();
          wrapper.setProps({});
        });

        expect(wrapper.find('.nav-logo.nav-logo-hidden').length).toBe(1);
        spy.mockRestore();
      });

      it('should not setup scroll handlers when logo is enabled and masthead logo is missing', () => {
        getProperties.mockImplementation(() => ({}));
        let handlerSetup = false;
        const spy = jest.spyOn(window, 'addEventListener').mockImplementation((...args) => {
          if (args[0] === 'scroll') {
            handlerSetup = true;
          }
          return undefined;
        });
        const spy2 = jest.spyOn(document, 'querySelector').mockImplementation((selector) => (
          (selector === '.masthead-block-container .masthead-block-logo') ? undefined : { data: true }
        ));

        jest.useFakeTimers();
        const wrapper = mount(<Navigation />);
        act(() => {
          jest.runAllTimers();
          wrapper.setProps({});
        });

        expect(wrapper.find('.nav-logo.nav-logo-show').length).toBe(1);
        expect(handlerSetup).toBeFalsy();

        spy.mockRestore();
        spy2.mockRestore();
      });

      it('should setup scroll handlers, when enable logo', () => {
        let handlerSetup = false;
        const spy = jest.spyOn(window, 'addEventListener').mockImplementation((...args) => {
          if (args[0] === 'scroll') {
            handlerSetup = true;
          }
          return undefined;
        });
        const spy2 = jest.spyOn(document, 'querySelector').mockImplementation((selector) => (
          (selector === '.masthead-block-container .masthead-block-logo') ? { data: true } : undefined
        ));
        getProperties.mockImplementation(() => ({}));
        jest.useFakeTimers();
        const wrapper = mount(<Navigation />);
        act(() => {
          jest.runAllTimers();
          wrapper.setProps({});
        });

        expect(wrapper.find('.nav-logo.nav-logo-hidden').length).toBe(1);
        expect(handlerSetup).toBeTruthy();

        spy.mockRestore();
        spy2.mockRestore();
      });
    });
  });

  describe('when the nav color is set to "dark"', () => {
    it('should set the "dark" class on the component', () => {
      getProperties.mockImplementation(() => ({ navColor: 'dark' }));
      const wrapper = mount(<Navigation />);

      expect(wrapper.find('#main-nav')).toHaveClassName('dark');
    });

    it('should set all buttons to use the light color scheme', () => {
      getProperties.mockImplementation(() => ({ navColor: 'dark' }));
      const wrapper = mount(<Navigation />);

      expect(wrapper.find('.nav-btn.nav-sections-btn').every('.nav-btn-dark')).toEqual(true);
    });

    it('should pass the navColor to the SearchBox', () => {
      getProperties.mockImplementation(() => ({ navColor: 'dark' }));
      const wrapper = mount(<Navigation />);

      expect(wrapper.find(SearchBox).first()).toHaveProp('navBarColor', 'dark');
    });
  });

  describe('when the nav color is set to "light"', () => {
    it('should set the "light" class on the component', () => {
      getProperties.mockImplementation(() => ({ navColor: 'light' }));
      const wrapper = mount(<Navigation />);

      expect(wrapper.find('#main-nav')).toHaveClassName('light');
    });
    it('should set all buttons to use the light color scheme', () => {
      getProperties.mockImplementation(() => ({ navColor: 'light' }));
      const wrapper = mount(<Navigation />);

      expect(wrapper.find('.nav-btn.nav-sections-btn').every('.nav-btn-light')).toEqual(true);
    });

    it('should pass the navColor to the SearchBox', () => {
      getProperties.mockImplementation(() => ({ navColor: 'light' }));
      const wrapper = mount(<Navigation />);

      expect(wrapper.find(SearchBox).first()).toHaveProp('navBarColor', 'light');
    });
  });

  describe('hamburger menu', () => {
    it('opens and closes with the sections button', () => {
      const wrapper = shallow(<Navigation />);

      expect(wrapper.find('#nav-sections').hasClass('closed')).toBe(true);

      wrapper.find('.nav-left > .nav-btn').simulate('click');
      expect(wrapper.find('#nav-sections').hasClass('open')).toBe(true);

      wrapper.find('.nav-left > .nav-btn').simulate('click');
      expect(wrapper.find('#nav-sections').hasClass('closed')).toBe(true);
    });

    it('open with section button, closes when click the container', () => {
      const wrapper = shallow(<Navigation />);

      expect(wrapper.find('#nav-sections').hasClass('closed')).toBe(true);

      wrapper.find('.nav-left > .nav-btn').simulate('click');
      expect(wrapper.find('#nav-sections').hasClass('open')).toBe(true);

      wrapper.find('#nav-sections').simulate('click', { target: { closest: () => false } });
      expect(wrapper.find('#nav-sections').hasClass('closed')).toBe(true);
    });

    it('open with section button, must not close when inside the drawer', () => {
      const wrapper = shallow(<Navigation />);

      expect(wrapper.find('#nav-sections').hasClass('closed')).toBe(true);

      wrapper.find('.nav-left > .nav-btn').simulate('click');
      expect(wrapper.find('#nav-sections').hasClass('open')).toBe(true);

      wrapper.find('#nav-sections').simulate('click', { target: { closest: () => true } });
      expect(wrapper.find('#nav-sections').hasClass('closed')).toBe(false);
    });
  });
});
