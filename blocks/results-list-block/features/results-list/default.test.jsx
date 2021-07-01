import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useFusionContext } from 'fusion:context';

import ResultsList from './default';

jest.mock('./results', () => ({
  __esModule: true,
  default: () => <div>Results</div>,
}));

jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(),
}));

describe('Results List', () => {
  it('should render Results if not lazy', () => {
    useFusionContext.mockReturnValue({
      customFields: {
        lazyLoad: false,
      },
      isAdmin: false,
    });

    const { unmount } = render(<ResultsList />);
    expect(screen.queryByText('Results')).toBeInTheDocument();
    unmount();
  });

  it('should render Results if lazy', () => {
    useFusionContext.mockReturnValue({
      customFields: {
        lazyLoad: true,
      },
      isAdmin: false,
    });

    const { unmount } = render(<ResultsList />);
    expect(screen.queryByText('Results')).toBeInTheDocument();
    unmount();
  });
});
