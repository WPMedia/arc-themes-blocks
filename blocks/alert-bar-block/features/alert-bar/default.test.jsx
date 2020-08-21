import React from 'react';
import { mount, shallow } from 'enzyme';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

describe('the alert bar must hide/show automatically', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.resetModules();
  });

  it('should render when there is data on the next interval', async (done) => {
    const { default: AlertBar } = require('./default');
    const customFields = {
      refreshIntervals: 120,
    };
    const contentEmpty = {};
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

    let firstTime = true;
    AlertBar.prototype.getContent = jest.fn().mockImplementation(() => {
      if (firstTime) {
        firstTime = false;
        return {
          fetched: new Promise((r) => r(contentEmpty)),
        };
      }
      return {
        cached: content,
        fetched: new Promise((r) => r(content)),
      };
    });
    const wrapper = shallow(<AlertBar customFields={customFields} arcSite="the-sun" />);
    expect(wrapper.find('.alert-bar')).toHaveLength(0);

    // const instance = wrapper.instance();
    // instance.componentDidMount();
    jest.runOnlyPendingTimers();

    jest.useRealTimers();
    await sleep(200);
    wrapper.setProps({}); // force a re render
    wrapper.update();

    expect(wrapper.find('.alert-bar')).toHaveLength(1);
    done();
  });

  it('should hide when there is no data on the next interval', async (done) => {
    const { default: AlertBar } = require('./default');
    const customFields = {
      refreshIntervals: 120,
    };
    const contentEmpty = {};
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

    let firstTime = true;
    AlertBar.prototype.getContent = jest.fn().mockImplementation(() => {
      if (firstTime) {
        firstTime = false;
        return {
          cached: content,
          fetched: new Promise((r) => r(content)),
        };
      }
      return {
        cached: contentEmpty,
        fetched: new Promise((r) => r(contentEmpty)),
      };
    });
    const wrapper = shallow(<AlertBar customFields={customFields} arcSite="the-sun" />);
    expect(wrapper.find('.alert-bar')).toHaveLength(1);

    // const instance = wrapper.instance();
    // instance.componentDidMount();
    // expect(instance.timeID).not.toBeNull();
    jest.runOnlyPendingTimers();

    // need to switch to real timers to be able to use sleep
    jest.useRealTimers();
    await sleep(200);
    wrapper.setProps({}); // force a re render
    wrapper.update();

    expect(wrapper.find('.alert-bar')).toHaveLength(0);

    wrapper.unmount();
    done();
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
});
