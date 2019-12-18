import React from 'react';
import { shallow } from 'enzyme';

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

      jest.mock('@arc-test-org/engine-theme-sdk', () => ({
        Gallery: (props, children) => (<div {...props}>{ children }</div>),
      }));

      const { default: GlobalContentGallery } = require('./global-content');

      const wrapper = shallow(<GlobalContentGallery />);
      expect(wrapper.find('Gallery').props()).toStrictEqual(
        {
          galleryElements: [
            {
              caption: 'my cool caption',
              subtitle: 'my cool subtitle',
            },
          ],
        },
      );
    });
  });

  describe('when there is no array of content elements', () => {
    it('should load content from global content', () => {
      jest.mock('fusion:context', () => ({
        useAppContext: jest.fn(() => ({
          globalContent: {},
        })),
      }));

      jest.mock('@arc-test-org/engine-theme-sdk', () => ({
        Gallery: (props, children) => (<div {...props}>{ children }</div>),
      }));

      const { default: GlobalContentGallery } = require('./global-content');

      const wrapper = shallow(<GlobalContentGallery />);
      expect(wrapper.find('Gallery').props()).toStrictEqual(
        {
          galleryElements: [],
        },
      );
    });
  });

  describe('when there is no global content object', () => {
    it('should load content from global content', () => {
      jest.mock('fusion:context', () => ({
        useAppContext: jest.fn(() => ({})),
      }));

      jest.mock('@arc-test-org/engine-theme-sdk', () => ({
        Gallery: (props, children) => (<div {...props}>{ children }</div>),
      }));

      const { default: GlobalContentGallery } = require('./global-content');

      const wrapper = shallow(<GlobalContentGallery />);
      expect(wrapper.find('Gallery').props()).toStrictEqual(
        {
          galleryElements: [],
        },
      );
    });
  });
});
