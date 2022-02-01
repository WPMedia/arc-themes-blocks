import React from 'react';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

jest.mock('@wpmedia/placeholder-image-block', () => ({
  __esModule: true,
  // eslint-disable-next-line react/jsx-filename-extension
  default: function PlaceholderImage() { return <img alt="placeholder" />; },
}));

beforeEach(() => {
  jest.resetModules();
});
