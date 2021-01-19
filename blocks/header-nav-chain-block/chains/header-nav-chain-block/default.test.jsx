import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import getProperties from 'fusion:properties';
import getThemeStyle from 'fusion:themes';
import Navigation from './default';
import SearchBox from './_children/search-box';
import { DEFAULT_SELECTIONS } from './nav-helper';

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
  describe('horizontal links bar', () => {
    it('should render horizontal links when "logoAlignment" is "left"', () => {
      const cFields = {
        ...DEFAULT_SELECTIONS,
        logoAlignment: 'left',
        horizontalLinksHierarchy: 'default',
      };
      const wrapper = mount(<Navigation customFields={cFields} />);
      const navBar = wrapper.find('.news-theme-navigation-bar');
      expect(navBar.hasClass('horizontal-links')).toBe(true);
      expect(navBar.hasClass('logo-left')).toBe(true);
      const linksBar = navBar.find('HorizontalLinksBar');
      expect(linksBar).toHaveLength(1);
      expect(linksBar.prop('hierarchy')).toEqual(cFields.horizontalLinksHierarchy);
    });

    it('should not render horizontal links when "logoAlignment" is "center"', () => {
      const cFields = {
        ...DEFAULT_SELECTIONS,
        logoAlignment: 'center',
        horizontalLinksHierarchy: 'default',
      };
      const wrapper = mount(<Navigation customFields={cFields} />);
      const navBar = wrapper.find('.news-theme-navigation-bar');
      expect(navBar.hasClass('horizontal-links')).toBe(false);
      expect(navBar.hasClass('logo-center')).toBe(true);
      expect(navBar.find('HorizontalLinksBar')).toHaveLength(0);
    });
  });

  describe('navigation bar widgets/buttons', () => {
    describe('nav-bar default configuration', () => {
      it('should render search and sections menu in the top-left navbar on desktop', () => {
        const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
        const navLeftDesktop = wrapper.find('.nav-left > .nav-components--desktop');
        expect(navLeftDesktop).toHaveLength(1);
        const searchWidget = navLeftDesktop.find('.nav-search');
        expect(searchWidget).toHaveLength(1);
        const menuWidget = navLeftDesktop.find('.nav-sections-btn');
        expect(menuWidget).toHaveLength(1);
      });

      it('should render sections menu in the top-left navbar on mobile', () => {
        const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
        const navLeftDesktop = wrapper.find('.nav-left > .nav-components--mobile');
        expect(navLeftDesktop).toHaveLength(1);
        const menuWidget = navLeftDesktop.find('.nav-sections-btn');
        expect(menuWidget).toHaveLength(1);
      });

      it('should render nothing inside the .nav-right on desktop', () => {
        const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
        const widgetList = wrapper.find('.nav-right > .nav-components--desktop > WidgetList');
        expect(widgetList).toHaveLength(1);
        expect(widgetList.children()).toHaveLength(0);
      });

      it('should render nothing inside the .nav-right on mobile', () => {
        const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
        const widgetList = wrapper.find('.nav-right > .nav-components--mobile > WidgetList');
        expect(widgetList).toHaveLength(1);
        expect(widgetList.children()).toHaveLength(0);
      });
    });

    // The 'signInOrder' custom field is deprecated but still necessary for compatibility
    describe('when the signInOrder customField is set', () => {
      describe('when no child component exists at the signInOrder index', () => {
        it('should render nothing inside the .nav-right', () => {
          const wrapper = mount(
            <Navigation customFields={{ ...DEFAULT_SELECTIONS, signInOrder: 2 }}>
              {[<button key={1} type="button">Sign In</button>]}
            </Navigation>,
          );
          const widgetListMobile = wrapper.find('.nav-right > .nav-components--mobile > WidgetList');
          const widgetListDesktop = wrapper.find('.nav-right > .nav-components--desktop > WidgetList');
          expect(widgetListMobile).toHaveLength(1);
          expect(widgetListDesktop).toHaveLength(1);
          expect(widgetListMobile.children()).toHaveLength(0);
          expect(widgetListDesktop.children()).toHaveLength(0);
        });
      });

      describe('when a child component exists at the signInOrder index', () => {
        it('should render the child component inside the .nav-right', () => {
          const wrapper = mount(
            <Navigation customFields={{ signInOrder: 1 }}>
              {[<button key={1} type="button">Sign In</button>]}
            </Navigation>,
          );
          const navRight = wrapper.find('.nav-right');
          expect(navRight.children()).toHaveLength(1);
          expect(navRight.find('button')).toHaveText('Sign In');
        });
      });
    });
  });

  describe('sections menu widgets/buttons', () => {
    describe('sections menu default configuration', () => {
      it('should render a search widget in the sections menu on mobile', () => {
        const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
        const container = wrapper.find('#nav-sections .nav-menu');
        expect(container.find('.nav-components--mobile').find(SearchBox)).toHaveLength(1);
      });

      it('should render nothing in the sections menu on desktop', () => {
        const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
        const container = wrapper.find('#nav-sections .nav-menu');
        const widgetList = container.find('.nav-components--desktop > WidgetList');
        expect(widgetList).toHaveLength(1);
        expect(widgetList.children()).toHaveLength(0);
      });
    });

    describe('sections menu custom configuration', () => {
      const testSectionMenuWidget = (customFields, breakpoint) => {
        const TestComponent = jest.fn(() => <div id="test-component" />);
        const wrapper = mount(
          <Navigation customFields={customFields}>
            <TestComponent />
          </Navigation>,
        );
        const container = wrapper.find('#nav-sections .nav-menu');
        const widgetList = container.find(`.nav-components--${breakpoint} > WidgetList`);
        expect(widgetList).toHaveLength(1);
        return widgetList.find('NavWidget');
      };

      it('should render custom widget on mobile', () => {
        const CUSTOM_SELECTIONS = {
          ...DEFAULT_SELECTIONS,
          menuComponentMobile1: 'custom',
          menuComponentCustomIndexMobile1: 1,
        };
        const navWidget = testSectionMenuWidget(CUSTOM_SELECTIONS, 'mobile');
        expect(navWidget).toHaveLength(1);
        expect(navWidget.prop('type')).toEqual('custom');
        expect(navWidget.prop('position')).toEqual(1);
        expect(navWidget.prop('placement')).toEqual('section-menu');
      });
      it('should render custom widget on desktop', () => {
        const CUSTOM_SELECTIONS = {
          ...DEFAULT_SELECTIONS,
          menuComponentDesktop1: 'custom',
          menuComponentCustomIndexDesktop1: 1,
        };
        const navWidget = testSectionMenuWidget(CUSTOM_SELECTIONS, 'desktop');
        expect(navWidget).toHaveLength(1);
        expect(navWidget.prop('type')).toEqual('custom');
        expect(navWidget.prop('position')).toEqual(1);
        expect(navWidget.prop('placement')).toEqual('section-menu');
      });
      it('should render two widgets on mobile', () => {
        const CUSTOM_SELECTIONS = {
          ...DEFAULT_SELECTIONS,
          menuComponentMobile1: 'search',
          menuComponentMobile2: 'custom',
          menuComponentCustomIndexMobile2: 1,
        };
        const navWidgets = testSectionMenuWidget(CUSTOM_SELECTIONS, 'mobile');
        expect(navWidgets).toHaveLength(2);
        expect(navWidgets.at(0).prop('type')).toEqual('search');
        expect(navWidgets.at(0).prop('placement')).toEqual('section-menu');
        expect(navWidgets.at(1).prop('type')).toEqual('custom');
        expect(navWidgets.at(1).prop('position')).toEqual(1);
        expect(navWidgets.at(1).prop('placement')).toEqual('section-menu');
      });
      it('should render two widgets on desktop', () => {
        const CUSTOM_SELECTIONS = {
          ...DEFAULT_SELECTIONS,
          menuComponentDesktop1: 'custom',
          menuComponentCustomIndexDesktop1: 1,
          menuComponentDesktop2: 'search',
        };
        const navWidgets = testSectionMenuWidget(CUSTOM_SELECTIONS, 'desktop');
        expect(navWidgets).toHaveLength(2);
        expect(navWidgets.at(0).prop('type')).toEqual('custom');
        expect(navWidgets.at(0).prop('position')).toEqual(1);
        expect(navWidgets.at(0).prop('placement')).toEqual('section-menu');
        expect(navWidgets.at(1).prop('type')).toEqual('search');
        expect(navWidgets.at(1).prop('placement')).toEqual('section-menu');
      });
    });
  });

  describe('the navigation bar logo auto hide/show behavior', () => {
    describe('when the page has a masthead-block', () => {
      it('should hide the logo on the initial render', () => {
        getProperties.mockImplementation(() => ({}));
        const wrapper = mount(
          <>
            <Navigation customFields={DEFAULT_SELECTIONS} />
            <div className="masthead-block-container" />
          </>,
        );

        expect(wrapper.find('.nav-logo.nav-logo-hidden').length).toBe(1);
      });

      it('should show the logo after 1 second if there is not a masthead', () => {
        jest.useFakeTimers();
        getProperties.mockImplementation(() => ({}));
        const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
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
        const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
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
        const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
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

        const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
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
        const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
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
        const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
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
  describe('nav color scheme', () => {
    describe('when the nav color is set to "dark"', () => {
      it('should set the "dark" class on the component', () => {
        getProperties.mockImplementation(() => ({ navColor: 'dark' }));
        const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
        expect(wrapper.find('#main-nav')).toHaveClassName('dark');
      });

      it('should set all buttons to use the light color scheme', () => {
        getProperties.mockImplementation(() => ({ navColor: 'dark' }));
        const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
        expect(wrapper.find('.nav-btn.nav-sections-btn').every('.nav-btn-dark')).toEqual(true);
      });

      it('should pass the navColor to the SearchBox', () => {
        getProperties.mockImplementation(() => ({ navColor: 'dark' }));
        const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
        expect(wrapper.find(SearchBox).first()).toHaveProp('navBarColor', 'dark');
      });
    });

    describe('when the nav color is set to "light"', () => {
      it('should set the "light" class on the component', () => {
        getProperties.mockImplementation(() => ({ navColor: 'light' }));
        const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
        expect(wrapper.find('#main-nav')).toHaveClassName('light');
      });
      it('should set all buttons to use the light color scheme', () => {
        getProperties.mockImplementation(() => ({ navColor: 'light' }));
        const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
        expect(wrapper.find('.nav-btn.nav-sections-btn').every('.nav-btn-light')).toEqual(true);
      });

      it('should pass the navColor to the SearchBox', () => {
        getProperties.mockImplementation(() => ({ navColor: 'light' }));
        const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
        expect(wrapper.find(SearchBox).first()).toHaveProp('navBarColor', 'light');
      });
    });
  });

  describe('hamburger menu', () => {
    it('opens and closes with the sections button', () => {
      const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
      expect(wrapper.find('div#nav-sections').hasClass('closed')).toBe(true);

      expect(wrapper.find('.nav-left > .nav-components--desktop .nav-sections-btn')).toHaveLength(1);

      wrapper.find('.nav-left > .nav-components--desktop .nav-sections-btn').simulate('click');
      expect(wrapper.find('div#nav-sections').hasClass('open')).toBe(true);

      wrapper.find('.nav-left > .nav-components--desktop .nav-sections-btn').simulate('click');
      expect(wrapper.find('div#nav-sections').hasClass('closed')).toBe(true);
    });

    it('open with section button, closes when click the container', () => {
      const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
      expect(wrapper.find('div#nav-sections').hasClass('closed')).toBe(true);

      wrapper.find('.nav-left > .nav-components--desktop .nav-sections-btn').simulate('click');
      expect(wrapper.find('div#nav-sections').hasClass('open')).toBe(true);

      wrapper.find('div#nav-sections').simulate('click', { target: { closest: () => false } });
      expect(wrapper.find('div#nav-sections').hasClass('closed')).toBe(true);
    });

    it('open with section button, must not close when inside the drawer', () => {
      const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
      expect(wrapper.find('div#nav-sections').hasClass('closed')).toBe(true);

      wrapper.find('.nav-left > .nav-components--desktop .nav-sections-btn').simulate('click');
      expect(wrapper.find('div#nav-sections').hasClass('open')).toBe(true);

      wrapper.find('div#nav-sections').simulate('click', { target: { closest: () => true } });
      expect(wrapper.find('div#nav-sections').hasClass('closed')).toBe(false);
    });
  });
  describe('primary color background color option', () => {
    it('if has navBarBackground as primary color, use primary color as background color', () => {
      getProperties.mockImplementation(() => ({ navColor: 'light', navBarBackground: 'primary-color' }));
      getThemeStyle.mockImplementation(() => ({ 'primary-color': '#1B6FA6' }));

      const wrapper = mount(<Navigation customFields={DEFAULT_SELECTIONS} />);
      expect(wrapper.find('StyledComponent').at(0).prop('navBarBackground')).toEqual('#1B6FA6');
    });
  });
});
