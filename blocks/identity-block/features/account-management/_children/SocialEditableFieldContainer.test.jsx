import React from 'react';
import { mount } from 'enzyme';
import SocialEditableFieldContainer from './SocialEditableFieldContainer';

describe('SocialEditableFieldContainer', () => {
  it('should render with disconnect option when connected', () => {
    const wrapper = mount(<SocialEditableFieldContainer
      text="Connected user"
      onDisconnectFunction={() => {}}
      showDisconnectButton
      disconnectText="disconnect test"
    />);
    expect(wrapper.find('button').text()).toBe('disconnect test');

    // added space is for formatting with the disconenct button
    expect(wrapper.find('span').text()).toBe('Connected user ');
  });
  it('should render without disconnect when disconnected', () => {
    const wrapper = mount(<SocialEditableFieldContainer
      text="Disconnected user"
      onDisconnectFunction={() => {}}
      showDisconnectButton={false}
      disconnectText="disconnect test"
    />);

    expect(wrapper.find('button').length).toBe(0);
    // no added space is for formatting without the disconenct button
    expect(wrapper.find('span').text()).toBe('Disconnected user');
  });
});
