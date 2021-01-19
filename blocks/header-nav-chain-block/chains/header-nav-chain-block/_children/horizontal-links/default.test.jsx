import React from 'react';
import { shallow, mount } from 'enzyme';

jest.mock('fusion:themes', () => (jest.fn(() => ({}))));

describe('the links bar feature for the default output type', () => {
  afterEach(() => {
    jest.resetModules();
  });

  beforeEach(() => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        id: 'testId',
      })),
    }));
  });

  it('should be a nav element', () => {
    const { default: LinksBar } = require('./default');
    jest.mock('fusion:content', () => ({
      useContent: jest.fn(() => ({
        children: [
          {
            _id: 'id_1',
            name: 'test link 1',
          },
          {
            _id: 'id_2',
            name: 'test link 2',
          },
        ],
      })),
    }));
    const wrapper = shallow(<LinksBar customFields={{ navigationConfig: 'links' }} />);

    expect(wrapper.children().at(0).type()).toBe('nav');
  });

  it('should contain the equal number of links between input and output', () => {
    const { default: LinksBar } = require('./default');
    jest.mock('fusion:content', () => ({
      useContent: jest.fn(() => ({
        children: [
          {
            _id: 'id_1',
            name: 'test link 1',
          },
          {
            _id: 'id_2',
            name: 'test link 2',
          },
          {
            _id: 'id_3',
            node_type: 'link',
            url: '/',
            display_name: 'Link Text',
          },
          {
            _id: 'id_4',
            node_type: 'link',
            url: 'http://arcpublishing.com',
            display_name: 'Link Text',
          },
        ],
      })),
    }));
    const wrapper = mount(<LinksBar customFields={{ navigationConfig: 'links' }} />);

    expect(wrapper.find('span.horizontal-links-menu')).toHaveLength(4);
    expect(wrapper.find('span.horizontal-links-menu a:not([target])')).toHaveLength(3);
    expect(wrapper.find('span.horizontal-links-menu a[target="_blank"]')).toHaveLength(1);
  });

  it('should have no menu item if no content is returned', () => {
    jest.mock('fusion:content', () => ({
      useContent: jest.fn(() => ({
        children: [],
      })),
    }));
    const { default: LinksBar } = require('./default');
    const wrapper = shallow(<LinksBar customFields={{ navigationConfig: 'links' }} />);

    expect(wrapper.find('nav > span')).toHaveLength(0);
  });

  describe('a link element ', () => {
    it('should have the right name', () => {
      const { default: Link } = require('./_children/link');
      const wrapper = mount(<Link href="/testurl" name="test" />);

      expect(wrapper.props().name).toBe('test');
      expect(wrapper.find('a').text()).toBe('test');
    });
  });

  describe('when a link is missing a trailing slash', () => {
    it('should add a slash at the end of the link', () => {
      const { default: Link } = require('./_children/link');
      const wrapper = mount(<Link href="/testurl" name="test" />);
      expect(wrapper.props().href).toBe('/testurl');
      expect(wrapper.find('[href="/testurl/"]').length).toBe(3);
    });
  });

  describe('when a link is not missing a trailing slash', () => {
    it('should not add a slash at the end of the link', () => {
      const { default: Link } = require('./_children/link');
      const wrapper = mount(<Link href="/testurl/" name="test" />);

      expect(wrapper.props().href).toBe('/testurl/');
      expect(wrapper.find('[href="/testurl/"]').length).toBe(4);
    });
  });

  describe('when a link has query parameters', () => {
    it('should not add a slash at the end of a internal link', () => {
      const { default: Link } = require('./_children/link');
      const wrapper = mount(<Link href="/testurl/?query=home" name="test" />);

      expect(wrapper.props().href).toBe('/testurl/?query=home');
      expect(wrapper.find('[href="/testurl/?query=home"]').length).toBe(4);
    });
  });

  describe('when a link has query parameters', () => {
    it('should not add a slash at the end of a external link', () => {
      const { default: Link } = require('./_children/link');
      const wrapper = mount(<Link href="http://example.com/testurl/?query=home" name="test" />);

      expect(wrapper.props().href).toBe('http://example.com/testurl/?query=home');
      expect(wrapper.find('[href="http://example.com/testurl/?query=home"]').length).toBe(4);
    });
  });

  describe('when a link is to a page', () => {
    it('should not add a slash at the end of the link', () => {
      const { default: Link } = require('./_children/link');
      const wrapper = mount(<Link href="https://example.com/category/page.html" name="test" />);

      expect(wrapper.props().href).toBe('https://example.com/category/page.html');
      expect(wrapper.find('[href="https://example.com/category/page.html"]').length).toBe(4);
    });
  });

  describe('when a link has a hash', () => {
    it('should not add a slash at the end of the link', () => {
      const { default: Link } = require('./_children/link');
      const wrapper = mount(<Link href="/category/page#myhash" name="test" />);

      expect(wrapper.props().href).toBe('/category/page#myhash');
      expect(wrapper.find('[href="/category/page#myhash"]').length).toBe(4);
    });
  });

  describe('when a link has a mail', () => {
    it('should not add a slash at the end of the link', () => {
      const { default: Link } = require('./_children/link');
      const wrapper = mount(<Link href="mailto:readers@washpost.com" name="test" />);

      expect(wrapper.props().href).toBe('mailto:readers@washpost.com');
      expect(wrapper.find('[href="mailto:readers@washpost.com"]').length).toBe(4);
    });
  });

  describe('when a link has show separator true', () => {
    it('should should show dot separator', () => {
      const { default: Link } = require('./_children/link');
      const wrapper = mount(<Link href="mailto:readers@washpost.com" name="test" navBarColor="light" showSeparator="true" />);
      expect(wrapper.text()).toContain('    •  test');
    });
  });
});
