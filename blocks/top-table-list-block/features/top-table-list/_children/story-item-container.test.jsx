import React from 'react';
import { mount } from 'enzyme';
import getProperties from 'fusion:properties';


describe('story item container', () => {
  it('takes in global content and properties', () => {
    jest.mock('fusion:properties', () => (jest.fn(() => ({}))));

    const { default: StoryItemContainer } = require('./story-item-container');

    const arcSite = 'the-sun';

    const globalContent = {
      headlines: {
        basic: 'sample headline',

      },
      label: {
        basic: {
          text: 'overline text',
          url: 'url',
          display: true,
        },
      },
      websites: {
        [arcSite]: '/2019/07/15/global-kitchen-sink-article',
      },
    };

    getProperties.mockImplementation(() => ({
      websiteDomain: 'https://www.thesun.com/',
      websiteName: 'The Sun',
    }));

    const wrapper = mount(<StoryItemContainer arcSite={arcSite} globalContent={globalContent} />);

    expect(wrapper.children().props().overlineText).toBe('overline text');
    expect(wrapper.children().props().overlineURL).toBe('url');
  });
  it('fails to take in global content does not exist', () => {
    const { default: StoryItemContainer } = require('./story-item-container');

    const wrapper = mount(<StoryItemContainer />);

    expect(wrapper.children().props().overlineText).toBe(undefined);
    expect(wrapper.children().props().overlineURL).toBe(undefined);
  });
});
