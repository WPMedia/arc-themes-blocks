const React = require('react');
const { shallow } = require('enzyme');
const { default: Headline } = require('./default');

jest.mock('fusion:themes', () => ({ headline: 'my-theme-class-name' }));

describe('the headline feature', () => {
  describe('with a truthy headline prop', () => {
    it('should contain a single <h1>', () => {
      const wrapper = shallow(<Headline headline="testtesttest" />);

      expect(wrapper.at(0).type()).toBe('h1');
    });

    it('should have a className pulled in from themes', () => {
      const wrapper = shallow(<Headline headline="testtesttest" />);

      expect(wrapper.at(0)).toHaveClassName('my-theme-class-name');
    });

    it('should set the text with the headline prop', () => {
      const wrapper = shallow(<Headline headline="testtesttest" />);

      expect(wrapper.at(0)).toHaveText('testtesttest');
    });
  });

  describe('with a falsy headline prop', () => {
    it('should return null', () => {
      const wrapper = shallow(<Headline />);

      expect(wrapper).toBeEmptyRender();
    });
  });
});
