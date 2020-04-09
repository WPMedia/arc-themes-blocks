const React = require('react');
const { mount } = require('enzyme');

jest.mock('fusion:themes', () => (jest.fn(() => ({}))));

describe('Given the display time from ANS, it should convert to the proper timezone format we want', () => {
  it('should return one author', () => {
    const { default: ArticleByline } = require('./default');
    const credits = {
      by: [{
        type: 'author',
        name: 'SangHee Kim',
        url: '/author/sanghee-kim',
      }],
    };
    const globalContent = { credits };

    const wrapper = mount(<ArticleByline globalContent={globalContent} />);
    expect(wrapper.find('span').at(1).prop('dangerouslySetInnerHTML')).toStrictEqual({ __html: ' <a href="/author/sanghee-kim">SangHee Kim</a>' });
  });

  it('should return two authors', () => {
    const { default: ArticleByline } = require('./default');
    const credits = {
      by: [
        {
          type: 'author',
          name: 'SangHee Kim',
          url: '/author/sanghee-kim',
        }, {
          type: 'author',
          name: 'Sara Carothers',
          url: '/author/sara-carothers',
        },
      ],
    };
    const globalContent = { credits };

    const wrapper = mount(<ArticleByline globalContent={globalContent} />);
    expect(wrapper.find('span').at(1).prop('dangerouslySetInnerHTML')).toStrictEqual({ __html: '<a href="/author/sanghee-kim">SangHee Kim</a> and <a href="/author/sara-carothers">Sara Carothers</a>' });
  });

  it('should return three authors, oxford comma', () => {
    const { default: ArticleByline } = require('./default');
    const credits = {
      by: [
        {
          type: 'author',
          name: 'SangHee Kim',
          url: '/author/sanghee-kim',
        }, {
          type: 'author',
          name: 'Joe Grosspietsch',
          url: '/author/joe-grosspietsch',
        }, {
          type: 'author',
          name: 'Brent Miller',
          url: '/author/brent-miller',
        },
      ],
    };
    const globalContent = { credits };

    const wrapper = mount(<ArticleByline globalContent={globalContent} />);
    expect(wrapper.find('span').at(1).prop('dangerouslySetInnerHTML')).toStrictEqual({ __html: ' <a href="/author/sanghee-kim">SangHee Kim</a>, <a href="/author/joe-grosspietsch">Joe Grosspietsch</a> and <a href="/author/brent-miller">Brent Miller</a>' });
  });

  it('should return four authors, oxford comma', () => {
    const { default: ArticleByline } = require('./default');
    const credits = {
      by: [
        {
          type: 'author',
          name: 'SangHee Kim',
          url: '/author/sanghee-kim',
        }, {
          type: 'author',
          name: 'Joe Grosspietsch',
          url: '/author/joe-grosspietsch',
        }, {
          type: 'author',
          name: 'Brent Miller',
          url: '/author/brent-miller',
        }, {
          type: 'author',
          name: 'Sara Carothers',
          url: '/author/sara-carothers',
        },
      ],
    };
    const globalContent = { credits };

    const wrapper = mount(<ArticleByline globalContent={globalContent} />);
    expect(wrapper.find('span').at(1).prop('dangerouslySetInnerHTML')).toStrictEqual({ __html: ' <a href="/author/sanghee-kim">SangHee Kim</a>, <a href="/author/joe-grosspietsch">Joe Grosspietsch</a>, <a href="/author/brent-miller">Brent Miller</a> and <a href="/author/sara-carothers">Sara Carothers</a>' });
  });


  it('should return 4 authors complete with url and bylines', () => {
    const { default: ArticleByline } = require('./default');
    const credits = {
      by: [
        {
          type: 'author',
          name: 'SangHee Kim',
          url: '/author/sanghee-kim',
          additional_properties: {
            original: {
              byline: 'SangHee Kim Byline',
            },
          },
        }, {
          type: 'author',
          name: 'Joe Grosspietsch',
          url: '/author/joe-grosspietsch',
          additional_properties: {
            original: {
              byline: 'Joe Grosspietsch Byline',
            },
          },
        }, {
          type: 'author',
          name: 'Brent Miller',
          url: '/author/brent-miller',
          additional_properties: {
            original: {
              byline: 'Brent Miller Byline',
            },
          },
        }, {
          type: 'author',
          name: 'Sara Carothers',
          url: '/author/sara-carothers',
          additional_properties: {
            original: {
              byline: 'Sara Lynn Carothers',
            },
          },
        },
      ],
    };
    const globalContent = { credits };

    const wrapper = mount(<ArticleByline globalContent={globalContent} />);
    expect(wrapper.find('span').at(1).prop('dangerouslySetInnerHTML')).toStrictEqual({ __html: ' <a href="/author/sanghee-kim">SangHee Kim</a>, <a href="/author/joe-grosspietsch">Joe Grosspietsch</a>, <a href="/author/brent-miller">Brent Miller</a> and <a href="/author/sara-carothers">Sara Carothers</a>' });
  });

  it('should not throw by undefined error if empty global content object', () => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({ globalContent: {} })),
    }));
    const { default: ArticleByline } = require('./default');


    expect(() => {
      mount(<ArticleByline />);
    }).not.toThrow((TypeError("Cannot read property 'credits' of undefined")));
  });

  it('should return null if no authors found', () => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({ globalContent: {} })),
    }));
    const { default: ArticleByline } = require('./default');

    const wrapper = mount(<ArticleByline />);
    expect(wrapper).toBeEmptyRender();
  });
});
