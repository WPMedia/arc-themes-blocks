import React from 'react';
import { mount, shallow } from 'enzyme';
import SearchBox from './search-box';

const fakeEvent = { preventDefault: () => {} };

describe('the SearchBox component', () => {
  it('should render a search button', () => {
    const wrapper = shallow(<SearchBox />);

    expect(wrapper.find('.nav-search button')).toHaveLength(1);
  });

  it('should *not* have a class of .open on the .nav-search by default', () => {
    const wrapper = shallow(<SearchBox />);

    expect(wrapper.find('.nav-search')).not.toHaveClassName('open');
  });

  describe('when the search button is clicked', () => {
    it('should add .open class to .nav-search', () => {
      const wrapper = shallow(<SearchBox />);

      wrapper.find('.nav-search button').simulate('mousedown', fakeEvent); // need to use mousedown instead of click to prevent race condition

      expect(wrapper.find('.nav-search')).toHaveClassName('open');
    });
  });

  describe('when .nav-search is open', () => {
    it('should focus on the input element', () => {
      const wrapper = mount(<SearchBox />);
      expect(wrapper.find('input').getElement() === document.activeElement);
    });

    describe('when input loses focus', () => {
      it('should remove the .open class from .nav-search', () => {
        const wrapper = shallow(<SearchBox />);

        wrapper.find('.nav-search button').simulate('mousedown', fakeEvent);
        expect(wrapper.find('.nav-search')).toHaveClassName('open');

        wrapper.find('.nav-search input').simulate('blur', fakeEvent);
        expect(wrapper.find('.nav-search')).not.toHaveClassName('open');
      });
    });

    describe('when alwaysOpen prop is true', () => {
      it('should add .open class to .nav-search', () => {
        const wrapper = shallow(<SearchBox alwaysOpen />);

        wrapper.find('.nav-search button').simulate('mousedown', fakeEvent);
        expect(wrapper.find('.nav-search')).toHaveClassName('open');
      });
    });
  });

  describe('when alwaysOpen prop is true', () => {
    it('should add .open class to .nav-search', () => {
      const wrapper = shallow(<SearchBox alwaysOpen />);

      expect(wrapper.find('.nav-search')).toHaveClassName('open');
    });
  });
});
