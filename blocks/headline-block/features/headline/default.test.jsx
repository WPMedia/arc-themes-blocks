const React = require('react');
const { shallow } = require('enzyme');

describe('the headline feature for the default output type', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('when headline content from globalContent is present', () => {
    beforeEach(() => {
      jest.mock('fusion:context', () => ({
        useComponentContext: jest.fn(() => ({
          globalContent: {
            headlines: {
              basic: 'headline for our story',
            },
          },
        })),
      }));
    });

    it('should render an h1', () => {
      const { default: Headline } = require('./default');
      const wrapper = shallow(<Headline />);

      expect(wrapper.at(0).type()).toBe('h1');
      expect(wrapper.at(0).hasClass('headline')).toBe(true);
    });

    it('should dangerously set the innerHTML to the headline content', () => {
      const { default: Headline } = require('./default');
      const wrapper = shallow(<Headline />);

      expect(wrapper.at(0).prop('dangerouslySetInnerHTML')).toStrictEqual({ __html: 'headline for our story' });
    });
  });

  describe('when headline content from globalContent is NOT present', () => {
    beforeEach(() => {
      jest.mock('fusion:context', () => ({
        useComponentContext: jest.fn(() => ({
          globalContent: {},
        })),
      }));
    });

    it('should render nothing', () => {
      const { default: Headline } = require('./default');
      const wrapper = shallow(<Headline />);

      expect(wrapper).toBeEmptyRender();
    });
  });
});
