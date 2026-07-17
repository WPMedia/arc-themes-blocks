# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Testing
npm test                                # run all tests
npm run test:coverage                   # run with coverage report
npm run test:watch                      # watch mode (only changed files)
npm run test:changed-feature-branch    # test only files changed vs origin/arc-themes-release-version-4.1.0

# Run a single test file
npx jest blocks/large-promo-block/features/large-promo/default.test.jsx

# Linting
npm run lint                            # ESLint on blocks/ and .storybook/
npm run lint:fix                        # auto-fix lint issues
npm run lint:changed-feature-branch    # lint only changed files vs origin branch

# Formatting
npm run format                          # Prettier (uses tabs, width 100)

# Storybook
npm run storybook                       # dev server on port 6006
npm run build-storybook                 # static build for Chromatic

# Code generation (Hygen templates)
npm run generate:chain                  # scaffold a new chain block
npm run generate:feature                # scaffold a new feature block
npm run generate:content-source         # scaffold a new content source block
```

Node version: 20 (see `.nvmrc`).

## Architecture

### Monorepo Structure

This is a Lerna monorepo of 78 independent npm packages under `blocks/`. Each package (`@wpmedia/*-block`) is a self-contained **Arc XP Fusion block** published to GitHub's npm registry.

The four block types:

| Type | Location within block | Purpose |
|---|---|---|
| **Feature** | `features/<name>/default.jsx` | Leaf React components rendered on a page |
| **Chain** | `chains/<name>/default.jsx` | Compositions that arrange features/children |
| **Layout** | `layouts/<name>/default.jsx` | Full-page structural wrappers with named sections |
| **Content Source** | `sources/<name>.js` | Data-fetching functions (not React components) |

A single block package can contain multiple of these types. Block-level `package.json` files list which directories to publish (`features`, `chains`, `layouts`, `sources`, `themes`, `_index.scss`, `intl.json`).

### Fusion Framework Integration

Blocks run inside **Arc XP Fusion**, which injects framework dependencies via `fusion:*` import aliases. These are never installed as npm packages — Fusion resolves them at runtime:

- `fusion:content` — `useContent()`, `useEditableContent()` hooks for fetching CMS data
- `fusion:context` — `useFusionContext()`, `useComponentContext()`, `useAppContext()`
- `fusion:properties` — `getProperties()` for site-specific configuration
- `fusion:environment` — env vars like `CONTENT_BASE`, `RESIZER_TOKEN_VERSION`
- `fusion:themes` — theme injection
- `fusion:intl` — i18n phrase lookups

In tests, `babel.config.js` aliases these to mocks under `jest/mocks/`. In Storybook, `.storybook/alias/` provides stubs. When writing tests, mock them with `jest.mock("fusion:properties", () => jest.fn(() => ({ ... })))`.

### Component Library

All feature/chain/layout components import UI primitives from `@wpmedia/arc-themes-components` (a peer dependency, not in this repo). Import everything from that single package: `Image`, `Heading`, `Link`, `Stack`, `Grid`, `usePhrases`, `formatURL`, etc.

### Feature Component Pattern

Feature components separate data-fetching from presentation:
- The **default export** is the Fusion-connected component that calls `useContent()` and `getProperties()`, then passes resolved data as props.
- A named **`*Presentation`** export is the pure React component used in tests and Storybook.

```jsx
export const LargePromoPresentation = ({ contentHeading, ... }) => { ... };

const LargePromo = (props) => {
  const content = useContent({ ... });
  return <LargePromoPresentation contentHeading={content?.headlines?.basic} ... />;
};

export default LargePromo;
```

### Content Sources

Content source files export a plain object (not a React component):

```js
export default {
  fetch: (params, { cachedCall }) => Promise,
  params: [{ name: "query", displayName: "Query", type: "text" }],
  schemaName: "ans-feed",
};
```

### Static Properties for Fusion Registration

Fusion discovers blocks by scanning the filesystem; there is no explicit registry. Components declare metadata via static properties:

```jsx
Component.label = "Large Promo – Arc Block";
Component.icon = "picture-feature";
Component.propTypes = { customFields: PropTypes.shape({ ... }) };
// Layouts and chains also declare:
Component.sections = ["navigation", "body", "footer"];
```

### Theming

Each block has `themes/news.json` and `themes/commerce.json` defining CSS variable overrides per theme. Styles use a BEM-like class naming: blocks use a `BLOCK_CLASS_NAME` constant (`b-<block-name>`).

### Internationalization

Each block has an `intl.json` file with phrase keys and translations. Phrases are consumed via `usePhrases()` from `@wpmedia/arc-themes-components`. The source of truth is Lokalise; `npm run generate:intl` regenerates `intl.json` files from `locale/`.

### Testing Conventions

- Test files live **co-located** with source: `default.test.jsx` next to `default.jsx`
- Test the **`*Presentation`** component, not the default Fusion-connected export
- Use React Testing Library with semantic queries (`screen.getByRole`, `screen.getByText`)
- Each block has its own `jest.config.js` that extends `../../jest/jest.config.base.js`
- `jest.resetModules()` runs `beforeEach` — each test gets a fresh module registry
- Coverage thresholds enforced globally: 53% statements, 66% branches, 44% functions, 54% lines

### Code Generation

The Hygen generators under `_templates/` scaffold complete block packages including component, test, Storybook story, SCSS, `package.json`, `intl.json`, and `jest.config.js`. Always prefer generating a new block via `npm run generate:*` rather than copying manually.
