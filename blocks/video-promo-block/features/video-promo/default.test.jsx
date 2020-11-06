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
    });
  });

  it('should have show title, description, live label, and video with default configs', () => {
    config.live = 'testing live video label';
    const wrapper = mount(<VideoPromo customFields={config} />);
    expect(wrapper.find('h2').text()).toBe('Title');
    expect(wrapper.find('p').text()).toBe('Description');
    expect(wrapper.find('span').text()).toBe('testing live video label');
    const video = wrapper.find('#video').at(0);
    expect(video.prop('data-props')).toEqual({
      uuid: 'video-uuid',
      autoplay: false,
      aspectRatio: 0.5625,
      org: 'org',
      env: 'env',
    });
  });

  it('should NOT show live label while live customfield is emtpy', () => {
    config.live = '';
    const wrapper = mount(<VideoPromo customFields={config} />);
    expect(wrapper.find('span').text()).toBe('');
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
    });
  });

  it('should have show title, description, and video with different ratio', () => {
    config.ratio = 0.75;
    const wrapper = mount(<VideoPromo customFields={config} />);
    expect(wrapper.find('h2').text()).toBe('Title');
    expect(wrapper.find('p').text()).toBe('Description');
    const video = wrapper.find('#video').at(0);
    expect(video.prop('data-props')).toEqual({
      uuid: 'video-uuid',
      autoplay: false,
      aspectRatio: 0.75,
      org: 'org',
      env: 'env',
    });
  });

  it('should have show title, description, and video with uuid specified directly', () => {
    config.uuid = 'new-uuid';
    const wrapper = mount(<VideoPromo customFields={config} />);
    expect(wrapper.find('h2').text()).toBe('Title');
    expect(wrapper.find('p').text()).toBe('Description');
    const video = wrapper.find('#video').at(0);
    expect(video.prop('data-props')).toEqual({
      uuid: 'new-uuid',
      autoplay: false,
      aspectRatio: 0.5625,
      org: 'org',
      env: 'env',
    });
  });
});
