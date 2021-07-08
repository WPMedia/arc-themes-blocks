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
    useFusionContext.mockReturnValue({ isAdmin: false });
    const customFields = { lazyLoad: false };

    const { unmount } = render(<ResultsList customFields={customFields} />);
    expect(screen.queryByText('Results')).toBeInTheDocument();
    unmount();
  });

  it('should render Results if lazy', () => {
    useFusionContext.mockReturnValue({ isAdmin: false });
    const customFields = { lazyLoad: true };

    const { unmount } = render(<ResultsList customFields={customFields} />);
    expect(screen.queryByText('Results')).toBeInTheDocument();
    unmount();
  });
});
