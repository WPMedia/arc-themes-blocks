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
    const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} />);
    it('should have a title', () => {
      expect(wrapper.find('title').length).toBe(1);
    });

    it('should have a head', () => {
      expect(wrapper.find('head').length).toBe(1);
    });

    it('should have a body', () => {
      expect(wrapper.find('body').length).toBe(1);
    });

    it('should have meta tags', () => {
      expect(wrapper.find('meta').length).toBe(10);
    });

    it('should have script tags', () => {
      expect(wrapper.find('script').length).toBe(7);
    });

    it('should have link tags', () => {
      expect(wrapper.find('link').length).toBe(2);
    });
  });

  describe('when an article page type is provided', () => {
    const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} />);
    it('should have a title tag', () => {
      expect(wrapper.find('title').childAt(0).text()).toEqual('article – The Sun');
    });

    it('should have an article description meta tag', () => {
      expect(wrapper.find("meta[name='description']").props().content).toBe('article');
    });

    it('should have an article keywords meta tag', () => {
      expect(wrapper.find("meta[name='keywords']").props().content).toBe('article');
    });

    it('should have an article og:title meta tag', () => {
      expect(wrapper.find("meta[property='og:title']").props().content).toBe('article');
    });

    it('should have an article og:image meta tag', () => {
      expect(wrapper.find("meta[property='og:image']").props().content).toBe('undefined/unsafe/1200x630/article');
    });

    it('should have an article og:image:alt meta tag', () => {
      expect(wrapper.find("meta[property='og:image:alt']").props().content).toBe('article');
    });

    it('should have an robots meta tag', () => {
      expect(wrapper.find("meta[name='robots']").props().content).toBe('noarchive');
    });
  });

  describe('when a video page type is provided', () => {
    const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('video')} />);
    it('should have a title tag', () => {
      expect(wrapper.find('title').childAt(0).text()).toEqual('video – The Sun');
    });

    it('should have a video description meta tag', () => {
      expect(wrapper.find("meta[name='description']").props().content).toBe('video');
    });

    it('should have a video keywords meta tag', () => {
      expect(wrapper.find("meta[name='keywords']").props().content).toBe('video');
    });

    it('should have a video og:title meta tag', () => {
      expect(wrapper.find("meta[property='og:title']").props().content).toBe('video');
    });

    it('should have a video og:image meta tag', () => {
      expect(wrapper.find("meta[property='og:image']").props().content).toBe('undefined/unsafe/1200x630/video');
    });

    it('should have a video og:image:alt meta tag', () => {
      expect(wrapper.find("meta[property='og:image:alt']").props().content).toBe('video');
    });

    it('should not have an robots meta tag', () => {
      expect(wrapper.find("meta[name='robots']").length).toBe(0);
    });
  });

  describe('when a gallery page type is provided', () => {
    const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('gallery')} />);
    it('should have a title tag', () => {
      expect(wrapper.find('title').childAt(0).text()).toEqual('gallery – The Sun');
    });

    it('should have a video description meta tag', () => {
      expect(wrapper.find("meta[name='description']").props().content).toBe('gallery');
    });

    it('should have a video keywords meta tag', () => {
      expect(wrapper.find("meta[name='keywords']").props().content).toBe('gallery');
    });

    it('should have a video og:title meta tag', () => {
      expect(wrapper.find("meta[property='og:title']").props().content).toBe('gallery');
    });

    it('should have a video og:image meta tag', () => {
      expect(wrapper.find("meta[property='og:image']").props().content).toBe('undefined/unsafe/1200x630/gallery');
    });

    it('should have a video og:image:alt meta tag', () => {
      expect(wrapper.find("meta[property='og:image:alt']").props().content).toBe('gallery');
    });

    it('should not have an robots meta tag', () => {
      expect(wrapper.find("meta[name='robots']").length).toBe(0);
    });
  });

  describe('when an author page type is provided', () => {
    const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('author')} />);
    it('should have a title tag', () => {
      expect(wrapper.find('title').childAt(0).text()).toEqual('author - The Sun');
    });

    it('should have an author description meta tag', () => {
      expect(wrapper.find("meta[name='description']").props().content).toBe('author');
    });


    it('should have an author og:title meta tag', () => {
      expect(wrapper.find("meta[property='og:title']").props().content).toBe('author - The Sun');
    });
  });

  describe('when a tag page type is provided', () => {
    const wrapper = shallow(<DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('tag')} />);
    it('should have a title tag', () => {
      expect(wrapper.find('title').childAt(0).text()).toEqual('tag - The Sun');
    });

    it('should have an author description meta tag', () => {
      expect(wrapper.find("meta[name='description']").props().content).toBe('tag');
    });


    it('should have an author og:title meta tag', () => {
      expect(wrapper.find("meta[property='og:title']").props().content).toBe('tag - The Sun');
    });
  });
});
