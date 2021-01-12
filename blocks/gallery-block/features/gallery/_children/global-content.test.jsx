/* eslint-disable react/jsx-props-no-spreading, max-len */
import React from 'react';
import { shallow } from 'enzyme';

const mockPhrases = {
  'global.gallery-expand-button': 'Expand',
  'global.gallery-page-count-text': '%{current} of %{total}',
  'global.gallery-autoplay-button': 'Autoplay',
  'global.gallery-pause-autoplay-button': 'Pause autoplay',
};

jest.mock('fusion:properties', () => (jest.fn(() => ({
  fallbackImage: 'placeholder.jpg',
  resizerURL: 'https://fake.cdn.com/resizer',
}))));

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
            _id: 'shdsjdhs73e34',
            headlines: {
              basic: 'This is a headline',
            },
          },
        })),
        useFusionContext: jest.fn(() => ({
          arcSite: 'the-sun',
        })),
      }));

      jest.mock('@wpmedia/engine-theme-sdk', () => ({
        Gallery: (props, children) => (<div {...props}>{ children }</div>),
      }));

      const { default: GlobalContentGallery } = require('./global-content');

      const wrapper = shallow(
        <GlobalContentGallery
          phrases={{ t: jest.fn((phrase) => mockPhrases[phrase]) }}
          deployment={jest.fn((path) => path)}
        />,
      );
      expect(wrapper.find('Gallery').props().resizerURL).toEqual('https://fake.cdn.com/resizer');
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
        useFusionContext: jest.fn(() => ({
          arcSite: 'the-sun',
        })),
      }));

      jest.mock('@wpmedia/engine-theme-sdk', () => ({
        Gallery: (props, children) => (<div {...props}>{ children }</div>),
      }));

      const { default: GlobalContentGallery } = require('./global-content');

      const wrapper = shallow(
        <GlobalContentGallery
          phrases={{ t: jest.fn((phrase) => mockPhrases[phrase]) }}
          deployment={jest.fn((path) => path)}
        />,
      );
      expect(wrapper.find('Gallery').props().resizerURL).toEqual('https://fake.cdn.com/resizer');
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
        useFusionContext: jest.fn(() => ({
          arcSite: 'the-sun',
        })),
      }));

      jest.mock('@wpmedia/engine-theme-sdk', () => ({
        Gallery: (props, children) => (<div {...props}>{ children }</div>),
      }));

      const { default: GlobalContentGallery } = require('./global-content');

      const wrapper = shallow(
        <GlobalContentGallery
          phrases={{ t: jest.fn((phrase) => mockPhrases[phrase]) }}
          deployment={jest.fn((path) => path)}
        />,
      );
      expect(wrapper.find('Gallery').props().resizerURL).toEqual('https://fake.cdn.com/resizer');
      expect(wrapper.find('Gallery').props().galleryElements).toStrictEqual([]);
      expect(wrapper.find('Gallery').props().expandPhrase).toEqual('Expand');
      expect(wrapper.find('Gallery').props().autoplayPhrase).toEqual('Autoplay');
      expect(wrapper.find('Gallery').props().pausePhrase).toEqual('Pause autoplay');
      expect(typeof wrapper.find('Gallery').props().pageCountPhrase).toEqual('function');
    });
  });

  describe('when galleryCubeClicks is missing', () => {
    it('should not send interstitialClicks property', () => {
      const { default: GlobalContentGallery } = require('./global-content');
      const wrapper = shallow(
        <GlobalContentGallery
          phrases={{ t: jest.fn((phrase) => mockPhrases[phrase]) }}
          deployment={jest.fn((path) => path)}
        />,
      );
      expect(wrapper.find('Gallery').prop('interstitialClicks')).toBeFalsy();
    });
  });

  /**
  describe('when galleryCubeClicks is present', () => {
    it('should send interstitialClicks', () => {
      jest.mock('fusion:context', () => ({
        useAppContext: jest.fn(() => ({})),
        useFusionContext: jest.fn(() => ({
          arcSite: 'the-sun',
        })),
      }));
      jest.mock('fusion:properties', () => (jest.fn(() => ({
        fallbackImage: 'placeholder.jpg',
        resizerURL: 'https://fake.cdn.com/resizer',
        galleryCubeClicks: 5,
      }))));
      const { default: GlobalContentGallery } = require('./global-content');
      const wrapper = shallow(
        <GlobalContentGallery
          phrases={{ t: jest.fn((phrase) => mockPhrases[phrase]) }}
          deployment={jest.fn((path) => path)}
        />,
      );
      expect(wrapper.find('Gallery').prop('interstitialClicks')).toBeTruthy();
      const adElement = wrapper.find('Gallery').prop('adElement');
      expect(adElement).toBeTruthy();
      expect(adElement()).toBeInstanceOf(Object);
      expect(wrapper.find('Gallery').props().pageCountPhrase(1, 5)).toEqual('%{current} of %{total}');
    });
    it('should not send interstitialClicks in value invalid', () => {
      jest.mock('fusion:context', () => ({
        useAppContext: jest.fn(() => ({})),
        useFusionContext: jest.fn(() => ({
          arcSite: 'the-sun',
        })),
      }));
      jest.mock('fusion:properties', () => (jest.fn(() => ({
        fallbackImage: 'placeholder.jpg',
        resizerURL: 'https://fake.cdn.com/resizer',
        galleryCubeClicks: '{}',
      }))));
      const { default: GlobalContentGallery } = require('./global-content');
      const wrapper = shallow(
        <GlobalContentGallery
          phrases={{ t: jest.fn((phrase) => mockPhrases[phrase]) }}
          deployment={jest.fn((path) => path)}
        />,
      );
      expect(wrapper.find('Gallery').prop('interstitialClicks')).toBeFalsy();
      expect(wrapper.find('Gallery').prop('adElement')).toBeFalsy();
    });
  });
   * */
});
