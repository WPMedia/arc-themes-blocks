const React = require('react');
const { shallow } = require('enzyme');
const { default: RightRailLayout } = require('./default');

describe('the right rail layout for the default output type', () => {
  it('should place the child nodes into the right places', () => {
    const wrapper = shallow(
      <RightRailLayout>
        <div id="first" />
        <div id="second" />
        <div id="third" />
        <div id="fourth" />
        <div id="fifth" />
        <div id="sixth" />
      </RightRailLayout>,
    );

    expect(wrapper.find('header')).toHaveHTML('<header><div id="first"></div></header>');
    expect(wrapper.find('footer')).toHaveHTML('<footer><div id="sixth"></div></footer>');
  });
});
