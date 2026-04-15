# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Lerna-managed monorepo (`packages: ["blocks/*"]`, `version: "independent"`) of React blocks for Arc XP Themes, consumed by Arc XP's Fusion PageBuilder. Each block is its own npm package published to GitHub Packages (`@wpmedia/*` on `https://npm.pkg.github.com/`).

Active release branch is named `arc-themes-release-version-X.Y.Z` (currently `arc-themes-release-version-4.1.0`). The branch name is also used as the npm dist-tag when blocks are published — both CI-published and manually published versions must carry a dist-tag matching the release branch so Fusion can resolve them.

## Common Commands

- `npm i` — installs top-level deps; `postinstall` runs `npx lerna clean -y` to remove nested `node_modules` (block deps are linked as `file:` paths from the root `package.json`).
- `npm test` / `npm run test:watch` / `npm run test:coverage` — Jest. Use `npm run test:changed-feature-branch` to mirror CI (`jest --changedSince=origin/arc-themes-release-version-4.1.0`). Run a single test file with `npx jest path/to/file.test.jsx`.
- `npm run lint` / `npm run lint:fix` / `npm run lint:styles` / `npm run lint:styles:fix`.
- `npm run lint:changed-feature-branch` — mirrors the pre-push hook and CI; diffs against `origin/arc-themes-release-version-4.1.0`.
- `npm run storybook` — local dev for blocks without Fusion. `npm run build-storybook` is used by Chromatic CI.
- `npm run generate:feature` / `generate:content-source` / `generate:chain` (plus `:feature` and `:content-source` sub-variants for nesting inside an existing block) — Hygen generators backed by templates in `_templates/`.
- `npm run generate:intl` — regenerates per-block `intl.json` from translation sources in `locale/`.

When bumping the release branch version (e.g. 4.1.0 → 4.1.1), update the `--changedSince` refs in the `lint:changed-feature-branch` and `test:changed-feature-branch` scripts in `package.json`.

## Architecture

### Block layout
A block directory typically contains:
- `package.json` — independent version; `publishConfig` points to `https://npm.pkg.github.com/`. Dependencies that a block actually uses must *also* be listed at the root `package.json` (for Jest/Storybook to resolve them after `lerna clean`) and in the block's own `package.json` (for Fusion's block-installer).
- One or more of: `features/`, `chains/`, `layouts/`, `output-types/`, `sources/` (content sources), `_children/`, `components/`, `utils/`, `themes/`.
- `intl.json` — generated, do not hand-edit (see `locale/scripts/generate-intl.js`).
- `index.story.jsx` — Storybook entry.
- `README.md`, `jest.config.js` — per-block Jest config exists but is currently overridden by the root `jest.config.js` (the `projects` line is commented out).

Jest's `collectCoverageFrom` only pulls from the canonical directories listed above, so new code must live in one of them to count toward coverage thresholds (53/66/44/54 statements/branches/functions/lines — enforced globally in `jest.config.js`).

### Linking for Fusion
The root `package.json` lists every block under `dependencies` as `file:blocks/<name>`. Add new blocks to this list so Fusion can pick them up via its block-installer. Fusion's installer also requires the block's own `package.json` to declare any external deps explicitly (the root-only pattern won't work for Fusion).

### Publishing
- **Automatic:** merges into the release branch trigger a Lerna publish with conventional-commit-driven versioning (`lerna.json` → `command.publish`).
- **Manual (for testing unpublished blocks in local Fusion):** from the block directory, `npm publish --tag arc-themes-release-version-X.Y.Z`. GitHub Packages disallows republishing the same version — bump with `npm version <next> --no-git-tag-version` and republish. Old versions can be deleted via the GitHub Packages UI or `gh api --method DELETE orgs/WPMedia/packages/npm/<name>/versions/<id>` (requires `delete:packages` scope).
- `.npmrc` at the repo root must contain a GitHub PAT with `read:packages` (for install) or `write:packages` (for publish) against the `WPMedia` org.

### Testing & CI
- Pre-commit: `lint-staged` runs Prettier via Husky.
- Pre-push: `lint:changed-feature-branch` + `test:changed-feature-branch`.
- GitHub Actions in `.github/workflows/`: `test-coverage-blocks.yml` (Jest), `chromatic.yml` (visual regression via Storybook build), `stylelint-pr.yml`, plus branch-sync and release utilities.

## Conventions

- Prettier is configured to use **tabs** (accessibility reasons, see `.prettierrc.js`).
- ESLint extends `airbnb`; `lint:changed-feature-branch` uses `--max-warnings 0`, so warnings fail CI on changed files.
- Stylelint runs against `**/*.scss` using `stylelint-config-sass-guidelines` plus logical-property and browser-support plugins.
- React 19 is pinned (`19.2.3`).
