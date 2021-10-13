import React from 'react';
import { mount } from 'enzyme';
import GridList from '.';

describe('GridList', () => {
  it('renders three children', () => {
    const wrapper = mount(
      <GridList>
        <div />
        <div />
        <div />
      </GridList>,
    );

    expect(wrapper.find('.xpmedia-subscription-grid-list').exists()).toBe(true);
    expect(wrapper.find('.xpmedia-subscription-grid-list--4').exists()).toBe(false);
  });

  it('renders four children', () => {
    const wrapper = mount(
      <GridList>
        <div />
        <div />
        <div />
        <div />
      </GridList>,
    );

    expect(wrapper.find('.xpmedia-subscription-grid-list').exists()).toBe(true);
    expect(wrapper.find('.xpmedia-subscription-grid-list--4').exists()).toBe(true);
  });

  it('renders five children', () => {
    const wrapper = mount(
      <GridList>
        <div />
        <div />
        <div />
        <div />
        <div />
      </GridList>,
    );

    expect(wrapper.find('.xpmedia-subscription-grid-list').exists()).toBe(true);
    expect(wrapper.find('.xpmedia-subscription-grid-list--5').exists()).toBe(true);
  });
});
