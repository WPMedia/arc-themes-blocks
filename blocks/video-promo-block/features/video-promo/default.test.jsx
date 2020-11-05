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
      content_elements: [
        {
          _id: 'L57RVT4465HMBKL5T26NBBFBNI',
          type: 'text',
          additional_properties: {
            comments: [],
            inline_comments: [],
            _id: 1563473120767,
          },
          content: 'This is a test article that has all kinds of different element types in it. You should see each element type appear below the bolded text.',
        },
        {
          _id: 'E3ZIEEQTXBCWVFPN6DWSGAORE4',
          type: 'text',
          additional_properties: {
            comments: [],
            inline_comments: [],
            _id: 1563473120768,
          },
          content: '<b>Text (two paragraphs with HTML)</b>',
        },
        {
          _id: 'HAPKPWEE3ZDV3AEQI6IJHA4S24',
          type: 'text',
          additional_properties: {
            comments: [],
            inline_comments: [],
            _id: 1563473120769,
          },
          content: 'Lorem ipsum <u>dolor sit amet</u>, consectetur adipiscing elit. <i>Nunc nulla ligula</i>, lobortis egestas urna vel, <a href="https://www.lipsum.com/feed/html" target=_blank>pulvinar dapibus nunc</a>. Nulla rutrum, l<b>igula ac rutrum tempor</b>, erat lectus posuere ipsum, quis facilisis velit neque quis erat. Proin massa massa, suscipit et pretium vitae, posuere non turpis.',
        },
        {
          _id: 'HAPKPWEE3ZDV3AEQI6IJHA4S25',
          type: 'text',
          additional_properties: {
            comments: [],
            inline_comments: [],
            _id: 1563473120770,
          },
          content: 'Lorem ipsum <u>dolor sit amet</u>, consectetur adipiscing elit. <i>Nunc nulla ligula</i>, lobortis egestas urna vel, <a href="https://www.lipsum.com/feed/html" target=_blank>pulvinar dapibus nunc</a>. Nulla rutrum, l<b>igula ac rutrum tempor</b>, erat lectus posuere ipsum, quis facilisis velit neque quis erat. Proin massa massa, suscipit et pretium vitae, posuere non turpis.',
        },
      ],
    },
    customFields: {
      elementPlacement: { 1: 2, 2: 1 },
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
    config.live = true;
    const wrapper = mount(<VideoPromo customFields={config} />);
    expect(wrapper.find('h2').text()).toBe('Title');
    expect(wrapper.find('p').text()).toBe('Description');
    expect(wrapper.find('span').text()).toBe('LIVE VIDEO');
    const video = wrapper.find('#video').at(0);
    expect(video.prop('data-props')).toEqual({
      uuid: 'video-uuid',
      autoplay: false,
      aspectRatio: 0.5625,
      org: 'org',
      env: 'env',
    });
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
});
