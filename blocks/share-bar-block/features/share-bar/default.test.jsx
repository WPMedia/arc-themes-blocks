import React from 'react';
import { mount } from 'enzyme';
import getProperties from 'fusion:properties';

jest.mock('fusion:properties', () => (jest.fn(() => ({}))));

describe('When the share bar is shown', () => {
  it('should show all five buttons if they are chosen', () => {
    const { default: ShareBar } = require('./default');

    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        customFields: {
          email: true,
          facebook: true,
          pinterest: true,
          twitter: true,
          linkedIn: true,
        },
        globalContent: {
          headlines: {
            basic: 'sample headline',
          },
          website_url: '/2019/07/15/global-kitchen-sink-article/',
        },
      })),
    }));

    getProperties.mockImplementation(() => ({
      websiteDomain: 'https://www.thesun.com/',
      websiteName: 'The Sun',
    }));

    const wrapper = mount(<ShareBar />);
    expect(wrapper.find('button.shareButton')).toHaveLength(5);
  });

  it('should not show social buttons that are marked as false', () => {
    const { default: ShareBar } = require('./default');

    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        customFields: {
          email: true,
          facebook: false,
          pinterest: false,
          twitter: true,
          linkedIn: true,
        },
        globalContent: {
          headlines: {
            basic: 'sample headline',
          },
          website_url: '/2019/07/15/global-kitchen-sink-article/',
        },
      })),
    }));

    getProperties.mockImplementation(() => ({
      websiteDomain: 'https://www.thesun.com/',
      websiteName: 'The Sun',
    }));

    const wrapper = mount(<ShareBar />);
    expect(wrapper.find('button.shareButton')).toHaveLength(3);
    expect(wrapper.find({ title: 'email' })).toHaveLength(1);
    expect(wrapper.find({ title: 'twitter' })).toHaveLength(1);
    expect(wrapper.find({ title: 'linkedIn' })).toHaveLength(1);
    expect(wrapper.find({ title: 'facebook' })).toHaveLength(0);
    expect(wrapper.find({ title: 'pinterest' })).toHaveLength(0);
  });

  it('should not show any social buttons when all are marked false', () => {
    const { default: ShareBar } = require('./default');

    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        customFields: {
          email: false,
          facebook: false,
          pinterest: false,
          twitter: false,
          linkedIn: false,
        },
        globalContent: {
          headlines: {
            basic: 'sample headline',
          },
          website_url: '/2019/07/15/global-kitchen-sink-article/',
        },
      })),
    }));

    getProperties.mockImplementation(() => ({
      websiteDomain: 'https://www.thesun.com/',
      websiteName: 'The Sun',
    }));

    const wrapper = mount(<ShareBar />);
    expect(wrapper.find('div.shareBar').children()).toHaveLength(0);
  });

  describe('when the social buttons are clicked', () => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        customFields: {
          email: true,
          facebook: true,
          pinterest: true,
          twitter: true,
          linkedIn: true,
        },
        globalContent: {
          headlines: {
            basic: 'sample headline',
          },
          website_url: '/2019/07/15/global-kitchen-sink-article/',
        },
      })),
    }));

    getProperties.mockImplementation(() => ({
      websiteDomain: 'https://www.thesun.com/',
      websiteName: 'The Sun',
    }));

    const { default: ShareBar } = require('./default');
    window.open = jest.fn();

    it('should open a new window when facebook button is clicked', () => {
      const wrapper = mount(<ShareBar />);
      wrapper.find({ title: 'facebook' }).simulate('click');
      expect(window.location.origin).toEqual('http://localhost');
      expect(window.open).toBeCalled();
    });

    it('should open a new window when linkedIn button is clicked', () => {
      const wrapper = mount(<ShareBar />);
      wrapper.find({ title: 'linkedIn' }).simulate('click');
      expect(window.location.origin).toEqual('http://localhost');
      expect(window.open).toBeCalled();
    });

    it('should open a new window when email button is clicked', () => {
      const wrapper = mount(<ShareBar />);
      wrapper.find({ title: 'email' }).simulate('click');
      expect(window.location.origin).toEqual('http://localhost');
      expect(window.open).toBeCalled();
    });

    it('should open a new window when pinterest button is clicked', () => {
      const wrapper = mount(<ShareBar />);
      wrapper.find({ title: 'pinterest' }).simulate('click');
      expect(window.location.origin).toEqual('http://localhost');
      expect(window.open).toBeCalled();
    });

    it('should open a new window when twitter button is clicked', () => {
      const wrapper = mount(<ShareBar />);
      wrapper.find({ title: 'twitter' }).simulate('click');
      expect(window.location.origin).toEqual('http://localhost');
      expect(window.open).toBeCalled();
    });
  });

  it('should work with a keypress', () => {
    const { default: ShareBar } = require('./default');

    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        arcSite: 'the-sun',
        customFields: {
          email: false,
          facebook: true,
          pinterest: false,
          twitter: false,
          linkedIn: false,
        },
        globalContent: {
          headlines: {
            basic: 'sample headline',
          },
          website_url: '/2019/07/15/global-kitchen-sink-article/',
        },
      })),
    }));

    getProperties.mockImplementation(() => ({
      websiteDomain: 'https://www.thesun.com/',
      websiteName: 'The Sun',
    }));

    window.open = jest.fn();

    const wrapper = mount(<ShareBar />);
    wrapper.find({ title: 'facebook' }).simulate('keyPress');
    expect(window.location.origin).toEqual('http://localhost');
    expect(window.open).toBeCalled();
  });
});
