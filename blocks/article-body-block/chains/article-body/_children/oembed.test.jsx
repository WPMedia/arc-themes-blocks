import React from 'react';
import { mount } from 'enzyme';
import Oembed from './oembed';

describe('the article body OEmbed component', () => {
  it('renders passed in html', () => {
    const wrapper = mount(<Oembed element={{
      raw_oembed: {
        html: '<div>Hello</div>',
      },
    }}
    />);
    expect(wrapper.html()).toContain('<div>Hello</div>');
  });
});
