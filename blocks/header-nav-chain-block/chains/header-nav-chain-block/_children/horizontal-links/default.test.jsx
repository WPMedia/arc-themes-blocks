import React from 'react';
import { shallow, mount } from 'enzyme';

jest.mock('fusion:themes', () => jest.fn(() => ({})));
jest.mock('@wpmedia/engine-theme-sdk', () => ({
  formatURL: jest.fn((input) => input.toString()),
}));

jest.mock('@wpmedia/shared-styles', () => ({
  __esModule: true,
  PrimaryFont: (props) => <span {...props} />,
}));

jest.mock('fusion:properties', () => (jest.fn(() => ({
  locale: 'en',
}))));
jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({
    arcSite: 'dagen',
  })),
}));
jest.mock('fusion:intl', () => jest.fn(
  () => ({
    t: jest.fn(() => 'Top Links'),
  }),
));

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
      '"<nav color=\\"#fff\\" class=\\"sc-bdVaJa hPRxrT horizontal-links-bar\\" aria-label=\\"Top Links\\"><span as=\\"span\\" class=\\"horizontal-links-menu\\">    <a href=\\"id_1/\\">test link 1</a></span></nav>"',
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
      '"<nav color=\\"#fff\\" class=\\"sc-bdVaJa hPRxrT horizontal-links-bar\\" aria-label=\\"Top Links\\"><span as=\\"span\\" class=\\"horizontal-links-menu\\">    <a href=\\"id_1/\\">test link 1</a></span><span as=\\"span\\" class=\\"horizontal-links-menu\\">  •  <a href=\\"id_2/\\">test link 2</a></span><span as=\\"span\\" class=\\"horizontal-links-menu\\">  •  <a href=\\"id_3/\\">test link 3</a></span></nav>"',
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
      '"<nav color=\\"#fff\\" class=\\"sc-bdVaJa hPRxrT horizontal-links-bar\\" aria-label=\\"Top Links\\"><span as=\\"span\\" class=\\"horizontal-links-menu\\">    <a href=\\"id_1/\\">test link 1</a></span><span as=\\"span\\" class=\\"horizontal-links-menu\\">    <a href=\\"id_2/\\">test link 2</a></span></nav>"',
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

  it('should render the block with the default aria-label', () => {
    jest.mock('fusion:content', () => ({
      useContent: jest.fn(() => ({
        children: [],
      })),
    }));
    const { default: LinksBar } = require('./default');
    const wrapper = shallow(<LinksBar />);

    expect(wrapper.find('.horizontal-links-bar').props()).toHaveProperty(
      'aria-label',
      'Top Links',
    );
  });

  it('should render the block with the custom aria-label', () => {
    jest.mock('fusion:content', () => ({
      useContent: jest.fn(() => ({
        children: [],
      })),
    }));
    const { default: LinksBar } = require('./default');
    const wrapper = shallow(<LinksBar ariaLabel="Links" />);

    expect(wrapper.find('.horizontal-links-bar').props()).toHaveProperty(
      'aria-label',
      'Links',
    );
  });
});
