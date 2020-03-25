/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';

const mockNestedChildren = {
  arcSite: 'site',
  globalContent: {
    _id: '/',
    name: 'Section Title',
    children: [
      {
        _id: '/news',
        _website: 'The Washington Post',
        privilege: 'News',
        name: 'News',
        order: {
          default: 1002,
        },
        ancestors: {
          default: ['/'],
        },
        inactive: false,
        children: [
          {
            _id: '/sports-news',
            _website: 'The Washington Post',
            privilege: 'News',
            name: 'Sports',
            order: {
              default: 1002,
            },
            ancestors: {
              default: ['/'],
            },
            inactive: false,
          },
          {
            _id: '/political-news',
            _website: 'The Washington Post',
            privilege: 'News',
            name: 'Politics',
            order: {
              default: 1002,
            },
            ancestors: {
              default: ['/'],
            },
            inactive: false,
          },
          {
            _id: '/global-news',
            _website: 'The Washington Post',
            privilege: 'News',
            name: 'Global',
            order: {
              default: 1002,
            },
            ancestors: {
              default: ['/'],
            },
            inactive: false,
          },
        ],
      },
    ],
  },
};

jest.mock('fusion:content', () => ({
  useContent: jest.fn(() => (mockNestedChildren)),
}));


describe('the custom content section title', () => {
  it('should call useContent with the expected content config values', () => {
    const { default: CustomContentSectionTitle } = require('./custom-content');
    const { useContent } = require('fusion:content');

    shallow(<CustomContentSectionTitle contentConfig={{ contentService: 'api', contentConfigValues: 'config' }} />);
    expect(useContent.mock.calls).toHaveLength(1);
    expect(useContent.mock.calls[0]).toHaveLength(1);
    expect(useContent.mock.calls[0][0]).toStrictEqual({ query: 'config', source: 'api' });
  });

  describe('when there is gallery data returned by the fetch', () => {
    it('should use the gallery data supplied by the fetch', () => {
      const { default: CustomContentSectionTitle } = require('./custom-content');

      const wrapper = shallow(<CustomContentSectionTitle contentConfig={{ contentService: 'api', contentConfigValues: 'config' }} />);
      expect(wrapper.find('SectionTitle').props()).toStrictEqual(
        {
          content: mockNestedChildren,
        },
      );
    });
  });

  describe('when there is gallery data returned by the fetch', () => {
    it('should load content from global content', () => {
      const { default: CustomContentSectionTitle } = require('./custom-content');
      const { useContent } = require('fusion:content');
      useContent.mockReturnValue(null);

      const wrapper = shallow(<CustomContentSectionTitle contentConfig={{ contentService: 'api', contentConfigValues: 'config' }} />);
      expect(wrapper.find('SectionTitle').props()).toStrictEqual(
        {
          content: {},
        },
      );
    });
  });
});
