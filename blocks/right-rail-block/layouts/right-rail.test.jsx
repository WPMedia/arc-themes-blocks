const React = require('react');
const { shallow } = require('enzyme');
const { default: RightRailLayout } = require('./right-rail');

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
    expect(wrapper.find('main > div.container > div.row > div.col-12').at(0)).toHaveHTML('<div class="col-12"><div id="second"></div></div>');
    expect(wrapper.find('main > div.container > div.row > div.col-8')).toHaveHTML('<div class="col-8"><div id="third"></div></div>');
    expect(wrapper.find('main > div.container > div.row > aside.col-4')).toHaveHTML('<aside class="col-4"><div id="fourth"></div></aside>');
    expect(wrapper.find('main > div.container > div.row > div.col-12').at(1)).toHaveHTML('<div class="col-12"><div id="fifth"></div></div>');
    expect(wrapper.find('footer')).toHaveHTML('<footer><div id="sixth"></div></footer>');
  });
});
