/* eslint-disable prefer-arrow-callback, react/jsx-props-no-spreading  */
import React from 'react';
import { shallow, mount } from 'enzyme';
import getThemeStyle from 'fusion:themes';
import Header from './default';

jest.mock('fusion:themes', () => jest.fn(() => ({})));
getThemeStyle.mockImplementation(() => ({ 'primary-font-family': 'Open-Sans' }));

describe('The header block', () => {
  describe('when a text prop is provided', () => {
    const customFields = {
      text: 'Header',
      size: 'Extra Large',
    };
    const wrapper = shallow(<Header customFields={customFields} />);

    it('should render a text element', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.text()).toEqual('Header');
    });

    it('should set the primary font of the header', () => {
      expect(wrapper).toHaveProp('primaryFont', 'Open-Sans');
    });

    it('should have the appropriate class', () => {
      expect(wrapper).toHaveProp('className', 'header-block');
    });
  });

  describe('when an Extra Large size prop is provided', () => {
    const customFields = {
      text: 'Extra Large Header',
      size: 'Extra Large',
    };
    const wrapper = mount(<Header customFields={customFields} />);
    it('should render a header with Extra Large text', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.props().customFields.size).toEqual('Extra Large');
      expect(wrapper.text()).toEqual('Extra Large Header');
      expect(wrapper.find('h2').length).toEqual(1);
    });
  });

  describe('when a Large size prop is provided', () => {
    const customFields = {
      text: 'Large Header',
      size: 'Large',
    };
    const wrapper = mount(<Header customFields={customFields} />);
    it('should render a header with Large text', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.props().customFields.size).toEqual('Large');
      expect(wrapper.text()).toEqual('Large Header');
      expect(wrapper.find('h3').length).toEqual(1);
    });
  });

  describe('when a Medium size prop is provided', () => {
    const customFields = {
      text: 'Medium Header',
      size: 'Medium',
    };
    const wrapper = mount(<Header customFields={customFields} />);
    it('should render a header with Medium text', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.props().customFields.size).toEqual('Medium');
      expect(wrapper.text()).toEqual('Medium Header');
      expect(wrapper.find('h4').length).toEqual(1);
    });
  });

  describe('when a Small size prop is provided', () => {
    const customFields = {
      text: 'Small Header',
      size: 'Small',
    };
    const wrapper = mount(<Header customFields={customFields} />);
    it('should render a header with Small text', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.props().customFields.size).toEqual('Small');
      expect(wrapper.text()).toEqual('Small Header');
      expect(wrapper.find('h5').length).toEqual(1);
    });
  });

  describe('when no size prop is provided', () => {
    const customFields = {
      text: 'Header',
      size: '',
    };
    const wrapper = mount(<Header customFields={customFields} />);
    it('should render a header with Medium text', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.props().customFields.size).toEqual('');
      expect(wrapper.text()).toEqual('Header');
      expect(wrapper.find('h4').length).toEqual(1);
    });
  });

  describe('when no text prop is provided', () => {
    const customFields = {
      text: '',
      size: '',
    };
    const wrapper = mount(<Header customFields={customFields} />);
    it('should render an empty header with no text', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.props().customFields.size).toEqual('');
      expect(wrapper.props().customFields.text).toEqual('');
      expect(wrapper.text()).toEqual('');
      expect(wrapper.find('h4').length).toEqual(1);
    });
  });
});
