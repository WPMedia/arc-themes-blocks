const React = require('react');
const { shallow } = require('enzyme');

describe('the headline feature for the default output type', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('when "includeHeadline" is set to true', () => {
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
        const wrapper = shallow(<Headline customFields={{ includeHeadline: true }} />);

        expect(wrapper.at(0).type()).toBe('h1');
        expect(wrapper.at(0).hasClass('headline')).toBe(true);
      });

      it('should dangerously set the innerHTML to the headline content', () => {
        const { default: Headline } = require('./default');
        const wrapper = shallow(<Headline customFields={{ includeHeadline: true }} />);

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
        const wrapper = shallow(<Headline customFields={{ includeHeadline: true }} />);

        expect(wrapper).toBeEmptyRender();
      });
    });
  });

  describe('when "includeHeadline" is set to false', () => {
    beforeEach(() => {
      jest.mock('fusion:context', () => ({
        useComponentContext: jest.fn(() => ({})),
      }));
    });

    it('should render nothing', () => {
      const { default: Headline } = require('./default');
      const wrapper = shallow(<Headline customFields={{ includeHeadline: false }} />);

      expect(wrapper).toBeEmptyRender();
    });
  });

  describe('when "includeHeadline" is not set', () => {
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

    it('should render nothing', () => {
      const { default: Headline } = require('./default');
      const wrapper = shallow(<Headline customFields={{}} />);

      expect(wrapper).not.toBeEmptyRender();
    });
  });
});
