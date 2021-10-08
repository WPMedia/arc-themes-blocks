import React from 'react';
import { mount, shallow } from 'enzyme';

import { isServerSide } from '@wpmedia/engine-theme-sdk';

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
  useFusionContext: () => ({
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
  }),
}));

global.window.ArcP = {
  _rules: [{
    e: ['e1', 'e2'],
    id: 'rule1',
    rt: [1, 2, 3, 4, 5],
  }, {
    e: ['e2'],
    id: 'rule2',
    rt: [1, 2, 3, 4, 5],
  }, {
    e: ['e3'],
    id: 'rule3',
    rt: [1, 2, 3, 4, 5],
  }],
  run: jest.fn((obj) => {
    obj.paywallFunction('campaign');
    return ({
      triggered: {
        e: ['e1'],
        id: 'rule1',
        rc: 1, // read count
      },
    });
  }),
};

describe('Identity usePaywall Hook', () => {
  it('returns null if serverSide', () => {
    isServerSide.mockReturnValue(true);

    const Test = () => {
      const paywallObject = usePaywall();
      return (
        <div>
          { paywallObject?.isPaywalled ? <div className="isPaywalled" /> : null }
        </div>
      );
    };
    const wrapper = shallow(<Test />);
    expect(wrapper.find('.isPaywalled').length).toBe(0);

    isServerSide.mockReset();
  });

  it('initially renders with paywall flag', async () => {
    const Test = () => {
      const paywallObject = usePaywall();
      return (
        <div>
          { paywallObject?.isPaywalled ? <div className="isPaywalled" /> : null }
        </div>
      );
    };
    const wrapper = mount(<Test />);
    await expect(wrapper.find('.isPaywalled').length).toBe(1);
  });

  it('properly initializes and sets isPaywalled true', () => {
    const Test = () => {
      const paywallObject = usePaywall();
      return (
        <div>
          { paywallObject?.isPaywalled ? <div className="isPaywalled" /> : null }
        </div>
      );
    };
    mount(<Test />);
    expect(window.ArcP.run).toHaveLastReturnedWith(
      expect.objectContaining({ triggered: { e: ['e1'], id: 'rule1', rc: 1 } }),
    );
  });

  it('handles rule1', () => {
    const expectedResult = {
      triggered: {
        e: ['e1', 'e2'],
        id: 'rule1',
        rc: 2,
      },
    };

    window.ArcP.run.mockImplementation((obj) => {
      obj.paywallFunction('campaign');
      return (expectedResult);
    });

    const Test = () => {
      const paywallObject = usePaywall();
      if (paywallObject.results) {
        expect(paywallObject).toHaveProperty('results', expectedResult);
      }
      return <div />;
    };
    mount(<Test />);
    expect(window.ArcP.run).toHaveLastReturnedWith(
      expect.objectContaining(expectedResult),
    );
  });

  it('handles rule2 (newTriggeredRule)', () => {
    const expectedResult = {
      triggered: {
        e: ['e1', 'e2'],
        id: 'rule2',
        rc: 3,
      },
    };

    window.ArcP.run.mockImplementation((obj) => {
      obj.paywallFunction('campaign');
      return (expectedResult);
    });

    const Test = () => {
      const paywallObject = usePaywall();
      if (paywallObject.results) {
        expect(paywallObject).toHaveProperty('results', expectedResult);
      }
      return <div />;
    };
    mount(<Test />);
    expect(window.ArcP.run).toHaveLastReturnedWith(
      expect.objectContaining(expectedResult),
    );
  });

  it('handles rule3 (newOtherTriggeredRules)', () => {
    const expectedResult = {
      triggered: {
        e: ['e3'],
        id: 'rule3',
        rc: 1,
      },
    };

    window.ArcP.run.mockImplementation((obj) => {
      obj.paywallFunction('campaign');
      return (expectedResult);
    });

    const Test = () => {
      const paywallObject = usePaywall();
      if (paywallObject.results) {
        expect(paywallObject).toHaveProperty('results', expectedResult);
      }
      return <div />;
    };
    mount(<Test />);
    expect(window.ArcP.run).toHaveLastReturnedWith(
      expect.objectContaining(expectedResult),
    );
  });

  it('getRegistrationRules returns a value', async () => {
    const Test = () => {
      const paywallObject = usePaywall();
      const registrationRules = paywallObject.getRegistrationRules();
      return (
        <div>
          { paywallObject?.isPaywalled ? <div className="isPaywalled" /> : null }
          { registrationRules?.length ? <div className="registrationRules" /> : null }
        </div>
      );
    };
    const wrapper = shallow(<Test />);
    await expect(wrapper.find('.registrationRules').length).toBe(1);
  });

  it('getSubscribeRules returns a value', async () => {
    const Test = () => {
      const paywallObject = usePaywall();
      const subscribeRules = paywallObject.getSubscribeRules();
      return (
        <div>
          { paywallObject?.isPaywalled ? <div className="isPaywalled" /> : null }
          { subscribeRules?.length ? <div className="subscribeRules" /> : null }
        </div>
      );
    };
    const wrapper = shallow(<Test />);
    await expect(wrapper.find('.subscribeRules').length).toBe(1);
  });
});
