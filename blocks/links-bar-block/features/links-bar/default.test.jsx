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

    expect(wrapper.at(0).type()).toBe('nav');
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

    expect(wrapper.find('span.links-menu')).toHaveLength(4);
    expect(wrapper.find('span.links-menu a:not([target])')).toHaveLength(3);
    expect(wrapper.find('span.links-menu a[target="_blank"]')).toHaveLength(1);
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
});
