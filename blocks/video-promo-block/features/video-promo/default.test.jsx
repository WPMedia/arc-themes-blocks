import React from 'react';
import { mount } from 'enzyme';
import VideoPromo from './default';

jest.mock('@wpmedia/engine-theme-sdk', () => ({
  Video: (props) => <div id="video" data-props={props} />,
}));
jest.mock('fusion:themes', () => (jest.fn(() => ({
  'primary-font-family': 'primary',
  'secondary-font-family': 'secondary',
}))));
jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
jest.mock('fusion:content', () => ({
  useContent: jest.fn(() => ({
    _id: 'video-uuid',
  })),
}));
jest.mock('fusion:environment', () => ({
  videoOrg: 'org',
  videoEnv: 'env',
}));

jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({
    arcSite: 'the-sun',
    globalContent: {
      _id: '22ACHIRFI5CD5GRFON6AL3JSJE',
      type: 'story',
      version: '0.10.2',
      promo_items: {
        lead_art: {
          type: 'video',
          headline: {
            basic: 'global content headline',
          },
          description: {
            basic: 'global content description',
          },
          _id: 'global-content-id',
        },
      },
    },
  })),
}));

describe('the video promo feature', () => {
  let config;

  afterEach(() => {
    jest.resetModules();
  });

  beforeEach(() => {
    config = {
      itemContentConfig: { contentService: 'ans-item', contentConfiguration: {} },
      title: 'Title',
      description: 'Description',
      inheritGlobalContent: false,
    };
  });

  it('should have show title, description, and video with default configs', () => {
    const wrapper = mount(<VideoPromo customFields={config} />);
    expect(wrapper.find('h2').text()).toBe('Title');
    expect(wrapper.find('p').text()).toBe('Description');
    const video = wrapper.find('#video').at(0);
    expect(video.prop('data-props')).toEqual({
      uuid: 'video-uuid',
      autoplay: false,
      aspectRatio: 0.5625,
      org: 'org',
      env: 'env',
      playthrough: false,
    });
  });

  it('should have show title, description, alert badge, and video with default configs', () => {
    config.alertBadge = 'testing alert badge video label';
    const wrapper = mount(<VideoPromo customFields={config} />);
    expect(wrapper.find('h2').text()).toBe('Title');
    expect(wrapper.find('p').text()).toBe('Description');
    expect(wrapper.find('span').text()).toBe('testing alert badge video label');
    const video = wrapper.find('#video').at(0);
    expect(video.prop('data-props')).toEqual({
      uuid: 'video-uuid',
      autoplay: false,
      aspectRatio: 0.5625,
      org: 'org',
      env: 'env',
      playthrough: false,
    });
  });

  it('should NOT show alert badge while its customfield is emtpy', () => {
    config.alertBadge = '';
    const wrapper = mount(<VideoPromo customFields={config} />);
    expect(wrapper.find('span').length).toEqual(0);
  });

  it('should have show title, description, and video with autoplay', () => {
    config.autoplay = true;
    const wrapper = mount(<VideoPromo customFields={config} />);
    expect(wrapper.find('h2').text()).toBe('Title');
    expect(wrapper.find('p').text()).toBe('Description');
    const video = wrapper.find('#video').at(0);
    expect(video.prop('data-props')).toEqual({
      uuid: 'video-uuid',
      autoplay: true,
      aspectRatio: 0.5625,
      org: 'org',
      env: 'env',
      playthrough: false,
    });
  });

  it('should use globalContent for video while inherit global content is checked in customfields', () => {
    config.inheritGlobalContent = true;
    const wrapper = mount(<VideoPromo customFields={config} />);
    expect(wrapper.find('h2').text()).toBe('global content headline');
    expect(wrapper.find('p').text()).toBe('global content description');
    const video = wrapper.find('#video').at(0);
    expect(video.prop('data-props')).toEqual({
      uuid: 'global-content-id',
      autoplay: false,
      aspectRatio: 0.5625,
      org: 'org',
      env: 'env',
      playthrough: false,
    });
  });

  it('should playthrough video', () => {
    config.playthrough = true;
    const wrapper = mount(<VideoPromo customFields={config} />);
    expect(wrapper.find('h2').text()).toBe('Title');
    expect(wrapper.find('p').text()).toBe('Description');
    const video = wrapper.find('#video').at(0);
    expect(video.prop('data-props')).toEqual({
      uuid: 'video-uuid',
      autoplay: false,
      aspectRatio: 0.5625,
      org: 'org',
      env: 'env',
      playthrough: true,
    });
  });
});
