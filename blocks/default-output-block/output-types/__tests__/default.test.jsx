/**
 * this is for mocking node env
 * will not have window attribute, testing ssr
 * https://jestjs.io/docs/en/configuration.html#testenvironment-string
 * @jest-environment node
 */
import React from 'react';
import { shallow } from 'enzyme';

const dummyComp = () => <meta content="dummy" />;
const mockFuntions = {
  Libs: dummyComp,
  CssLinks: dummyComp,
  Fusion: dummyComp,
};

describe('the default output type', () => {
  beforeAll(() => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        globalContent: {},
        arcSite: 'the-sun',
      })),
    }));

    jest.mock('react-dom/server', () => ({
      renderToString: jest.fn().mockReturnValue('<meta />'),
    }));

    jest.mock('fusion:properties', () => (jest.fn(() => ({
      websiteName: 'The Sun',
      twitterUsername: 'thesun',
      dangerouslyInjectJS: [],
      websiteDomain: '',
      fallbackImage: '/resources/placeholder.jpg',
      resizerURL: 'resizer',
    }))));
  });
  afterAll(() => {
    jest.resetModules();
  });

  it('should render', () => {
    const { default: DefaultOutputType } = require('../default');
    const wrapper = shallow(
      <DefaultOutputType deployment={jest.fn()} metaValue={jest.fn()} {...mockFuntions} />,
    );
    expect(wrapper).toBeDefined();
  });
});

describe('renders a page', () => {
  beforeAll(() => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        globalContent: {},
        arcSite: 'the-sun',
      })),
    }));

    jest.mock('react-dom/server', () => ({
      renderToString: jest.fn().mockReturnValue('<meta />'),
    }));

    jest.mock('fusion:properties', () => (jest.fn(() => ({
      websiteName: 'The Sun',
      twitterUsername: 'thesun',
      dangerouslyInjectJS: [],
      websiteDomain: '',
      fallbackImage: '/resources/placeholder.jpg',
      resizerURL: 'resizer',
    }))));
  });
  afterAll(() => {
    jest.resetModules();
  });

  it('should have a head', () => {
    const { default: DefaultOutputType } = require('../default');
    const wrapper = shallow(
      <DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} {...mockFuntions} />,
    );
    expect(wrapper.find('head').length).toBe(1);
  });

  it('should have a body', () => {
    const { default: DefaultOutputType } = require('../default');
    const wrapper = shallow(
      <DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} {...mockFuntions} />,
    );
    expect(wrapper.find('body').length).toBe(1);
    expect(wrapper.find('body #fusion-app').length).toBe(1);
  });

  it('should have script tags', () => {
    const { default: DefaultOutputType } = require('../default');
    const wrapper = shallow(
      <DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} {...mockFuntions} />,
    );
    expect(wrapper.find('script').length).toBe(3);
  });

  it('should have link tags', () => {
    const { default: DefaultOutputType } = require('../default');
    const wrapper = shallow(
      <DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} {...mockFuntions} />,
    );
    expect(wrapper.find('link').length).toBe(2);
  });

  it('should have a MedataData component', () => {
    const { default: DefaultOutputType } = require('../default');
    const wrapper = shallow(
      <DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} {...mockFuntions} />,
    );
    expect(wrapper.find('MetaData').length).toBe(1);
  });

  it('MedataData should receive twitterUsername', () => {
    const { default: DefaultOutputType } = require('../default');
    const wrapper = shallow(
      <DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} {...mockFuntions} />,
    );
    expect(wrapper.find('MetaData').prop('twitterUsername')).toEqual('thesun');
  });
});

describe('root html layout', () => {
  beforeAll(() => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        globalContent: {},
        arcSite: 'the-sun',
      })),
    }));

    jest.mock('react-dom/server', () => ({
      renderToString: jest.fn().mockReturnValue('<meta />'),
    }));

    jest.mock('fusion:properties', () => (jest.fn(() => ({
      websiteName: 'The Sun',
      twitterUsername: 'thesun',
      dangerouslyInjectJS: [],
      websiteDomain: '',
      fallbackImage: '/resources/placeholder.jpg',
      resizerURL: 'resizer',
    }))));
  });
  afterAll(() => {
    jest.resetModules();
  });

  it('html must have only head and body tags', () => {
    const { default: DefaultOutputType } = require('../default');
    const wrapper = shallow(
      <DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} {...mockFuntions} />,
    );
    const html = wrapper.find('html');
    expect(html.length).toBe(1);
    expect(html.children().length).toBe(2);
    expect(html.children('head').length).toBe(1);
    expect(html.children('body').length).toBe(1);
  });
});

