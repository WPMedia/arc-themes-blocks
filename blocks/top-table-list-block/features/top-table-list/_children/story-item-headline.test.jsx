import React from 'react';
import { mount } from 'enzyme';
import StoryItemHeadline from './story-item-headline';

describe('story-item-image', () => {
  it('default to position headline to right while no customfield available ', () => {
    const mockProps = {
      itemTitle: 'mockTitle',
      primaryFont: 'arial',
      websiteURL: 'https://mockSite.org',
      customFields: {},
    };
    // eslint-disable-next-line react/jsx-props-no-spreading
    const wrapper = mount(<StoryItemHeadline {...mockProps} />);
    expect(wrapper.find('.margin-sm-left').length).toEqual(0);
  });

  it('render margin class name while headline imageposition set to left ', () => {
    const mockProps = {
      itemTitle: 'mockTitle',
      primaryFont: 'arial',
      websiteURL: 'https://mockSite.org',
      customFields: { imagePosition: 'left' },
    };
    // eslint-disable-next-line react/jsx-props-no-spreading
    const wrapper = mount(<StoryItemHeadline {...mockProps} />);
    expect(wrapper.find('.margin-sm-left').length).toEqual(1);
  });
});
