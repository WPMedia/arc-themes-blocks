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

    expect(wrapper.find('.embed-responsive-16by9').length).toEqual(0);
    expect(wrapper.html()).toContain('<div>Hello</div>');
  });

  it('renders wide css class if type youtube', () => {
    const wrapper = mount(
      <Oembed
        element={{
          type: 'oembed_response',
          subtype: 'youtube',
          _id: '3OYDYWUAK5D4XP5WJ6PLS4KHYQ',
          raw_oembed: {
            html: '<iframe width="480" height="270" src="https://www.youtube.com/embed/817CYL6KuGo?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
          },
        }}
      />,
    );

    expect(wrapper.find('.embed-responsive-16by9').length).toEqual(1);
  });
});
