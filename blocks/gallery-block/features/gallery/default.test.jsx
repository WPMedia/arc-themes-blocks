// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { shallow } from 'enzyme';

jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({})),
}));

jest.mock('fusion:intl', () => ({
  __esModule: true,
  default: jest.fn((locale) => ({ t: jest.fn((phrase) => require('../../../../intl.json')[phrase][locale]) })),
}));

jest.mock('@wpmedia/engine-theme-sdk', () => ({
  LazyLoad: ({ children }) => <>{ children }</>,
}));

jest.mock('prop-types', () => ({
  bool: true,
  shape: () => {},
  contentConfig: () => {},
}));

describe('the gallery feature block', () => {
  describe('when it is configured to inherit global content', () => {
    it('should render the global content gallery', () => {
      const { default: GalleryFeature } = require('./default');
      const wrapper = shallow(<GalleryFeature customFields={{ inheritGlobalContent: true }} />);
      const galleryInstance = wrapper.find('GlobalContentGallery');
      expect(galleryInstance).toHaveLength(1);
      expect(typeof galleryInstance.props().phrases).toEqual('object');
    });
  });

  describe('when it is configured to NOT inherit global content', () => {
    it('should render the custom content gallery', () => {
      const { default: GalleryFeature } = require('./default');

      const wrapper = shallow(
        <GalleryFeature customFields={{ inheritGlobalContent: false, galleryContentConfig: {} }} />,
      );
      expect(wrapper.find('CustomContentGallery')).toHaveLength(1);
    });

    it('should pass the content config for fetching the gallery', () => {
      const { default: GalleryFeature } = require('./default');
      const wrapper = shallow(
        <GalleryFeature customFields={{ inheritGlobalContent: false, galleryContentConfig: {} }} />,
      );
      expect(wrapper.find('CustomContentGallery').props().contentConfig).toStrictEqual({});
    });
  });

  describe('when is only configured the content source', () => {
    it('should render a custom content gallery', () => {
      const { default: GalleryFeature } = require('./default');
      const wrapper = shallow(
        <GalleryFeature customFields={{ inheritGlobalContent: false, galleryContentConfig: {} }} />,
      );
      expect(wrapper.find('CustomContentGallery')).toHaveLength(1);
    });
  });

  describe('when customfields is empty', () => {
    it('should render the global content gallery', () => {
      const { default: GalleryFeature } = require('./default');
      const wrapper = shallow(<GalleryFeature customFields={{}} />);
      expect(wrapper.find('GlobalContentGallery')).toHaveLength(1);
    });
  });

  describe('when customfields is missing', () => {
    it('should render the global content gallery', () => {
      const { default: GalleryFeature } = require('./default');
      const wrapper = shallow(<GalleryFeature customFields={undefined} />);
      expect(wrapper.find('GlobalContentGallery')).toHaveLength(1);
    });
  });

  describe('when gallery is inserted use the default customFields values', () => {
    it('should render the global content gallery', () => {
      const { default: GalleryFeature } = require('./default');
      const wrapper = shallow(
        <GalleryFeature />,
      );
      expect(wrapper.find('GlobalContentGallery')).toHaveLength(1);
    });
  });
});
