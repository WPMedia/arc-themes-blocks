import React from 'react';
import { mount } from 'enzyme';
import Heading from './heading';
import HeadingSection from './section';

jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => ({
    globalContent: {},
    arcSite: 'the-sun',
  })),
}));

jest.mock('fusion:themes', () => jest.fn(() => ({})));

describe('Heading', () => {
  it('should render as a h2', () => {
    const wrapper = mount(<Heading />);

    expect(wrapper.html()).toMatchInlineSnapshot(
      '"<h2 class=\\"sc-bdVaJa bFuGRU\\"></h2>"',
    );
  });
});

describe('HeadingSection', () => {
  it('should render as a h3', () => {
    const wrapper = mount(
      <HeadingSection>
        <Heading />
      </HeadingSection>,
    );

    expect(wrapper.html()).toMatchInlineSnapshot(
      '"<h3 class=\\"sc-bdVaJa bFuGRU\\"></h3>"',
    );
  });
  it('increases the heading level for each HeadingSection', () => {
    const wrapper = mount(
      <div>
        <Heading>h2 text</Heading>
        <HeadingSection>
          <Heading>h3 text</Heading>
        </HeadingSection>
      </div>,
    );

    expect(wrapper.html()).toMatchInlineSnapshot(
      '"<div><h2 class=\\"sc-bdVaJa bFuGRU\\">h2 text</h2><h3 class=\\"sc-bdVaJa bFuGRU\\">h3 text</h3></div>"',
    );
  });
});
