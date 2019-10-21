import React from 'react';
import { shallow } from 'enzyme';
import getThemeStyle from 'fusion:themes';
import { useComponentContext } from 'fusion:context';
import SubHeadline from './default';

jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
jest.mock('fusion:context', () => ({
  useComponentContext: jest.fn(() => ({
    globalContent: {
      subheadlines: {
        basic: 'subheadline for our story',
      },
    },
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
  });

  describe('when subheadline content from globalContent is NOT present', () => {
    beforeEach(() => {
      useComponentContext.mockImplementation(() => ({}));
    });

    it('should render nothing', () => {
      const wrapper = shallow(<SubHeadline />);

      expect(wrapper).toBeEmptyRender();
    });
  });
});
