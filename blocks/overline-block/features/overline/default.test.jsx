import React from 'react';
import { shallow, mount } from 'enzyme';
import { useFusionContext } from 'fusion:context';
import Overline from './default';

jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({
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
  })),
}));


describe('overline feature for default output type', () => {
  describe('when overline content from globalContent is present', () => {
    it('should render an a', () => {
      const wrapper = mount(<Overline />);

      expect(wrapper.find('a')).toHaveClassName('overline');
    });

    it('should dangerously set the inner HTML to the overline content', () => {
      const wrapper = shallow(<Overline />);

      expect(wrapper.text()).toMatch('News');
    });

    it('should set a styled component class on the rendered a', () => {
      const wrapper = mount(<Overline />);

      expect(wrapper.find('a').hasClass(/sc-/)).toBe(true);
    });

    it('should have a href', () => {
      const wrapper = shallow(<Overline />);

      expect(wrapper.at(0).prop('href')).toStrictEqual('/news');
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
});
