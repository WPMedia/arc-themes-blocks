import React from 'react';
import { mount } from 'enzyme';
import Header from './default';

jest.mock('fusion:themes', () => jest.fn(() => ({})));

const mockFusionContext = {
  arcSite: 'the-sun',
};

jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => mockFusionContext),
}));

describe('The header chain block', () => {
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
      expect(wrapper.find('.tb-header-chain-block--extra-large').exists()).toBe(true);
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
      expect(wrapper.find('.tb-header-chain-block--large').exists()).toBe(true);
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
      expect(wrapper.find('.tb-header-chain-block--medium').exists()).toBe(true);
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
      expect(wrapper.find('.tb-header-chain-block--small').exists()).toBe(true);
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
      expect(wrapper.find('.tb-header-chain-block').exists()).toBe(true);
    });
  });

  describe('when no text prop is provided', () => {
    const customFields = {
      text: '',
      size: '',
    };
    const wrapper = mount(<Header customFields={customFields} />);
    it('should render null if no text', () => {
      expect(wrapper.html()).toBe(null);
    });
  });

  describe('renders children when provided', () => {
    const customFields = {
      text: 'Section Title',
      size: '',
    };
    const wrapper = mount(<Header customFields={customFields}><div className="child-item">Child</div></Header>);

    it('should render child item', () => {
      expect(wrapper.find('.child-item').exists()).toBe(true);
    });
  });
});
