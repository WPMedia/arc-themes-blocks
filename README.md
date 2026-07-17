# Arc Themes Blocks

This is the lerna-managed monorepo for the blocks that make up the Arc Themes. This monorepo is a collection of packages for blocks. Blocks are tagged together.

## Available Commands

### `npm run build-storybook`

Builds the storybook static site to the default `storybook-static` directory based on [documentation](https://www.chromatic.com/docs/cli#storybook-options). This command is exclusively used for [building the storybook static site for Chromatic](https://www.chromatic.com/docs/setup). Chromatic is used for visual regression testing within your pull request. The [GitHub Workflow](./.github/workflows/chromatic.yml) can be modified depending on potential Chromatic or Storybook updates.

### `npm run format`

Run [`prettier`](https://prettier.io/docs/en/index.html) to format all files not excluded by `.prettierignore`. The `.prettierrc.js` opts into using tabs for accessibility. See [Prettier docs](https://prettier.io/docs/en/options.html#tabs) for more information on tabs in prettier. Prettier is run on pre-commit using `lint-staged` for changed files. `npx lint-staged` is called from the [Husky pre-commit file](./.husky/pre-commit). The pre-commit hook ensures that all of the files don't need to be formatted with each iteration. I'd also encourage downloading and using [the recommended VS Code extensions configured](./.vscode/extensions.json), specifically the [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension.

### `npm run generate:chain`

The command will generate a new chain. This will create a new block folder with a chain folder containing the new chain. The prompt is available: [`_templates/chain/new`](./_templates/chain/new/prompt.js).

### `npm run generate:content-source`

The command will generate a new content source. This will create a new block folder with a content source folder containing the new `sources` folder. The prompt is available: [`_templates/content-source/new`](./_templates/content-source/new/prompt.js).

### `npm run generate:feature`

The command will generate a new feature. This will create a new block folder with a feature folder containing the new feature. The prompt is available: [`_templates/feature/new`](./_templates/feature/new/prompt.js).

### `npm run generate:feature:feature`

The command will generate a new feature within an existing feature block. Within the existing feature folder, a new feature will be created within the preexisting block. The prompt is available: [`_templates/feature/feature`](./_templates/feature/feature/prompt.js).

### `npm run generate:feature:content-source`

The command will generate a new content source within an existing feature block. Within the existing feature folder, a new content source will be created within the preexisting block. The prompt is available: [`_templates/feature/content-source`](./_templates/feature/content-source/prompt.js).

### `npm run generate:content-source:content-source`

The command will generate a new content source within an existing content source block. Within the existing content source folder, a new content source will be created within the preexisting block. The prompt is available: [`_templates/content-source/content-source`](./_templates/content-source/content-source/prompt.js).

### `npm run generate:content-source:feature`

The command will generate a new feature within an existing content source block. Within the existing content source folder, a new feature will be created within the preexisting block. The prompt is available: [`_templates/content-source/feature`](./_templates/content-source/feature/prompt.js).

### `npm i`

Install all dependencies, including nested ones. See more on [local paths](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#local-paths). The local paths are used for fusion linking. On [`postinstall`](https://docs.npmjs.com/cli/v8/using-npm/scripts#life-cycle-scripts), the `npx lerna clean -y` will run, which removes nested dependencies [docs](https://github.com/lerna/lerna/tree/main/commands/clean#readme). Any dependencies that an individual block needs, it needs to be installed at the top-level for testing to work. For example, the package `algoliasearch` will need to be installed at the [top-level](./package.json) for testing to work for the [`algolia-assortment-content-source-block`](./blocks/algolia-assortment-content-source-block/sources/algolia-assortment.js). It should also be installed in the nested block's [package.json](./blocks/algolia-assortment-content-source-block/package.json) for [installing on Fusion](https://github.com/WPMedia/fusion/blob/master/engine/src/scripts/block-installer.js#L68).

### `npm run generate:intl`

Based off of the [Lokalise](https://arcpublishing.atlassian.net/wiki/spaces/TI/pages/2538275032/Arc+Themes+Blocks+Internationalisation) structure, this generates locale files that Fusion can read for each block (e.g., Article Body Block's [intl.json](./blocks/article-body-block/intl.json)). The base translations are available within [the locale folder](./locale/). This script is also located within [the locale folder](./locale/scripts/generate-intl.js). Note that there is a block that is exclusively translations across other blocks called [Global Phrases Block](./blocks/global-phrases-block/intl.json).

### `npm run lint`

The base lint command that runs `eslint` on all `.js` and `.jsx` files in `blocks` and `.storybook` directory, excluding any files in `.eslintignore`. ESlint is used to find potential issues in code. Using VS Code, you can install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) to see lint issues in the editor.

### `npm run lint:fix`

Fixes any lint issues that can be automatically fixed from the files mentioned in `npm run lint`.

### `npm run lint:styles`

The base lint command that runs `stylelint` on `.scss` files, excluding any files in `.stylelintignore`. Stylelint is used to find potential issues in styles.

### `npm run lint:styles:fix`

Fixes any stylelint issues that can be fixed automatically from the files mentioned in `npm run lint:styles`.

### `npm run lint:changed-feature-branch`

Similar to `npm run test:changed-feature-branch`, this runs on pre-push and within the GitHub Workflow. It will run `eslint` on all code that have changed since `origin/main`. See the `.eslintignore` and the `.eslintrc.js` for the configuration.

### `npm run lint:changed-feature-branch:fix`

Using `npm run lint:changed-feature-branch` logic, but will also fix any potential problems using ESlint's [`--fix` flag](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix). Note that there are some errors and warnings that cannot be fixed automatically, so this command will not fix all issues.

### `npm run storybook`

See storybook setup below for more information. This is a helpful way of developing blocks without using Fusion. Please note the pattern used in blocks for consuming content in the [`.storybook/alias/content.js`](./.storybook/alias/content.js) file. This is a helpful way of mocking content for blocks using mocks available in the [`storybook/mock-content`](./.storybook/mock-content/footer.js) folder. There is also a pattern of mocking the content call by using presentational components with a thin wrapper. See examples at [Large Promo](./blocks/large-promo-block/features/large-promo/default.jsx) and its [Storybook file](./blocks/large-promo-block/index.story.jsx), as well as using a parent class-based component with [Alert Bar](./blocks/alert-bar-block/features/alert-bar/default.jsx) and its [Storybook file](./blocks/alert-bar-block/index.story.jsx).

### `npm run test:watch`

Run all tests for code that has changed. Will also show coverage for changed code. This is the command to run when developing. To see coverage thresholds goals, see the `jest.config.js` file `coverageThreshold` property. For more information on the `jest` configuration coverage, see [jest docs](https://jestjs.io/docs/configuration#coveragethreshold-object).

### `npm run test:changed-feature-branch`

Runs tests for all blocks that have changed since `origin/main`. This runs in the [GitHub Workflow for testing blocks on Pull Requests](./.github/workflows/test-coverage-blocks.yml). It also runs on pre-push using [Husky](https://github.com/typicode/husky#usage). Note that the Husky pre-push file is located in [root](./.husky/pre-push) and not in the package.json, per version 7 of Husky.

## Storybook Setup

1. Make sure you have an npmrc file with read-access to @wpmedia packages. This is available in your [dev settings](https://github.com/settings/tokens).
2. Create an `.npmrc` file in the root of your project.

```.npmrc
@wpmedia:registry=https://npm.pkg.github.com/
registry=https://registry.npmjs.org

//npm.pkg.github.com/:_authToken=ghp_secrettoken
```

3. `npm i` to install packages
4. `npm run storybook` to show the blocks in Storybook. For more info on Storybook, see [their documentation](https://storybook.js.org/docs/react/get-started/introduction). In confluence, we have Storybook best practices as well for themes.

## Releasing

This repo uses trunk-based development. All work is merged into `main`, and the `themesVersion` field in the root `package.json` determines which themes release version blocks are published under.

### Publishing blocks (automatic)

Every merge to `main` that changes block code (`.js`, `.jsx`, `.json`, `.scss`) triggers the [publish workflow](./.github/workflows/sync-themes-branch-with-themes-tag.yml). It reads `themesVersion` from `package.json` and publishes all changed blocks to GitHub Packages under the dist-tag `arc-themes-release-version-<themesVersion>`.

No manual steps are needed — just merge your PR and blocks are published.

### Bumping to a new themes version

When you're ready to start a new themes release (e.g., moving from `4.1.0` to `4.2.0`):

1. Create a PR that changes `themesVersion` in `package.json` from `"4.1.0"` to `"4.2.0"`
2. Merge the PR into `main`
3. The publish workflow will automatically:
   - Tag the previous version's final commit as `themes-v4.1.0`
   - Begin publishing blocks under `arc-themes-release-version-4.2.0`

That's it. The git tag provides a permanent record of exactly which commit was the last publish for each version, and can be used to view history or create hotfix branches later.

```bash
# View what shipped in a specific version
git log themes-v4.0.0..themes-v4.1.0

# View what's been published in the current version so far
git log themes-v4.1.0..main
```

### Hotfixing a previous version

Hotfixes are for the rare case when you need to patch a version you've already moved past. A dedicated [hotfix workflow](./.github/workflows/hotfix.yml) handles publishing.

1. Find the tag for the version you need to fix:
   ```bash
   git tag -l "themes-v*"
   ```

2. Create a hotfix branch from that tag:
   ```bash
   git checkout -b hotfix/4.1.0 themes-v4.1.0
   ```

3. Make your fix, commit, and push:
   ```bash
   git push -u origin hotfix/4.1.0
   ```

4. The hotfix workflow runs automatically and publishes the fix under the original dist-tag (`arc-themes-release-version-4.1.0`).

> **Note:** Hotfix branches are not merged back into `main`. If the fix is also needed on `main`, cherry-pick it into a separate PR targeting `main`.

## `dist-tags`

Please see the [release notes in Confluence](https://arcpublishing.atlassian.net/wiki/spaces/TI/pages/2344910925/Themes+Releases) if you are a Themes developer.

Blocks are published with dist-tags in the format `arc-themes-release-version-X.Y.Z`, corresponding to the `themesVersion` in `package.json` at the time of publish. These are used in the [Theme Manifest repo](https://github.com/WPMedia/arc-themes-manifests).

## License

Shield: [![CC BY-NC-ND 4.0][cc-by-shield]][cc-by-nc-nd]

This work is licensed under a
[Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License][cc-by-nc-nd]

[![CC BY-NC-ND 4.0][cc-by-image]][cc-by-nc-nd]

[cc-by-nc-nd]: https://creativecommons.org/licenses/by-nc-nd/4.0/
[cc-by-image]: https://licensebuttons.net/l/by-nc-nd/3.0/88x31.png
[cc-by-shield]: https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg
