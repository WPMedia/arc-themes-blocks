const React = require('react');
const { mount, shallow } = require('enzyme');

jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
jest.mock('fusion:themes', () => (jest.fn(() => ({}))));

describe('the headline feature for the default output type', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('when headline content from globalContent is present', () => {
    it('should render an h1', () => {
      const data = {
        useFusionContext: {
          globalContent: {
            headlines: {
              basic: 'Headline Text',
            },
          },
        },
      };
      const { default: Headline } = require('./headline');
      const { useFusionContext } = require('fusion:context');
      useFusionContext.mockReturnValue({ arcSite: 'abc123' });
      const wrapper = mount(<Headline {...data} />);

      expect(wrapper.find('h1')).toHaveClassName('headline');
      // checking for styled component class
      expect(wrapper.find('h1').hasClass(/sc-/)).toBe(true);
    });

    it('should dangerously set the innerHTML to the headline content', () => {
      const data = {
        useFusionContext: {
          globalContent: {
            headlines: {
              basic: 'headline for our story',
            },
          },
        },
      };
      const { default: Headline } = require('./headline');
      const { useFusionContext } = require('fusion:context');
      useFusionContext.mockReturnValue({ arcSite: 'abc123' });
      const wrapper = mount(<Headline {...data} />);

      // text() shows any text within tag
      expect(wrapper.find('h1').text()).toStrictEqual('headline for our story');
    });
  });

  describe('when headline content from globalContent is NOT present', () => {
    it('should render nothing', () => {
      const data = {};
      const { default: Headline } = require('./headline');
      const { useFusionContext } = require('fusion:context');
      useFusionContext.mockReturnValue({ arcSite: 'abc123' });
      const wrapper = mount(<Headline {...data} />);

      expect(wrapper).toBeEmptyRender();
    });
  });
});
