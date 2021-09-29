import React from 'react';
import { mount, shallow } from 'enzyme';
import SearchBox from './search-box';

const fakeEvent = { preventDefault: () => {} };

describe('the SearchBox component', () => {
  it('should render a search button', () => {
    const wrapper = shallow(<SearchBox />);

    expect(wrapper.find('.nav-block-search button')).toHaveLength(1);
  });

  it('should *not* have a class of .open on the .nav-block-search by default', () => {
    const wrapper = shallow(<SearchBox />);

    expect(wrapper.find('.nav-block-search')).not.toHaveClassName('open');
  });

  describe('when the search button is clicked', () => {
    it('should add .open class to .nav-block-search', () => {
      const wrapper = shallow(<SearchBox />);

      wrapper.find('.nav-block-search button').simulate('mousedown', fakeEvent); // need to use mousedown instead of click to prevent race condition

      expect(wrapper.find('.nav-block-search')).toHaveClassName('open');
    });
    it('should run the customSearchAction when not not null', () => {
      const customSearchAction = () => {
        document.body.classList.add('has-custom-search-action');
      };
      const wrapper = shallow(<SearchBox customSearchAction={customSearchAction} />);

      wrapper.find('.nav-block-search button').simulate('mousedown', fakeEvent); // need to use mousedown instead of click to prevent race condition

      expect(document.body.classList.contains('has-custom-search-action'));
    });
    it('should have a disabled button initially on click', () => {
      const wrapper = mount(<SearchBox />);

      wrapper.find('.nav-block-search button').simulate('mousedown', fakeEvent); // need to use mousedown instead of click to prevent race condition

      expect(wrapper.find('.nav-block-search > .nav-btn').prop('disabled')).toBe(true);
    });
  });

  describe('when .nav-block-search is open', () => {
    it('should focus on the input element', () => {
      const wrapper = mount(<SearchBox />);
      expect(wrapper.find('input').getElement() === document.activeElement);
    });

    it('should not have a disabled button', () => {
      const wrapper = mount(<SearchBox />);

      expect(wrapper.find('.nav-block-search > .nav-btn').prop('disabled')).toBe(false);
    });

    describe('when input loses focus', () => {
      it('should remove the .open class from .nav-block-search', () => {
        const wrapper = shallow(<SearchBox />);

        wrapper.find('.nav-block-search button').simulate('mousedown', fakeEvent);
        expect(wrapper.find('.nav-block-search')).toHaveClassName('open');

        wrapper.find('.nav-block-search input').simulate('blur', fakeEvent);
        expect(wrapper.find('.nav-block-search')).not.toHaveClassName('open');
      });
    });

    describe('when alwaysOpen prop is true', () => {
      it('should add .open class to .nav-block-search', () => {
        const wrapper = shallow(<SearchBox alwaysOpen />);

        wrapper.find('.nav-block-search button').simulate('mousedown', fakeEvent);
        expect(wrapper.find('.nav-block-search')).toHaveClassName('open');
      });
    });
  });

  describe('when alwaysOpen prop is true', () => {
    it('should add .open class to .nav-block-search', () => {
      const wrapper = shallow(<SearchBox alwaysOpen />);

      expect(wrapper.find('.nav-block-search')).toHaveClassName('open');
    });
  });
});
