/**
 * this is for mocking node env
 * will not have window attribute, testing ssr
 * https://jestjs.io/docs/en/configuration.html#testenvironment-string
 * @jest-environment node
 */
import React from 'react';
import { shallow } from 'enzyme';
import getProperties from 'fusion:properties';
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
  twitterSite: 'https://www.twitter.com/the-sun',
  dangerouslyInjectJS: [],
}));

describe('the default output type', () => {
  it('should render', () => {
    const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn()} />);
    expect(wrapper).toBeDefined();
  });
  describe('renders a page', () => {
    it('should have a title', () => {
      const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} />);
      expect(wrapper.find('title').length).toBe(1);
    });

    it('should have a head', () => {
      const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} />);
      expect(wrapper.find('head').length).toBe(1);
    });

    it('should have a body', () => {
      const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} />);
      expect(wrapper.find('body').length).toBe(1);
    });

    it('should have meta tags', () => {
      const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} />);
      expect(wrapper.find('meta').length).toBe(10);
    });

    it('should have script tags', () => {
      const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} />);
      expect(wrapper.find('script').length).toBe(7);
    });

    it('should have link tags', () => {
      const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} />);
      expect(wrapper.find('link').length).toBe(2);
    });
  });

  describe('when the an article page type is provided', () => {
    it('should have a title tag', () => {
      const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} />);
      expect(wrapper.find('title').childAt(0).text()).toEqual('article – The Sun');
    });

    it('should have an article description meta tag', () => {
      const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} />);
      expect(wrapper.find("meta[name='description']").props().content).toBe('article');
    });

    it('should have an article keywords meta tag', () => {
      const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} />);
      expect(wrapper.find("meta[name='keywords']").props().content).toBe('article');
    });

    it('should have an article og:title meta tag', () => {
      const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} />);
      expect(wrapper.find("meta[property='og:title']").props().content).toBe('article');
    });

    it('should have an article og:image meta tag', () => {
      const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} />);
      expect(wrapper.find("meta[property='og:image']").props().content).toBe('undefined/unsafe/1200x630/article');
    });

    it('should have an article og:image:alt meta tag', () => {
      const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} />);
      expect(wrapper.find("meta[property='og:image:alt']").props().content).toBe('article');
    });

    it('should have an robots meta tag', () => {
      const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} />);
      expect(wrapper.find("meta[name='robots']").props().content).toBe('noarchive');
    });
  });

  describe('when the a video page type is provided', () => {
    it('should have a title tag', () => {
      const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('video')} />);
      expect(wrapper.find('title').childAt(0).text()).toEqual('video – The Sun');
    });

    it('should have a video description meta tag', () => {
      const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('video')} />);
      expect(wrapper.find("meta[name='description']").props().content).toBe('video');
    });

    it('should have a video keywords meta tag', () => {
      const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('video')} />);
      expect(wrapper.find("meta[name='keywords']").props().content).toBe('video');
    });

    it('should have a video og:title meta tag', () => {
      const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('video')} />);
      expect(wrapper.find("meta[property='og:title']").props().content).toBe('video');
    });

    it('should have a video og:image meta tag', () => {
      const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('video')} />);
      expect(wrapper.find("meta[property='og:image']").props().content).toBe('undefined/unsafe/1200x630/video');
    });

    it('should have a video og:image:alt meta tag', () => {
      const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('video')} />);
      expect(wrapper.find("meta[property='og:image:alt']").props().content).toBe('video');
    });

    it('should not have an robots meta tag', () => {
      const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('video')} />);
      expect(wrapper.find("meta[name='robots']").length).toBe(0);
    });
  });
});
