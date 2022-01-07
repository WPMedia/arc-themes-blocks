---
# helper funcs https://www.hygen.io/docs/templates/#helpers-and-inflections
to: blocks/<%= h.inflection.dasherize(block_name) %>-block/chains/<%= h.inflection.dasherize(block_name) %>/default.test.jsx
---
import <%= h.changeCase.pascal(block_name) %> from './default';

const React = require('react');
const { mount } = require('enzyme');

describe('<%= h.changeCase.title( block_name ) %>', () => {
  describe('when it is first rendered', () => {
    it('should render a p tag when p tag is the child', () => {
      const testText = '<%= h.changeCase.title( block_name ) %>';

      const wrapper = mount(
        <<%= h.changeCase.pascal(block_name) %>>
          <p>{testText}</p>
        </<%= h.changeCase.pascal(block_name) %>>,
      );

      expect(wrapper.text()).toBe(testText);
      expect(wrapper.find('HeadingSection').exists()).toBe(false);
      expect(wrapper.html()).toBe(`<p>${testText}</p>`);
    });

    it('should render null when null is the child', () => {
      const wrapper = mount(<<%= h.changeCase.pascal(block_name) %>>{null}</<%= h.changeCase.pascal(block_name) %>>);

      expect(wrapper.text()).toBe('');
      expect(wrapper.html()).toBe(null);
    });

    it('should render null when no child', () => {
      const wrapper = mount(<<%= h.changeCase.pascal(block_name) %> />);

      expect(wrapper.text()).toBe('');
      expect(wrapper.html()).toBe(null);
    });

    it('should render heading from custom field', () => {
      const wrapper = mount(<<%= h.changeCase.pascal(block_name) %> customFields={{ heading: '<%= h.changeCase.title( block_name ) %> Heading' }} />);

      expect(wrapper.find('Heading').text()).toBe('<%= h.changeCase.title( block_name ) %> Heading');
    });

    it('should render heading from custom field and children', () => {
      const wrapper = mount(
        <<%= h.changeCase.pascal(block_name) %> customFields={{ heading: '<%= h.changeCase.title( block_name ) %> Heading' }}>
          <p>Test</p>
        </<%= h.changeCase.pascal(block_name) %>>,
      );

      expect(wrapper.find('Heading').text()).toBe('<%= h.changeCase.title( block_name ) %> Heading');
      expect(wrapper.find('HeadingSection').exists()).toBe(true);
      expect(wrapper.find('p').text()).toBe('Test');
    });

    it('should not render heading from custom field and children', () => {
      const wrapper = mount(
        <<%= h.changeCase.pascal(block_name) %> customFields={{ heading: '' }}>
          <p>Test</p>
        </<%= h.changeCase.pascal(block_name) %>>,
      );

      expect(wrapper.find('Heading').exists()).toBe(false);
      expect(wrapper.find('HeadingSection').exists()).toBe(false);
      expect(wrapper.find('p').text()).toBe('Test');
    });
  });
});
