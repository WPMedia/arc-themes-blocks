import React from 'react';
import { mount } from 'enzyme';
import SingleChain from './default';

describe('single chain', () => {
  describe('when it is first rendered', () => {
    it('should render a p tag when p tag is the child', () => {
      const testText = 'one chainz';

      const wrapper = mount(
        <SingleChain>
          <p>{testText}</p>
        </SingleChain>,
      );

      expect(wrapper.html()).toMatchInlineSnapshot(
        '"<div class=\\"sc-EHOje fUQYKv\\"><p>one chainz</p></div>"',
      );
    });
    it('should render null when null is the child', () => {
      const wrapper = mount(<SingleChain>{null}</SingleChain>);

      expect(wrapper.text()).toBe('');
      expect(wrapper.html()).toBe(null);
    });
    it('should render null when no child', () => {
      const wrapper = mount(<SingleChain />);

      expect(wrapper.text()).toBe('');
      expect(wrapper.html()).toBe(null);
    });
  });
});
