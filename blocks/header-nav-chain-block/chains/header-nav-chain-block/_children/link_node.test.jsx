/**
 * this is for mocking node env
 * will not have window attribute, testing ssr
 * https://jestjs.io/docs/en/configuration.html#testenvironment-string
 * @jest-environment node
 */

import { renderToString } from 'react-dom/server';
import Link from './link';

jest.mock('@wpmedia/engine-theme-sdk', () => ({
  formatURL: jest.fn((input) => (input.toString())),
}));
describe('When the link is generated SSR', () => {
  it('must add rel attriutes to external links', () => {
    const link = renderToString(Link({ href: 'https://example.com/some/page.html', name: 'Entertaiment', showSepartor: false }));
    expect(link).toMatch(/target="_blank"/);
    expect(link).toMatch(/rel="noopener noreferrer"/);
  });

  it('must add negative tab index when "isHidden" prop is truthy', () => {
    const link = renderToString(Link({
      href: 'https://example.com/some/page.html', name: 'Entertaiment', isHidden: true,
    }));
    expect(link).toMatch(/target="_blank"/);
    expect(link).toMatch(/rel="noopener noreferrer"/);
    expect(link).toMatch(/tabindex="-1"/);
  });
});
