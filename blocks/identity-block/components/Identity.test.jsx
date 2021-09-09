import React from 'react';
import { mount } from 'enzyme';

import IdentityObject from '@arc-publishing/sdk-identity';

import useIdentity from './Identity';

jest.mock('@arc-publishing/sdk-identity', () => ({
  __esModule: true,
  default: {
    apiOrigins: 'http://origin/',
    options: jest.fn(),
  },
}));

jest.mock('fusion:properties', () => jest.fn(
  () => ({ // arcSite
    api: {
      identity: {
        origin: 'http://origin/',
      },
    },
  }),
));

jest.mock('fusion:context', () => ({
  __esModule: true,
  useFusionContext: () => ({
    arcSite: 'Test Site',
  }),
}));

describe('Identity useIdentity Hook', () => {
  it('returns itself and initializes', () => {
    const testInitialization = jest.fn();

    const Test = () => {
      const {
        Identity,
        isInitialized,
      } = useIdentity();

      expect(Identity).toBe(IdentityObject);

      testInitialization(isInitialized);

      return <div />;
    };

    mount(<Test />);

    expect(testInitialization).toHaveBeenCalledWith(false);
    expect(testInitialization).toHaveBeenLastCalledWith(true);
  });
});
