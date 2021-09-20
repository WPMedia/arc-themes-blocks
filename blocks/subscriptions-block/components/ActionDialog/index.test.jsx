import React from 'react';
import { mount } from 'enzyme';
import ActionDialog from '.';

describe('ActionDialog', () => {
  it('renders with minimal required properties', () => {
    const wrapper = mount(
      <ActionDialog
        linkText="Log in"
        linkUrl="/"
      />,
    );

    expect(wrapper.find('a').at(0).text()).toEqual('Log in');
    expect(wrapper.find('a').at(0).prop('href')).toEqual('/');
  });

  it('renders the button as a link', () => {
    const wrapper = mount(
      <ActionDialog
        linkText="Log in"
        linkUrl="/"
        linkAriaLabel="aria label"
        actionText="Press Me!"
        actionUrl="/"
      />,
    );

    expect(wrapper.find('a').at(1).text()).toEqual('Press Me!');
    expect(wrapper.find('a').at(1).prop('href')).toEqual('/');
  });

  it('renders the headers', () => {
    const wrapper = mount(
      <ActionDialog
        linkText="Log in"
        linkUrl="/"
        headlineText="Headline 1"
        subHeadlineText="Headline 2"
      />,
    );

    expect(wrapper.find('.xpmedia-action-dialog-headline').at(0).text()).toEqual('Headline 1');
    expect(wrapper.find('.xpmedia-action-dialog-subheadline').at(0).text()).toEqual('Headline 2');
  });

  it('renders the reason', () => {
    const wrapper = mount(
      <ActionDialog
        linkText="Log in"
        linkUrl="/"
        reasonPromptText="You need to do this."
      />,
    );

    expect(wrapper.find('.xpmedia-action-dialog-reason-prompt').at(0).text()).toEqual('You need to do this.');
  });

  it('renders the link prompt text', () => {
    const wrapper = mount(
      <ActionDialog
        linkText="Log in"
        linkUrl="/"
        linkPromptText="You should log in."
      />,
    );

    expect(wrapper.find('.xpmedia-action-dialog-link-prompt-pre-link').at(0).text()).toEqual('You should log in.');
  });
});
