import React from 'react';
import { shallow } from 'enzyme';

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
    const wrapper = shallow(<LinksBar customFields={{ hierarchy: 'links' }} />);

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
        ],
      })),
    }));
    const wrapper = shallow(<LinksBar customFields={{ hierarchy: 'links' }} />);

    expect(wrapper.find('nav > span')).toHaveLength(2);
  });

  it('should have no menu item if no content is returned', () => {
    jest.mock('fusion:content', () => ({
      useContent: jest.fn(() => ({
        children: [],
      })),
    }));
    const { default: LinksBar } = require('./default');
    const wrapper = shallow(<LinksBar customFields={{ hierarchy: 'links' }} />);

    expect(wrapper.find('nav > span')).toHaveLength(0);
  });
});
