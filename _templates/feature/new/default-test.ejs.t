---
# helper funcs https://www.hygen.io/docs/templates/#helpers-and-inflections
to: blocks/<%= h.inflection.dasherize(block_name) %>-block/features/<%= h.inflection.dasherize(block_name) %>/default.test.jsx
---
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import <%= h.changeCase.pascal(block_name) %> from './default';

describe('<%= h.changeCase.title( block_name ) %>', () => {
  it('should render', () => {
    const { unmount } = render(<<%= h.changeCase.pascal(block_name) %> />);
    expect(screen.queryByText('Hello')).toBeInTheDocument();
    unmount();
  });
});
