import React from 'react';
import { mount } from 'enzyme';

describe('story item container', () => {
  it('takes in global content and properties', () => {
    jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
  });
  it('fails to take in global content does not exist', () => {
    const { default: StoryItemContainer } = require('./story-item-container');

    const wrapper = mount(<StoryItemContainer />);

    expect(wrapper.children().props().itemTitle).toBe(undefined);
    expect(wrapper.children().props().description).toBe(undefined);
  });
});
