/**
 * this is for mocking node env
 * will not have window attribute, testing ssr
 * https://jestjs.io/docs/en/configuration.html#testenvironment-string
 * @jest-environment node
 */
import React from 'react';
import { shallow } from 'enzyme';
import getProperties from 'fusion:properties';
import { MetaData } from '@wpmedia/engine-theme-sdk';
import DefaultOutputType from '../default';

jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({
    globalContent: {},
    arcSite: 'the-sun',
  })),
}));

jest.mock('react-dom/server', () => ({
  renderToString: jest.fn().mockReturnValue('<meta />'),
}));

getProperties.mockImplementation(() => ({
  websiteName: 'The Sun',
  twitterUsername: 'thesun',
  dangerouslyInjectJS: [],
}));

describe('the default output type', () => {
  it('should render', () => {
    const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn()} />);
    expect(wrapper).toBeDefined();
  });
  describe('renders a page', () => {
    const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} />);

    it('should have a head', () => {
      expect(wrapper.find('head').length).toBe(1);
    });

    it('should have a body', () => {
      expect(wrapper.find('body').length).toBe(1);
    });

    it('should have script tags', () => {
      expect(wrapper.find('script').length).toBe(3);
    });

    it('should have link tags', () => {
      expect(wrapper.find('link').length).toBe(2);
    });

    it('should have a MedataData component', () => {
      expect(wrapper.find(MetaData).length).toBe(1);
    });

    it('MedataData should receive twitterUsername', () => {
      expect(wrapper.find(MetaData).prop('twitterUsername')).toEqual('thesun');
    });
  });

  describe('root html layout', () => {
    const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} />);

    it('html must have only have head and body tags', () => {
      const html = wrapper.find('html');
      expect(html.length).toBe(1);
      expect(html.children().length).toBe(2);
      expect(html.children('head').length).toBe(1);
      expect(html.children('body').length).toBe(1);
    });
  });
});
