const React = require('react');
const { shallow } = require('enzyme');

describe('the subheadline feature for the default output type', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('when subheadline content from globalContent is present', () => {
    beforeEach(() => {
      jest.mock('fusion:context', () => ({
        useComponentContext: jest.fn(() => ({
          globalContent: {
            subheadlines: {
              basic: 'subheadline for our story',
            },
          },
        })),
      }));
    });

    it('should render an h1', () => {
      const { default: SubHeadline } = require('./default');
      const wrapper = shallow(<SubHeadline customFields={{ includeSubHeadline: true }} />);

      expect(wrapper.at(0).type()).toBe('h2');
      expect(wrapper.at(0).hasClass('sub-headline')).toBe(true);
    });

    it('should dangerously set the innerHTML to the subheadline content', () => {
      const { default: SubHeadline } = require('./default');
      const wrapper = shallow(<SubHeadline customFields={{ includeSubHeadline: true }} />);

      expect(wrapper.at(0).prop('dangerouslySetInnerHTML')).toStrictEqual({ __html: 'subheadline for our story' });
    });
  });

  describe('when subheadline content from globalContent is NOT present', () => {
    beforeEach(() => {
      jest.mock('fusion:context', () => ({
        useComponentContext: jest.fn(() => ({
          globalContent: {},
        })),
      }));
    });

    it('should render nothing', () => {
      const { default: SubHeadline } = require('./default');
      const wrapper = shallow(<SubHeadline customFields={{ includeSubHeadline: true }} />);

      expect(wrapper).toBeEmptyRender();
    });
  });
});