describe('head content', () => {
  beforeAll(() => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        globalContent: {},
        arcSite: 'the-sun',
      })),
    }));

    jest.mock('react-dom/server', () => ({
      renderToString: jest.fn().mockReturnValue('<meta />'),
    }));

    jest.mock('fusion:properties', () => (jest.fn(() => ({
      websiteName: 'The Sun',
      twitterUsername: 'thesun',
      dangerouslyInjectJS: ['alert("hello world");'],
      websiteDomain: '',
      fallbackImage: '/resources/placeholder.jpg',
      resizerURL: 'resizer',
      gtmID: 'GTM-12345ID',
      gaID: 'UA-6789ID',
      fontUrl: 'https://fonts.googleapis.com/css?family=Open Sans',
    }))));
  });
  afterAll(() => {
    jest.resetModules();
  });

  it('must render Google Tag Manager script', () => {
    const { default: DefaultOutputType } = require('../default');
    const wrapper = shallow(
      <DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} {...mockFuntions} />,
    );
    expect(wrapper.find('script').at(0).html()).toMatch(/GTM-12345ID/);
    expect(wrapper.find('body > noscript').html()).toMatch(/GTM-12345ID/);
  });

  it('must render Google Analytics script', () => {
    const { default: DefaultOutputType } = require('../default');
    const wrapper = shallow(
      <DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} {...mockFuntions} />,
    );
    expect(wrapper.find('script').at(1).html()).toMatch(/UA-6789ID/);
  });

  it('must render custom script', () => {
    const { default: DefaultOutputType } = require('../default');
    const wrapper = shallow(
      <DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} {...mockFuntions} />,
    );
    expect(wrapper.find('script').at(5).html()).toMatch(/hello world/);
  });

  it('must render custom font url', () => {
    const { default: DefaultOutputType } = require('../default');
    const wrapper = shallow(
      <DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} {...mockFuntions} />,
    );
    expect(wrapper.find('link').at(2).html()).toMatch(/fonts.googleapis/);
  });

  it('must not render nested scripts', () => {
    const { default: DefaultOutputType } = require('../default');
    const wrapper = shallow(
      <DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} {...mockFuntions} />,
    );
    const scripts = wrapper.find('script');
    for (let i = 0; i < scripts.length; i += 1) {
      expect(scripts.at(i).html().match(/<script[^>]*>.*?<script/gs)).toBeNull();
    }
  });

  it('must not render nativo script', () => {
    const { default: DefaultOutputType } = require('../default');
    const wrapper = shallow(
      <DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} {...mockFuntions} />,
    );
    expect(wrapper.find('script[data-integration="nativo-ad"]').length).toBe(0);
  });
});

describe('nativo ad integration', () => {
  beforeAll(() => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        globalContent: {},
        arcSite: 'the-sun',
      })),
    }));

    jest.mock('react-dom/server', () => ({
      renderToString: jest.fn().mockReturnValue('<meta />'),
    }));

    jest.mock('fusion:properties', () => (jest.fn(() => ({
      websiteName: 'The Sun',
      twitterUsername: 'thesun',
      dangerouslyInjectJS: ['alert("hello world");'],
      websiteDomain: '',
      fallbackImage: '/resources/placeholder.jpg',
      resizerURL: 'resizer',
      gtmID: 'GTM-12345ID',
      gaID: 'UA-6789ID',
      fontUrl: 'https://fonts.googleapis.com/css?family=Open Sans',
      nativoIntegration: true,
    }))));
  });
  afterAll(() => {
    jest.resetModules();
  });

  it('must add Nativo Ad script when is enabled on the properties', () => {
    const { default: DefaultOutputType } = require('../default');
    const wrapper = shallow(
      <DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} {...mockFuntions} />,
    );
    expect(wrapper.find('script[data-integration="nativo-ad"]').length).toBe(1);
  });
});

describe('head content without properties', () => {
  beforeAll(() => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        globalContent: {},
        arcSite: 'the-sun',
      })),
    }));

    jest.mock('react-dom/server', () => ({
      renderToString: jest.fn().mockReturnValue('<meta />'),
    }));

    jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
  });
  afterAll(() => {
    jest.resetModules();
  });

  it('must not render chartbeat code', () => {
    const { default: DefaultOutputType } = require('../default');
    const wrapper = shallow(
      <DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} {...mockFuntions} />,
    );
    expect(wrapper.find('script[data-integration="chartbeat"]').length).toBe(0);
  });
});

