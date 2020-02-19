import React from 'react';
import { shallow } from 'enzyme';

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
    });
  });

  describe('when it is configured to NOT inherit global content', () => {
    it('should render the global content gallery', () => {
      const { default: GalleryFeature } = require('./default');

      const wrapper = shallow(<GalleryFeature customFields={{ inheritGlobalContent: false, galleryContentConfig: {} }} />);
      expect(wrapper.is('CustomContentGallery')).toBeTruthy();
    });

    it('should pass the content config for fetching the gallery', () => {
      const { default: GalleryFeature } = require('./default');
      const wrapper = shallow(<GalleryFeature customFields={{ inheritGlobalContent: false, galleryContentConfig: {} }} />);
      expect(wrapper.props()).toStrictEqual({ contentConfig: {} });
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
});
