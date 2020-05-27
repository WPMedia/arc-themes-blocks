/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';

const mockPhrases = {
  'global.gallery-expand-button': 'Expand',
  'global.gallery-page-count-text': '%{current} of %{total}',
  'global.gallery-autoplay-button': 'Autoplay',
  'global.gallery-pause-autoplay-button': 'Pause autoplay',
};

jest.mock('fusion:content', () => ({
  useContent: jest.fn(() => ({
    content_elements: [
      {
        caption: 'my cool caption',
        subtitle: 'my cool subtitle',
      },
    ],
  })),
}));

const mockReturnData = {
  arcSite: 'the-sun',
  globalContent: {
    _id: 'shdsjdhs73e34',
    headlines: {
      basic: 'This is a headline',
    },
  },
};

const mockFunction = jest.fn().mockReturnValue(mockReturnData);

jest.mock('fusion:context', () => ({
  useFusionContext: mockFunction,
}));

jest.mock('fusion:intl', () => ({
  __esModule: true,
  default: jest.fn((locale) => ({ t: jest.fn((phrase) => require('../../../intl.json')[phrase][locale]) })),
}));

jest.mock('@wpmedia/engine-theme-sdk', () => ({
  Gallery: (props, children) => <div {...props}>{ children }</div>,
}));

describe('the custom content gallery', () => {
  it('should call useContent with the expected content config values', () => {
    const { default: CustomContentGallery } = require('./custom-content');
    const { useContent } = require('fusion:content');

    shallow(
      <CustomContentGallery
        contentConfig={{ contentService: 'cool-api', contentConfigValues: 'cool-config' }}
        phrases={{ t: jest.fn((phrase) => mockPhrases[phrase]) }}
      />,
    );
    expect(useContent.mock.calls).toHaveLength(1);
    expect(useContent.mock.calls[0]).toHaveLength(1);
    expect(useContent.mock.calls[0][0]).toStrictEqual({ query: 'cool-config', source: 'cool-api' });
  });

  describe('when there is gallery data returned by the fetch', () => {
    it('should use the gallery data supplied by the fetch', () => {
      const { default: CustomContentGallery } = require('./custom-content');

      const wrapper = shallow(
        <CustomContentGallery
          contentConfig={{ contentService: 'cool-api', contentConfigValues: 'cool-config' }}
          phrases={{ t: jest.fn((phrase) => mockPhrases[phrase]) }}
        />,
      );
      expect(wrapper.find('Gallery').props().galleryElements).toStrictEqual(
        [
          {
            caption: 'my cool caption',
            subtitle: 'my cool subtitle',
          },
        ],
      );
      expect(wrapper.find('Gallery').props().resizerURL).toEqual('https://fake.cdn.com/resizer');
      expect(wrapper.find('Gallery').props().ansId).toEqual('shdsjdhs73e34');
      expect(wrapper.find('Gallery').props().ansHeadline).toEqual('This is a headline');
      expect(wrapper.find('Gallery').props().expandPhrase).toEqual('Expand');
      expect(wrapper.find('Gallery').props().autoplayPhrase).toEqual('Autoplay');
      expect(wrapper.find('Gallery').props().pausePhrase).toEqual('Pause autoplay');
      expect(typeof wrapper.find('Gallery').props().pageCountPhrase).toEqual('function');
    });
  });

  describe('when there is gallery data returned by the fetch', () => {
    it('should load content from global content', () => {
      const { default: CustomContentGallery } = require('./custom-content');
      const { useContent } = require('fusion:content');
      useContent.mockReturnValue(null);

      const wrapper = shallow(
        <CustomContentGallery
          contentConfig={{ contentService: 'cool-api', contentConfigValues: 'cool-config' }}
          phrases={{ t: jest.fn((phrase) => mockPhrases[phrase]) }}
        />,
      );
      expect(wrapper.find('Gallery').props().galleryElements).toStrictEqual([]);
      expect(wrapper.find('Gallery').props().resizerURL).toEqual('https://fake.cdn.com/resizer');
      expect(wrapper.find('Gallery').props().ansId).toEqual('shdsjdhs73e34');
      expect(wrapper.find('Gallery').props().ansHeadline).toEqual('This is a headline');
      expect(wrapper.find('Gallery').props().expandPhrase).toEqual('Expand');
      expect(wrapper.find('Gallery').props().autoplayPhrase).toEqual('Autoplay');
      expect(wrapper.find('Gallery').props().pausePhrase).toEqual('Pause autoplay');
      expect(typeof wrapper.find('Gallery').props().pageCountPhrase).toEqual('function');
    });
  });
});
