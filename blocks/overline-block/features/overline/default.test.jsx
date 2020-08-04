import React from 'react';
import { shallow, mount } from 'enzyme';
import { useFusionContext } from 'fusion:context';
import Overline from './default';

const mockContextObj = {
  arcSite: 'site',
  globalContent: {
    websites: {
      site: {
        website_section: {
          _id: '/news',
          name: 'News',
        },
      },
    },
  },
};

jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => mockContextObj),
}));

jest.mock('fusion:content', () => ({
  useEditableContent: jest.fn(() => ({
    editableContent: {},
  })),
}));

describe('overline feature for default output type', () => {
  describe('when website_section content from globalContent is present', () => {
    it('should render an a', () => {
      const wrapper = mount(<Overline />);

      expect(wrapper.find('a')).toHaveClassName('overline');
    });

    it('should dangerously set the inner HTML to the website_section content', () => {
      const wrapper = shallow(<Overline />);

      expect(wrapper.text()).toMatch('News');
    });

    it('should set a styled component class on the rendered a', () => {
      const wrapper = mount(<Overline />);

      expect(wrapper.find('a').hasClass(/sc-/)).toBe(true);
    });

    it('should have the href of the website_section _id', () => {
      const wrapper = shallow(<Overline />);

      expect(wrapper.at(0).prop('href')).toStrictEqual('/news/');
    });
  });

  describe('when label content from globalContent is present', () => {
    describe('when label.basic.display is true', () => {
      beforeEach(() => {
        const labelObj = {
          label: { basic: { display: true, text: 'EXCLUSIVE', url: '/exclusive' } },
        };
        const contextObjWithLabel = {
          ...mockContextObj,
          globalContent: {
            ...labelObj,
            ...mockContextObj.globalContent,
          },
        };
        useFusionContext.mockImplementation(() => contextObjWithLabel);
      });

      it('should display the label name instead of the website section name', () => {
        const wrapper = shallow(<Overline />);

        expect(wrapper.text()).toMatch('EXCLUSIVE');
      });

      it('should render the href of the label instead of the website section', () => {
        const wrapper = shallow(<Overline />);

        expect(wrapper.at(0).prop('href')).toStrictEqual('/exclusive/');
      });
    });

    describe('when label.basic.url is missing', () => {
      beforeEach(() => {
        const labelObj = {
          label: { basic: { display: true, text: 'EXCLUSIVE' } },
        };
        const contextObjWithLabel = {
          ...mockContextObj,
          globalContent: {
            ...labelObj,
            ...mockContextObj.globalContent,
          },
        };
        useFusionContext.mockImplementation(() => contextObjWithLabel);
      });

      it('should display the label name instead of the website section name', () => {
        const wrapper = shallow(<Overline />);

        expect(wrapper.text()).toMatch('EXCLUSIVE');
      });

      it('should render as text', () => {
        const wrapper = shallow(<Overline />);

        expect(wrapper.at(0).prop('className')).toEqual('overline');
        expect(wrapper.at(0).prop('href')).toBeFalsy();
      });
    });

    describe('when label.basic.url is empty', () => {
      beforeEach(() => {
        const labelObj = {
          label: { basic: { display: true, text: 'EXCLUSIVE', url: '' } },
        };
        const contextObjWithLabel = {
          ...mockContextObj,
          globalContent: {
            ...labelObj,
            ...mockContextObj.globalContent,
          },
        };
        useFusionContext.mockImplementation(() => contextObjWithLabel);
      });

      it('should display the label name instead of the website section name', () => {
        const wrapper = shallow(<Overline />);
        expect(wrapper.text()).toMatch('EXCLUSIVE');
      });

      it('should render as text', () => {
        const wrapper = shallow(<Overline />);

        expect(wrapper.at(0).prop('className')).toEqual('overline');
        expect(wrapper.at(0).prop('href')).toBeFalsy();
      });
    });

    describe('when label.basic.display is NOT true', () => {
      beforeEach(() => {
        const labelObj = {
          label: { basic: { display: false, text: 'EXCLUSIVE', url: '/exclusive/' } },
        };
        const contextObjWithLabel = {

          ...mockContextObj,
          globalContent: {
            ...labelObj,
            ...mockContextObj.globalContent,
          },
        };
        useFusionContext.mockImplementation(() => contextObjWithLabel);
      });

      it('should dangerously set the inner HTML to the website_section content', () => {
        const wrapper = shallow(<Overline />);

        expect(wrapper.text()).toMatch('News');
      });

      it('should have the href of the website_section _id', () => {
        const wrapper = shallow(<Overline />);

        expect(wrapper.at(0).prop('href')).toStrictEqual('/news/');
      });
    });
  });

  describe('when headline content from globalContent is NOT present', () => {
    beforeEach(() => {
      useFusionContext.mockImplementation(() => ({}));
    });

    it('should not render anything', () => {
      const wrapper = mount(<Overline />);

      expect(wrapper).toBeEmptyRender();
    });
  });

  describe('when a link is rendered', () => {
    it('should not add a slash at the end of the link if already has one', () => {
      const mockTrailingSlash = {
        arcSite: 'site',
        globalContent: {
          websites: {
            site: {
              website_section: {
                _id: '/test/',
                name: 'Test',
              },
            },
          },
        },
      };
      useFusionContext.mockImplementation(() => mockTrailingSlash);
      const wrapper = shallow(<Overline />);

      expect(wrapper.at(0).prop('href')).toStrictEqual('/test/');
    });

    it('should add a slash at the end of the link', () => {
      const mockTrailingSlash = {
        arcSite: 'site',
        globalContent: {
          websites: {
            site: {
              website_section: {
                _id: '/test',
                name: 'Test',
              },
            },
          },
        },
      };
      useFusionContext.mockImplementation(() => mockTrailingSlash);
      const wrapper = shallow(<Overline />);

      expect(wrapper.at(0).prop('href')).toStrictEqual('/test/');
    });

    it('should not add a slash at the end of the link with query params', () => {
      const mockTrailingSlash = {
        arcSite: 'site',
        globalContent: {
          websites: {
            site: {
              website_section: {
                _id: '/test?query=a',
                name: 'Test',
              },
            },
          },
        },
      };
      useFusionContext.mockImplementation(() => mockTrailingSlash);
      const wrapper = shallow(<Overline />);

      expect(wrapper.at(0).prop('href')).toStrictEqual('/test?query=a');
    });

    it('should not add a slash at the end of the link with hash params', () => {
      const mockTrailingSlash = {
        arcSite: 'site',
        globalContent: {
          websites: {
            site: {
              website_section: {
                _id: '/test/page#section',
                name: 'Test',
              },
            },
          },
        },
      };
      useFusionContext.mockImplementation(() => mockTrailingSlash);
      const wrapper = shallow(<Overline />);

      expect(wrapper.at(0).prop('href')).toStrictEqual('/test/page#section');
    });
  });
});
