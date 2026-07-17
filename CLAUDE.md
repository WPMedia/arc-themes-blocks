# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A Lerna monorepo of ~79 Arc Themes blocks published to GitHub Packages (`@wpmedia/*`). Blocks are React components that run inside Arc's Fusion rendering engine. The repo uses independent versioning per block, but all blocks are published together under a shared themes release dist-tag.

## Commands

```bash
npm run test                       # Run all tests (jest)
npm run test -- --testPathPattern=blocks/header-block  # Run tests for one block
npm run test:watch                 # Watch mode with coverage for changed files
npm run test:changed-feature-branch # Tests for files changed vs origin/main

npm run lint                       # ESLint all blocks
npm run lint:changed-feature-branch # ESLint only files changed vs origin/main
npm run lint:styles                # Stylelint all SCSS
npm run lint:styles:fix            # Auto-fix SCSS issues

npm run storybook                  # Dev server on port 6006
npm run format                     # Prettier (uses tabs)
```

## Release Process

Trunk-based development on `main`. The `themesVersion` field in root `package.json` controls which dist-tag blocks publish under (e.g., `"themesVersion": "4.1.0"` → dist-tag `arc-themes-release-version-4.1.0`).

- **Every merge to `main`** that touches block code auto-publishes via `lerna publish --canary`
- **Version bump**: change `themesVersion` in a PR; on merge the workflow auto-tags the previous version (e.g., `themes-v4.1.0`) and starts publishing under the new one
- **Hotfix**: create `hotfix/X.Y.Z` branch from the `themes-vX.Y.Z` tag, push fix, it auto-publishes

## Architecture

### Block Types

Blocks live in `blocks/` and come in four types, each with a corresponding subdirectory:
- **features/** — UI components (header, promo cards, article body)
- **chains/** — layout containers that wrap features
- **sources/** — content sources that fetch data from Arc APIs
- **output-types/** — page-level output wrappers

### Block Structure

Each block is an independent npm package (`@wpmedia/<name>`) with:
- `features/` or `chains/` or `sources/` containing `default.jsx` + `default.test.jsx`
- `_index.scss` — styles using BEM naming (`b-block-name`, `b-block-name--variant`)
- `themes/*.json` — theme token mappings (news.json, commerce.json)
- `intl.json` — i18n translations (generated from `locale/` via `npm run generate:intl`)
- `jest.config.js` — extends `../../jest/jest.config.base`
- `index.story.jsx` — Storybook story

### Fusion Integration

Blocks import from virtual Fusion modules that don't exist on disk — they're provided by the Fusion runtime and mocked in tests via babel module-resolver (`babel.config.js` → `jest/mocks/`):
- `fusion:content` — `useContent`, `useEditableContent`
- `fusion:context` — `useFusionContext`, `useAppContext`
- `fusion:properties` — `getProperties`
- `fusion:environment` — `RESIZER_TOKEN_VERSION`, `resizerKey`, etc.
- `fusion:intl` — `usePhrases`

### Shared Dependencies

- `@wpmedia/arc-themes-components` — shared component library (LazyLoad, Image, etc.)
- `@arc-fusion/prop-types` — prop-type helpers with `.tag()` for PageBuilder metadata and `.contentConfig()` for content source config

### Testing Patterns

Tests use React Testing Library. Common mocking pattern:
```js
jest.mock("fusion:content", () => ({ useContent: jest.fn(() => ({})) }));
jest.mock("@wpmedia/arc-themes-components", () => ({
  ...jest.requireActual("@wpmedia/arc-themes-components"),
  isServerSide: jest.fn(() => false),
  LazyLoad: ({ children }) => children,
}));
```

### Styling Rules

- CSS logical properties are enforced (use `margin-inline-start` not `margin-left`)
- Max nesting depth: 5
- No vendor prefixes
- `border: none` is disallowed (use `border: 0`)
- SCSS `@include` calls on the parent selector must precede nested `&` rules (sass 1.92+ hoisting requirement)

### Code Generation

New blocks are scaffolded with hygen: `npm run generate:feature`, `npm run generate:chain`, `npm run generate:content-source`. Variants exist for adding features/sources to existing blocks.
