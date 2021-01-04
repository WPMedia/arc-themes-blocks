// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { shallow } from 'enzyme';

jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({})),
}));

jest.mock('@wpmedia/intl-block', () => ({
  __esModule: true,
  default: jest.fn((locale) => ({ t: jest.fn((phrase) => require('../../../../intl.json')[phrase][locale]) })),
}));

// two classes for testing purposes
jest.mock('./_children/global-content', () => class GlobalContentGallery {});
jest.mock('./_children/custom-content', () => class CustomContentGallery {});
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
      expect(wrapper.is('GlobalContentGallery')).toBeTruthy();
      expect(typeof wrapper.props().phrases).toEqual('object');
    });
  });

  describe('when it is configured to NOT inherit global content', () => {
    it('should render the custom content gallery', () => {
      const { default: GalleryFeature } = require('./default');

      const wrapper = shallow(
        <GalleryFeature customFields={{ inheritGlobalContent: false, galleryContentConfig: {} }} />,
      );
      expect(wrapper.is('CustomContentGallery')).toBeTruthy();
    });

    it('should pass the content config for fetching the gallery', () => {
      const { default: GalleryFeature } = require('./default');
      const wrapper = shallow(
        <GalleryFeature customFields={{ inheritGlobalContent: false, galleryContentConfig: {} }} />,
      );
      expect(wrapper.props().contentConfig).toStrictEqual({});
    });
  });

  describe('when is only configured the content source', () => {
    it('should render a custom content gallery', () => {
      const { default: GalleryFeature } = require('./default');
      const wrapper = shallow(
        <GalleryFeature customFields={{ galleryContentConfig: {} }} />,
      );
      expect(wrapper.is('CustomContentGallery')).toBeTruthy();
    });
  });

  describe('when customfields is empty', () => {
    it('should render the global content gallery', () => {
      const { default: GalleryFeature } = require('./default');
      const wrapper = shallow(<GalleryFeature customFields={{}} />);
      expect(wrapper.is('GlobalContentGallery')).toBeTruthy();
    });
  });

  describe('when customfields is missing', () => {
    it('should render the global content gallery', () => {
      const { default: GalleryFeature } = require('./default');
      const wrapper = shallow(<GalleryFeature customFields={undefined} />);
      expect(wrapper.is('GlobalContentGallery')).toBeTruthy();
    });
  });

  describe('when gallery is inserted use the default customFields values', () => {
    it('should render the global content gallery', () => {
      const { default: GalleryFeature } = require('./default');
      const wrapper = shallow(
        <GalleryFeature />,
      );
      expect(wrapper.is('GlobalContentGallery')).toBeTruthy();
    });
  });
});
