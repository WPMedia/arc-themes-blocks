import React from 'react';
import { mount, shallow } from 'enzyme';

jest.mock('fusion:themes', () => jest.fn(() => ({})));
describe('the alert bar feature for the default output type', () => {
  afterEach(() => {
    jest.resetModules();
  });

  it('should render the alert bar with link and headline if collection returns a story', () => {
    const { default: AlertBar } = require('./default');
    const customFields = {
      refreshIntervals: 120,
    };
    const content = {
      _id: 'VTKOTRJXEVATHG7MELTPZ2RIBU',
      type: 'collection',
      content_elements:
        [{
          _id: '55FCWHR6SRCQ3OIJJKWPWUGTBM',
          headlines: {
            basic: 'This is a test headline',
          },
          websites: {
            'the-sun': {
              website_url: '/2019/12/02/baby-panda-born-at-the-zoo/',
            },
          },
        }],
    };

    function getContent() {
      return new Promise((resolve) => {
        resolve(content);
      });
    }
    const fetched = getContent();
    AlertBar.prototype.getContent = jest.fn().mockReturnValue({
      cached: content,
      fetched,
    });
    const wrapper = mount(<AlertBar customFields={customFields} arcSite="the-sun" />);
    expect(wrapper.find('.alert-bar')).toHaveLength(1);
    expect(wrapper.find('.alert-bar').children().find('a').props().href).toBe('/2019/12/02/baby-panda-born-at-the-zoo/');
    expect(wrapper.find('.alert-bar').children().find('a').props().children).toBe('This is a test headline');
  });

  it('should not render the alert bar if there is no story', () => {
    const { default: AlertBar } = require('./default');
    const customFields = {
      refreshIntervals: 120,
    };
    const content = {};

    function getContent() {
      return new Promise((resolve) => {
        resolve(content);
      });
    }
    const fetched = getContent();
    AlertBar.prototype.getContent = jest.fn().mockReturnValue({
      cached: content,
      fetched,
    });
    const wrapper = mount(<AlertBar customFields={customFields} arcSite="the-sun" />);
    expect(wrapper.find('.alert-bar')).toHaveLength(0);
  });
});

describe('the alert can handle user interaction', () => {
  it('must hide when click the close button', () => {
    const { default: AlertBar } = require('./default');
    const content = {
      _id: 'VTKOTRJXEVATHG7MELTPZ2RIBU',
      type: 'collection',
      content_elements:
        [{
          _id: '55FCWHR6SRCQ3OIJJKWPWUGTBM',
          headlines: {
            basic: 'This is a test headline',
          },
          websites: {
            'the-sun': {
              website_url: '/2019/12/02/baby-panda-born-at-the-zoo/',
            },
          },
        }],
    };

    AlertBar.prototype.getContent = jest.fn().mockReturnValue({
      cached: content,
      fetched: new Promise((r) => r(content)),
    });
    const wrapper = shallow(<AlertBar arcSite="the-sun" />);
    expect(wrapper.find('.alert-bar')).toHaveLength(1);
    wrapper.find('button').simulate('click');
    expect(wrapper.find('.alert-bar')).toHaveLength(0);
  });

  it("must set a cookie with the headline text when it's dismissed", () => {
    const { default: AlertBar } = require('./default');
    const cookieText = 'This is a test headline for cookie';
    const encodedCookie = 'arcblock_alert-bar=This%20is%20a%20test%20headline%20for%20cookie';
    const content = {
      _id: 'VTKOTRJXEVATHG7MELTPZ2RIBU',
      type: 'collection',
      content_elements:
        [{
          _id: '55FCWHR6SRCQ3OIJJKWPWUGTBM',
          headlines: {
            basic: cookieText,
          },
          websites: {
            'the-sun': {
              website_url: '/2019/12/02/baby-panda-born-at-the-zoo/',
            },
          },
        }],
    };

    AlertBar.prototype.getContent = jest.fn().mockReturnValue({
      cached: content,
      fetched: new Promise((r) => r(content)),
    });
    const wrapper = shallow(<AlertBar arcSite="the-sun" />);
    expect(wrapper.find('.alert-bar')).toHaveLength(1);
    wrapper.find('button').simulate('click');
    expect(wrapper.find('.alert-bar')).toHaveLength(0);
    expect(document.cookie).toEqual(encodedCookie);
  });

  it('must not render alert when cookie matches the headline text', () => {
    const { default: AlertBar } = require('./default');
    const cookieText = 'cookie with text';
    const encodedCookie = 'arcblock_alert-bar=cookie%20with%20text';

    const content = {
      _id: 'VTKOTRJXEVATHG7MELTPZ2RIBU',
      type: 'collection',
      content_elements:
        [{
          _id: '55FCWHR6SRCQ3OIJJKWPWUGTBM',
          headlines: {
            basic: cookieText,
          },
          websites: {
            'the-sun': {
              website_url: '/2019/12/02/baby-panda-born-at-the-zoo/',
            },
          },
        }],
    };
    document.cookie = encodedCookie;

    AlertBar.prototype.getContent = jest.fn().mockReturnValue({
      cached: content,
      fetched: new Promise((r) => r(content)),
    });
    const wrapper = shallow(<AlertBar arcSite="the-sun" />);
    expect(wrapper.find('.alert-bar')).toHaveLength(0);
    expect(document.cookie).toEqual(encodedCookie);
  });
});
