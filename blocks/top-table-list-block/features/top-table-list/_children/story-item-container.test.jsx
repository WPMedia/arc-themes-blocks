import React from 'react';
import { mount } from 'enzyme';
import getProperties from 'fusion:properties';

const config = {
  showOverlineXL: true,
  showHeadlineXL: true,
  showImageXL: true,
  showDescriptionXL: true,
  showBylineXL: true,
  showDateXL: true,
  showOverlineLG: true,
  showHeadlineLG: true,
  showImageLG: true,
  showDescriptionLG: true,
  showBylineLG: true,
  showDateLG: true,
  showHeadlineMD: true,
  showImageMD: true,
  showDescriptionMD: true,
  showBylineMD: true,
  showDateMD: true,
  showHeadlineSM: true,
  showImageSM: true,
};
describe('story item container', () => {
  it('takes in global content and properties', () => {
    jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
    const { default: StoryItemContainer } = require('./story-item-container');

    const arcSite = 'the-sun';

    const element = {
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

    const wrapper = mount(<StoryItemContainer arcSite={arcSite} element={element} />);

    expect(wrapper.children().props().overlineText).toBe('overline text');
    expect(wrapper.children().props().overlineURL).toBe('url');
  });
  it('fails to take in global content does not exist', () => {
    const { default: StoryItemContainer } = require('./story-item-container');

    const wrapper = mount(<StoryItemContainer customFields={config} />);

    expect(wrapper.children().props().overlineText).toBe(undefined);
    expect(wrapper.children().props().overlineURL).toBe(undefined);
  });
});
