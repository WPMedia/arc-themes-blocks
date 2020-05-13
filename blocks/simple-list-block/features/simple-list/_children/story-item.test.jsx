import React from 'react';
import { mount } from 'enzyme';
import StoryItem from './story-item';

jest.mock('fusion:properties', () => (jest.fn(() => ({
  fallbackImage: 'placeholder.jpg',
}))));

describe('Story item', () => {
  it('renders title if title provided', () => {
    const testText = 'Man Bites Dog';
    const wrapper = mount(<StoryItem itemTitle={testText} showHeadline showImage />);
    expect(wrapper.text()).toBe(testText);
  });
  it('renders placeholder if no props provided', () => {
    const wrapper = mount(<StoryItem />);

    expect(wrapper.find('.simple-list-placeholder').length).toBe(1);
  });
  it('renders no title if no title provided', () => {
    const wrapper = mount(<StoryItem />);

    expect(wrapper.text()).toBe('');
  });
  it('renders an image when you pass one in', () => {
    const imageURL = 'https://en.wikipedia.org/wiki/The_Washington_Post#/media/File:Washington_Post_building.jpg';

    const wrapper = mount(<StoryItem imageURL={imageURL} showHeadline showImage />);
    expect(wrapper.find('.simple-list-placeholder').length).toBe(0);
    expect(wrapper.find('img').length).toBe(1);
  });
});
