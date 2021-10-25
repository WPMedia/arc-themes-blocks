import React from 'react';
import { mount } from 'enzyme';

import { isServerSide } from '@wpmedia/engine-theme-sdk';
import { useFusionContext } from 'fusion:context';

import usePaywall from './usePaywall';

jest.mock('@arc-publishing/sdk-identity', () => ({
  __esModule: true,
  default: {
    apiOrigin: '',
    options: jest.fn(),
  },
}));

jest.mock('@wpmedia/engine-theme-sdk', () => ({
  __esModule: true,
  isServerSide: jest.fn(() => false),
}));

jest.mock('fusion:properties', () => jest.fn(
  () => ({ // arcSite
    api: {
      retail: {
        origin: 'http://origin/',
      },
    },
  }),
));

jest.mock('fusion:context', () => ({
  __esModule: true,
  useFusionContext: jest.fn(() => ({
    arcSite: 'TestSite',
    globalContent: {
      canonical_url: 'http://canonical/',
      content_restrictions: {
        content_code: 'restriction_content_code',
      },
      taxonomy: {
        primary_section: {
          _id: 'primary_section_id',
        },
      },
      type: 'contentType',
    },
  })),
}));

global.window.ArcP = {
  _rules: [{
    e: [true],
    id: 'rule1',
    rt: ['>', 1],
  }],
  run: jest.fn((obj) => {
    obj.paywallFunction('campaign');
    return ({
      triggered: {
        e: [true],
        id: 'rule1',
        rc: 1,
      },
    });
  }),
};

const getPaywallObject = () => {
  let paywallObject;
  const Test = () => {
    paywallObject = usePaywall();
    return null;
  };
  mount(<Test />);
  return paywallObject;
};

describe('Identity usePaywall Hook', () => {
  it('initially renders with paywall flag', () => {
    const paywallObject = getPaywallObject();
    expect(paywallObject.isPaywalled).toBe(true);
  });

  it('properly initializes and sets isPaywalled true', () => {
    const paywallObject = getPaywallObject();
    expect(paywallObject.isPaywalled).toBe(true);
  });

  it('returns null if serverSide', () => {
    isServerSide.mockReturnValue(true);
    const paywallObject = getPaywallObject();
    expect(paywallObject.isPaywalled).toBe(false);
    isServerSide.mockReset();
  });

  it('returns null if there are no results', () => {
    window.ArcP.run.mockImplementationOnce(() => null);
    const paywallObject = getPaywallObject();
    expect(paywallObject.isPaywalled).toBe(false);
  });

  it('handles content without restrictions', () => {
    useFusionContext.mockReturnValue({
      arcSite: 'TestSite',
      globalContent: {
        canonical_url: 'http://canonical/',
        taxonomy: {
          primary_section: {
            _id: 'primary_section_id',
          },
        },
        type: 'contentType',
      },
    });
    const paywallObject = getPaywallObject();
    expect(paywallObject.isPaywalled).toBe(false);
    useFusionContext.mockReset();
  });
});

describe('Identity usePaywall Hook rule handling', () => {
  beforeEach(() => {
    useFusionContext.mockReturnValue({
      arcSite: 'TestSite',
      globalContent: {
        canonical_url: 'http://canonical/',
        content_restrictions: {
          content_code: 'restriction_content_code',
        },
        taxonomy: {
          primary_section: {
            _id: 'primary_section_id',
          },
        },
        type: 'contentType',
      },
    });
  });

  it('handles simple paywalled rule', () => {
    const expectedResult = {
      triggered: {
        e: [true, 'content paywall status'],
        id: 'rule1',
        rc: 2,
      },
    };

    global.window.ArcP = {
      _rules: [{
        e: [true],
        id: 'rule1',
        rt: ['>', 1],
      }],
      run: jest.fn((obj) => {
        obj.paywallFunction('campaign');
        return expectedResult;
      }),
    };

    const paywallObject = getPaywallObject();
    expect(paywallObject.isPaywalled).toBe(true);
  });

  it('handles multiple rules matching when triggered', () => {
    const expectedResult = {
      triggered: {
        e: [true],
        id: 'rule2',
        rc: 3,
      },
    };

    global.window.ArcP = {
      _rules: [{
        e: [true],
        id: 'rule1',
        rt: ['>', 1],
      }, {
        e: [true, 'content paywall status'],
        id: 'rule2',
        rt: ['>', 1],
      }],
      run: jest.fn((obj) => {
        obj.paywallFunction('campaign');
        return expectedResult;
      }),
    };

    const paywallObject = getPaywallObject();
    expect(paywallObject.isPaywalled).toBe(true);
  });

  it('handles multiple rules matching when triggered is different', () => {
    const expectedResult = {
      triggered: {
        e: [true],
        id: 'rule1',
        rc: 3,
      },
    };

    global.window.ArcP = {
      _rules: [{
        e: [true],
        id: 'rule1',
        rt: ['>', 1],
      }, {
        e: [true, 'content paywall status'],
        id: 'rule2',
        rt: ['>', 1],
      }],
      run: jest.fn((obj) => {
        obj.paywallFunction('campaign');
        return expectedResult;
      }),
    };

    const paywallObject = getPaywallObject();
    expect(paywallObject.isPaywalled).toBe(true);
  });

  afterEach(() => {
    useFusionContext.mockReset();
  });
});