describe('chartbeat render conditions', () => {
  beforeAll(() => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        globalContent: {},
        arcSite: 'the-sun',
      })),
    }));

    jest.mock('react-dom/server', () => ({
      renderToString: jest.fn().mockReturnValue('<meta />'),
    }));
  });
  afterAll(() => {
    jest.resetModules();
  });

  it('must not render chartbeat code when properties are missing', () => {
    jest.mock('fusion:properties', () => (jest.fn(() => ({}))));

    const { default: DefaultOutputType } = require('../default');
    const wrapper = shallow(
      <DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} {...mockFuntions} />,
    );
    expect(wrapper.find('script[data-integration="chartbeat"]').length).toBe(0);
  });

  it('must not render chartbeat code when chartBeatAccountId property is missing', () => {
    jest.mock('fusion:properties', () => (jest.fn(() => ({
      chartBeatDomain: 'example.com',
    }))));

    const { default: DefaultOutputType } = require('../default');
    const wrapper = shallow(
      <DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} {...mockFuntions} />,
    );
    expect(wrapper.find('script[data-integration="chartbeat"]').length).toBe(0);
  });

  it('must not render chartbeat code when chartBeatDomain property is missing', () => {
    jest.mock('fusion:properties', () => (jest.fn(() => ({
      chartBeatAccountId: 994949,
    }))));

    const { default: DefaultOutputType } = require('../default');
    const wrapper = shallow(
      <DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} {...mockFuntions} />,
    );
    expect(wrapper.find('script[data-integration="chartbeat"]').length).toBe(0);
  });

  it('must not render chartbeat code when both properties are empty', () => {
    jest.mock('fusion:properties', () => (jest.fn(() => ({
      chartBeatAccountId: '',
      chartBeatDomain: '',
    }))));

    const { default: DefaultOutputType } = require('../default');
    const wrapper = shallow(
      <DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} {...mockFuntions} />,
    );
    expect(wrapper.find('script[data-integration="chartbeat"]').length).toBe(0);
  });

  it('must render chartbeat code when chartBeatDomain and chartBeatAccountID properties are present', () => {
    jest.mock('fusion:properties', () => (jest.fn(() => ({
      chartBeatAccountId: 994949,
      chartBeatDomain: 'example.com',
    }))));

    const { default: DefaultOutputType } = require('../default');
    const wrapper = shallow(
      <DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} {...mockFuntions} />,
    );
    expect(wrapper.find('script[data-integration="chartbeat"]').length).toBe(1);
  });
});

describe('comscore render conditions', () => {
  beforeAll(() => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        globalContent: {},
        arcSite: 'the-sun',
      })),
    }));

    jest.mock('react-dom/server', () => ({
      renderToString: jest.fn().mockReturnValue('<meta />'),
    }));
  });
  afterAll(() => {
    jest.resetModules();
  });

  it('must not render comscore code when property is missing', () => {
    jest.mock('fusion:properties', () => (jest.fn(() => ({}))));

    const { default: DefaultOutputType } = require('../default');
    const wrapper = shallow(
      <DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} {...mockFuntions} />,
    );
    expect(wrapper.find('script[data-integration="comscore"]').length).toBe(0);
    expect(wrapper.find('noscript[data-integration="comscore"]').length).toBe(0);
  });

  it('must render comscore code when comscoreID site property is present', () => {
    jest.mock('fusion:properties', () => (jest.fn(() => ({
      comscoreID: 88776655,
    }))));

    const { default: DefaultOutputType } = require('../default');
    const wrapper = shallow(
      <DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} {...mockFuntions} />,
    );
    expect(wrapper.find('script[data-integration="comscore"]').length).toBe(1);
    expect(wrapper.find('noscript[data-integration="comscore"]').length).toBe(1);
  });
});

describe('queryly render conditions', () => {
  beforeAll(() => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({
        globalContent: {},
        arcSite: 'the-sun',
      })),
    }));

    jest.mock('react-dom/server', () => ({
      renderToString: jest.fn().mockReturnValue('<meta />'),
    }));
  });
  afterAll(() => {
    jest.resetModules();
  });

  it('must not render Queryly code when property is missing', () => {
    jest.mock('fusion:properties', () => (jest.fn(() => ({}))));

    const { default: DefaultOutputType } = require('../default');
    const wrapper = shallow(
      <DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} {...mockFuntions} />,
    );
    expect(wrapper.find('script[data-integration="queryly"]').length).toBe(0);
  });

  it('must render Queryly code when querylyId site property is present', () => {
    jest.mock('fusion:properties', () => (jest.fn(() => ({
      querylyId: 88776655,
    }))));

    const { default: DefaultOutputType } = require('../default');
    const wrapper = shallow(
      <DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('article')} {...mockFuntions} />,
    );
    expect(wrapper.find('script[data-integration="queryly"]').length).toBe(2);
  });

  it('must render Queryly advanced search when page type is search-queryly', () => {
    jest.mock('fusion:properties', () => (jest.fn(() => ({
      querylyId: 88776655,
    }))));

    const { default: DefaultOutputType } = require('../default');
    const wrapper = shallow(
      <DefaultOutputType deployment={jest.fn()} metaValue={jest.fn().mockReturnValue('queryly-search')} {...mockFuntions} />,
    );
    expect(wrapper.find('script[data-integration="queryly"]').length).toBe(3);
  });
});
