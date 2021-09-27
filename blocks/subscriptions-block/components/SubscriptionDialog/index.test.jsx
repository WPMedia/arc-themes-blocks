import React from 'react';
import { mount } from 'enzyme';
import SubscriptionDialog from '.';

describe('SubscriptionDialog', () => {
  it('renders with minimal required properties', () => {
    const wrapper = mount(
      <SubscriptionDialog
        linkText="Log in"
        linkUrl="/"
      />,
    );

    expect(wrapper.find('a').at(0).text()).toEqual('Log in');
    expect(wrapper.find('a').at(0).prop('href')).toEqual('/');
  });

  it('renders the button as a link', () => {
    const wrapper = mount(
      <SubscriptionDialog
        linkText="Log in"
        linkUrl="/"
        actionText="Press Me!"
        actionUrl="/"
      />,
    );

    expect(wrapper.find('a').at(1).text()).toEqual('Press Me!');
    expect(wrapper.find('a').at(1).prop('href')).toEqual('/');
  });

  it('does not render if required action part is missing', () => {
    const wrapper = mount(
      <SubscriptionDialog
        linkText="Log in"
        linkUrl="/"
        actionText="Press Me!"
      />,
    );

    expect(wrapper.find('a').length).toEqual(1);
  });

  it('does not render if other required action part is missing', () => {
    const wrapper = mount(
      <SubscriptionDialog
        linkText="Log in"
        linkUrl="/"
        actionUrl="/"
      />,
    );

    expect(wrapper.find('a').length).toEqual(1);
  });

  it('renders the headline', () => {
    const wrapper = mount(
      <SubscriptionDialog
        linkText="Log in"
        linkUrl="/"
        headline="Headline 1"
      />,
    );

    expect(wrapper.find('.xpmedia-subscription-dialog-headline').at(0).text()).toEqual('Headline 1');
  });

  it('renders the subheadlines', () => {
    const wrapper = mount(
      <SubscriptionDialog
        linkText="Log in"
        linkUrl="/"
        subHeadline="Headline 2"
      />,
    );

    expect(wrapper.find('.xpmedia-subscription-dialog-subheadline').at(0).text()).toEqual('Headline 2');
  });

  it('renders the reason', () => {
    const wrapper = mount(
      <SubscriptionDialog
        linkText="Log in"
        linkUrl="/"
        reasonPrompt="You need to do this."
      />,
    );

    expect(wrapper.find('.xpmedia-subscription-dialog-reason-prompt').at(0).text()).toEqual('You need to do this.');
  });

  it('renders the link prompt text', () => {
    const wrapper = mount(
      <SubscriptionDialog
        linkText="Log in"
        linkUrl="/"
        linkPrompt="You should log in."
      />,
    );

    expect(wrapper.find('.xpmedia-subscription-dialog-link-prompt-pre-link').at(0).text()).toEqual('You should log in.');
  });
});
