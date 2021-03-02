import React from 'react';
import { shallow, mount } from 'enzyme';
import getThemeStyle from 'fusion:themes';
import { useFusionContext } from 'fusion:context';
import SubHeadline from './default';

jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({
    globalContent: {
      subheadlines: {
        basic: 'subheadline for our story',
      },
    },
    arcSite: 'not-real',
  })),
}));

describe('the subheadline feature for the default output type', () => {
  describe('when subheadline content from globalContent is present', () => {
    it('should render an h2', () => {
      const wrapper = shallow(<SubHeadline />);

      expect(wrapper.at(0).type().target).toBe('h2');
      expect(wrapper.at(0).hasClass('sub-headline')).toBe(true);
    });

    it('should set the primary font for the h2', () => {
      getThemeStyle.mockImplementation(() => ({ 'primary-font-family': 'Papyrus' }));
      const wrapper = shallow(<SubHeadline />);

      expect(wrapper.at(0)).toHaveProp('primaryFont', 'Papyrus');
    });

    it('should dangerously set the innerHTML to the subheadline content', () => {
      const wrapper = shallow(<SubHeadline />);

      expect(wrapper.at(0).prop('dangerouslySetInnerHTML')).toStrictEqual({ __html: 'subheadline for our story' });
    });

    it('should set a styled components class on the rendered h2', () => {
      const wrapper = mount(<SubHeadline />);

      expect(wrapper.find('h2').hasClass(/sc-/)).toBe(true);
    });
  });

  describe('when configure to use description from globalContent is present', () => {
    beforeEach(() => {
      useFusionContext.mockImplementation(() => ({
        globalContent: {
          description: {
            basic: 'description for our story',
          },
          subheadlines: {
            basic: 'subheadline for our story',
          },
        },
        customFields: {
          valueToDisplay: 'Description',
        },
        arcSite: 'not-real',
      }));
    });

    it('should dangerously set the innerHTML to the subheadline content using description.basic', () => {
      const wrapper = shallow(<SubHeadline />);
      expect(wrapper.at(0).prop('dangerouslySetInnerHTML')).toStrictEqual({ __html: 'description for our story' });
    });
  });

  describe('when configure to use subheadlines from globalContent is present', () => {
    beforeEach(() => {
      useFusionContext.mockImplementation(() => ({
        globalContent: {
          description: {
            basic: 'description for our story',
          },
          subheadlines: {
            basic: 'subheadline for our story',
          },
        },
        customFields: {
          valueToDisplay: 'Subheadline',
        },
        arcSite: 'not-real',
      }));
    });

    it('should dangerously set the innerHTML to the subheadline content using subheadlines.basic', () => {
      const wrapper = shallow(<SubHeadline />);
      expect(wrapper.at(0).prop('dangerouslySetInnerHTML')).toStrictEqual({ __html: 'subheadline for our story' });
    });
  });

  describe('when subheadline content from globalContent is NOT present', () => {
    beforeEach(() => {
      useFusionContext.mockImplementation(() => ({}));
    });

    it('should render nothing', () => {
      const wrapper = shallow(<SubHeadline />);

      expect(wrapper).toBeEmptyRender();
    });
  });
});
