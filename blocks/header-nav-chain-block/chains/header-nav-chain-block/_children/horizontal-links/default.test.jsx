import React from 'react';
import { shallow, mount } from 'enzyme';

jest.mock('fusion:themes', () => jest.fn(() => ({})));
jest.mock('@wpmedia/engine-theme-sdk', () => ({
  formatURL: jest.fn((input) => input.toString()),
}));
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
    const wrapper = shallow(
      <LinksBar customFields={{ navigationConfig: 'links' }} />,
    );

    expect(wrapper.children().at(0).type()).toBe('nav');
  });

  it('should not have separator only one link', () => {
    const { default: LinksBar } = require('./default');
    jest.mock('fusion:content', () => ({
      useContent: jest.fn(() => ({
        children: [
          {
            _id: 'id_1',
            name: 'test link 1',
          },
        ],
      })),
    }));
    const wrapper = shallow(
      <LinksBar
        customFields={{ navigationConfig: 'links' }}
        showHorizontalSeperatorDots
      />,
    );

    expect(wrapper.html()).toMatchInlineSnapshot(
      '"<nav class=\\"horizontal-links-bar\\" aria-label=\\"Top Links\\"><span class=\\"sc-bwzfXH dtelAW horizontal-links-menu\\">    <a href=\\"id_1/\\" class=\\"sc-bdVaJa jLoscj\\">test link 1</a></span></nav>"',
    );
  });

  it('should have separator when more than one link', () => {
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
            name: 'test link 3',
          },
        ],
      })),
    }));
    const wrapper = shallow(
      <LinksBar
        customFields={{ navigationConfig: 'links' }}
        showHorizontalSeperatorDots
      />,
    );

    expect(wrapper.html()).toMatchInlineSnapshot(
      '"<nav class=\\"horizontal-links-bar\\" aria-label=\\"Top Links\\"><span class=\\"sc-bwzfXH dtelAW horizontal-links-menu\\">    <a href=\\"id_1/\\" class=\\"sc-bdVaJa jLoscj\\">test link 1</a></span><span class=\\"sc-bwzfXH dtelAW horizontal-links-menu\\">  •  <a href=\\"id_2/\\" class=\\"sc-bdVaJa jLoscj\\">test link 2</a></span><span class=\\"sc-bwzfXH dtelAW horizontal-links-menu\\">  •  <a href=\\"id_3/\\" class=\\"sc-bdVaJa jLoscj\\">test link 3</a></span></nav>"',
    );
  });

  it('should not have separator when more than one link and showHorizontalSeperatorDots is false', () => {
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
    const wrapper = shallow(
      <LinksBar
        customFields={{ navigationConfig: 'links' }}
        showHorizontalSeperatorDots={false}
      />,
    );

    expect(wrapper.html()).toMatchInlineSnapshot(
      '"<nav class=\\"horizontal-links-bar\\" aria-label=\\"Top Links\\"><span class=\\"sc-bwzfXH dtelAW horizontal-links-menu\\">    <a href=\\"id_1/\\" class=\\"sc-bdVaJa jLoscj\\">test link 1</a></span><span class=\\"sc-bwzfXH dtelAW horizontal-links-menu\\">    <a href=\\"id_2/\\" class=\\"sc-bdVaJa jLoscj\\">test link 2</a></span></nav>"',
    );
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
    const wrapper = mount(
      <LinksBar customFields={{ navigationConfig: 'links' }} />,
    );

    expect(wrapper.find('span.horizontal-links-menu')).toHaveLength(4);
    expect(
      wrapper.find('span.horizontal-links-menu a:not([target])'),
    ).toHaveLength(3);
    expect(
      wrapper.find('span.horizontal-links-menu a[target="_blank"]'),
    ).toHaveLength(1);
  });

  it('should have no menu item if no content is returned', () => {
    jest.mock('fusion:content', () => ({
      useContent: jest.fn(() => ({
        children: [],
      })),
    }));
    const { default: LinksBar } = require('./default');
    const wrapper = shallow(
      <LinksBar customFields={{ navigationConfig: 'links' }} />,
    );

    expect(wrapper.find('nav > span')).toHaveLength(0);
  });
});
