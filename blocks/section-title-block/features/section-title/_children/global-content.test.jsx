/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';

const mockNestedChildren = {
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
};

describe('the global content section title', () => {
  describe('when there is an array of children present', () => {
    it('should load content from global content', () => {
      jest.mock('fusion:context', () => ({
        useAppContext: jest.fn(() => ({
          globalContent: {
            content: mockNestedChildren,
          },
        })),
      }));

      const { default: GlobalContentSectionTitle } = require('./global-content');

      const wrapper = shallow(<GlobalContentSectionTitle />);
      expect(wrapper.find('SectionTitle').props()).toStrictEqual(
        {
          content: {
            content: mockNestedChildren,
          },
        },
      );
    });
  });

  describe('when there is no array of children', () => {
    it('should load content from global content', () => {
      jest.mock('fusion:context', () => ({
        useAppContext: jest.fn(() => ({
          globalContent: {},
        })),
      }));

      const { default: GlobalContentSectionTitle } = require('./global-content');

      const wrapper = shallow(<GlobalContentSectionTitle />);
      expect(wrapper.find('SectionTitle').props()).toStrictEqual(
        {
          content: {},
        },
      );
    });
  });

  describe('when there is no global content object', () => {
    it('should load content from global content', () => {
      jest.mock('fusion:context', () => ({
        useAppContext: jest.fn(() => ({})),
      }));
      const { default: GlobalContentSectionTitle } = require('./global-content');

      const wrapper = shallow(<GlobalContentSectionTitle />);
      expect(wrapper.find('SectionTitle').props()).toStrictEqual(
        {
          content: {},
        },
      );
    });
  });
});
