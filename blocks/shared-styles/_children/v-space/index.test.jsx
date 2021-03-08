import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import VSpace from './index';

jest.mock('@wpmedia/news-theme-css/js/framework', () => ({
  framework: {
    spacers: {
      xl: '0.75rem',
      xxl: '1rem',
    },
    gridBreakpoints: {
      xl: '1rem',
    },
  },
}));

describe('VSpace', () => {
  it('should render with defaults', () => {
    const tree = renderer.create(<VSpace />).toJSON();
    expect(tree).toHaveStyleRule('margin-bottom', '2rem', {
      modifier: '> *:not(:last-child)',
    });
    expect(tree).toHaveStyleRule('margin-bottom', '1.5rem', {
      media: 'screen and (min-width: 48rem)',
      modifier: '> *:not(:last-child)',
    });
  });

  it('uses framework values', () => {
    const tree = renderer.create(<VSpace space="xl" breakpoint="xl" breakpointSpace="xxl" />).toJSON();
    expect(tree).toHaveStyleRule('margin-bottom', '0.75rem', {
      modifier: '> *:not(:last-child)',
    });
    expect(tree).toHaveStyleRule('margin-bottom', '1rem', {
      media: 'screen and (min-width: 1rem)',
      modifier: '> *:not(:last-child)',
    });
  });
});
