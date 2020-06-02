/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';

const mockPhrases = {
  'global.gallery-expand-button': 'Expand',
  'global.gallery-page-count-text': '%{current} of %{total}',
  'global.gallery-autoplay-button': 'Autoplay',
  'global.gallery-pause-autoplay-button': 'Pause autoplay',
};

describe('the global content gallery', () => {
  describe('when there is an array of content elements present', () => {
    it('should load content from global content', () => {
      jest.mock('fusion:context', () => ({
        useAppContext: jest.fn(() => ({
          globalContent: {
            content_elements: [
              {
                caption: 'my cool caption',
                subtitle: 'my cool subtitle',
              },
            ],
          },
        })),
      }));

      jest.mock('@wpmedia/engine-theme-sdk', () => ({
        Gallery: (props, children) => (<div {...props}>{ children }</div>),
      }));

      const { default: GlobalContentGallery } = require('./global-content');

      const wrapper = shallow(
        <GlobalContentGallery phrases={{ t: jest.fn((phrase) => mockPhrases[phrase]) }} />,
      );
      expect(wrapper.find('Gallery').props().galleryElements).toStrictEqual(
        [
          {
            caption: 'my cool caption',
            subtitle: 'my cool subtitle',
          },
        ],
      );
      expect(wrapper.find('Gallery').props().expandPhrase).toEqual('Expand');
      expect(wrapper.find('Gallery').props().autoplayPhrase).toEqual('Autoplay');
      expect(wrapper.find('Gallery').props().pausePhrase).toEqual('Pause autoplay');
      expect(typeof wrapper.find('Gallery').props().pageCountPhrase).toEqual('function');
    });
  });

  describe('when there is no array of content elements', () => {
    it('should load content from global content', () => {
      jest.mock('fusion:context', () => ({
        useAppContext: jest.fn(() => ({
          globalContent: {},
        })),
      }));

      jest.mock('@wpmedia/engine-theme-sdk', () => ({
        Gallery: (props, children) => (<div {...props}>{ children }</div>),
      }));

      const { default: GlobalContentGallery } = require('./global-content');

      const wrapper = shallow(
        <GlobalContentGallery phrases={{ t: jest.fn((phrase) => mockPhrases[phrase]) }} />,
      );
      expect(wrapper.find('Gallery').props().galleryElements).toStrictEqual([]);
      expect(wrapper.find('Gallery').props().expandPhrase).toEqual('Expand');
      expect(wrapper.find('Gallery').props().autoplayPhrase).toEqual('Autoplay');
      expect(wrapper.find('Gallery').props().pausePhrase).toEqual('Pause autoplay');
      expect(typeof wrapper.find('Gallery').props().pageCountPhrase).toEqual('function');
    });
  });

  describe('when there is no global content object', () => {
    it('should load content from global content', () => {
      jest.mock('fusion:context', () => ({
        useAppContext: jest.fn(() => ({})),
      }));

      jest.mock('@wpmedia/engine-theme-sdk', () => ({
        Gallery: (props, children) => (<div {...props}>{ children }</div>),
      }));

      const { default: GlobalContentGallery } = require('./global-content');

      const wrapper = shallow(
        <GlobalContentGallery phrases={{ t: jest.fn((phrase) => mockPhrases[phrase]) }} />,
      );
      expect(wrapper.find('Gallery').props().galleryElements).toStrictEqual([]);
      expect(wrapper.find('Gallery').props().expandPhrase).toEqual('Expand');
      expect(wrapper.find('Gallery').props().autoplayPhrase).toEqual('Autoplay');
      expect(wrapper.find('Gallery').props().pausePhrase).toEqual('Pause autoplay');
      expect(typeof wrapper.find('Gallery').props().pageCountPhrase).toEqual('function');
    });
  });
});
