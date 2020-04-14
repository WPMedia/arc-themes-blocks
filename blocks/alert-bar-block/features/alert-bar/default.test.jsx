import React from 'react';
import { mount } from 'enzyme';

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
