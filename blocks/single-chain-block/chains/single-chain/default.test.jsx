import SingleChain from './default';

const React = require('react');
const { mount } = require('enzyme');

describe('single chain', () => {
  describe('when it is first rendered', () => {
    it('should render a p tag when p tag is the child', () => {
      const testText = 'one chainz';

      const wrapper = mount(
        <SingleChain>
          <p>{testText}</p>
        </SingleChain>,
      );

      expect(wrapper.text()).toBe(testText);
      expect(wrapper.find('HeadingSection').exists()).toBe(false);
      expect(wrapper.html()).toBe(`<p>${testText}</p>`);
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

    it('should render heading from custom field', () => {
      const wrapper = mount(<SingleChain customFields={{ heading: 'Single Chain Heading' }} />);

      expect(wrapper.find('Heading').text()).toBe('Single Chain Heading');
    });

    it('should render heading from custom field and children', () => {
      const wrapper = mount(
        <SingleChain customFields={{ heading: 'Single Chain Heading' }}>
          <p>Test</p>
        </SingleChain>,
      );

      expect(wrapper.find('Heading').text()).toBe('Single Chain Heading');
      expect(wrapper.find('HeadingSection').exists()).toBe(true);
      expect(wrapper.find('p').text()).toBe('Test');
    });

    it('should not render heading from custom field and children', () => {
      const wrapper = mount(
        <SingleChain customFields={{ heading: '' }}>
          <p>Test</p>
        </SingleChain>,
      );

      expect(wrapper.find('Heading').exists()).toBe(false);
      expect(wrapper.find('HeadingSection').exists()).toBe(false);
      expect(wrapper.find('p').text()).toBe('Test');
    });
  });
});
