const React = require('react');
const { mount } = require('enzyme');


describe('the htmlbox block', () => {
  it('should render the embedded iframe', () => {
    const { default: HTMLBox } = require('./default');

    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        customFields: {
          HTML: '<iframe width="560" height="315" src="https://www.youtube.com/embed/TKjI4CYThjg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        },
      })),
    }));
    const wrapper = mount(<HTMLBox />);
    expect(wrapper.find(HTMLBox).children()).toHaveLength(1);
    // eslint-disable-next-line no-useless-escape
    expect(wrapper.find('div').html()).toEqual('<div><iframe width="560" height="315" src="https://www.youtube.com/embed/TKjI4CYThjg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=\"\"></iframe></div>');
  });

  it('should not render anything when no data is given', () => {
    const { default: HTMLBox } = require('./default');

    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        customFields: {},
      })),
    }));
    const wrapper = mount(<HTMLBox />);
    expect(wrapper.find(HTMLBox).children()).toHaveLength(0);
  });
});
