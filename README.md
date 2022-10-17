# Arc Themes Blocks

This is the lerna-managed monorepo for the blocks that make up the Arc Themes. This monorepo is a collection of packages for blocks. Blocks are tagged together.

Documentation is located in the [Themes Internal confluence for internal themes developers](https://arcpublishing.atlassian.net/wiki/spaces/TI/pages/2341405138/Development+Information+Guides).

## Available Commands

### `npm i`

Install all dependencies, including nested ones. See more on [local paths](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#local-paths). The local paths are used for fusion linking. On [`postinstall`](https://docs.npmjs.com/cli/v8/using-npm/scripts#life-cycle-scripts), the `npx lerna clean -y` will run, which removes nested dependencies [docs](https://github.com/lerna/lerna/tree/main/commands/clean#readme). Any dependencies that an individual block needs, it needs to be installed at the top-level for testing to work. For example, the package `algoliasearch` will need to be installed at the [top-level](./package.json) for testing to work for the [`algolia-assortment-content-source-block`](./blocks/algolia-assortment-content-source-block/sources/algolia-assortment.js). It should also be installed in the nested block's [package.json](./blocks/algolia-assortment-content-source-block/package.json) for [installing on Fusion](https://github.com/WPMedia/fusion/blob/master/engine/src/scripts/block-installer.js#L68).

### `npm run lint`

The base lint command that runs `eslint` on all `.js` and `.jsx` files in `blocks` and `.storybook` directory, excluding any files in `.eslintignore`. ESlint is used to find potential issues in code. Using VS Code, you can install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) to see lint issues in the editor.

### `npm run lint:fix`

Fixes any lint issues that can be fixed automatically from the files mentioned in `npm run lint`.

### `npm run lint:styles`

The base lint command that runs `stylelint` on `.scss` files, excluding any files in `.stylelintignore`. Stylelint is used to find potential issues in styles.

### `npm run test:watch`

Run all tests for code that has changed. Will also show coverage for changed code. This is the command to run when developing. To see coverage thresholds goals, see the `jest.config.js` file `coverageThreshold` property. For more information on the `jest` configuration coverage, see [jest docs](https://jestjs.io/docs/configuration#coveragethreshold-object).

### `npm run test:changed-feature-branch`

Similar to `npm run test:watch`, but will run tests for all blocks that have changed since the last commit on the target release branch. This should be updated with each new version `"jest --changedSince=origin/arc-themes-release-version-2.0.3 --coverage --passWithNoTests",` -> `"jest --changedSince=origin/arc-themes-release-version-2.0.4 --coverage --passWithNoTests",` for `2.0.3` -> `2.0.4`. This runs in the [GitHub Workflow for testing blocks on Pull Requests](./.github/workflows/test-coverage-blocks.yml). It also runs on pre-push using [Husky](https://github.com/typicode/husky#usage). Note that the Husky pre-push file is located in [root](./.husky/pre-push) and not in the package.json, per version 7 of Husky.

### `npm run lint:changed-feature-branch`

Similar to `npm run test:changed-feature-branch`, this runs on pre-push and within the GitHub Workflow. It will run `eslint` on all code that have changed since the last commit on the target release branch. See the `.eslintignore` and the `.eslintrc.js` for the configuration.

### `npm run lint:changed-feature-branch:fix`

Using `npm run lint:changed-feature-branch` logic, but will also fix any potential problems using ESlint's [`--fix` flag](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix). Note that there are some errors and warnings that cannot be fixed automatically, so this command will not fix all issues.

### `npm run format`

Run [`prettier`](https://prettier.io/docs/en/index.html) to format all files not excluded by `.prettierignore`. The `.prettierrc.js` opts into using tabs for accessibility. See [Prettier docs](https://prettier.io/docs/en/options.html#tabs) for more information on tabs in prettier. Prettier is run on pre-commit using `lint-staged` for changed files. `npx lint-staged` is called from the [Husky pre-commit file](./.husky/pre-commit). The pre-commit hook ensures that all of the files don't need to be formatted with each iteration. I'd also encourage downloading and using [the recommended VS Code extensions configured](./.vscode/extensions.json), specifically the [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension.

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

## `dist-tags`

Please see the release notes in Confluence if you are a Themes developer.

This package has been published with a number of dist-tags meant for different purposes:

- `arc-themes-release-version-X.XX` - These are versioned versions of all blocks for a given release cycle

## License

Shield: [![CC BY-NC-ND 4.0][cc-by-shield]][cc-by-nc-nd]

This work is licensed under a
[Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License][cc-by-nc-nd].

[![CC BY-NC-ND 4.0][cc-by-image]][cc-by-nc-nd]

[cc-by-nc-nd]: https://creativecommons.org/licenses/by-nc-nd/4.0/
[cc-by-image]: https://licensebuttons.net/l/by-nc-nd/3.0/88x31.png
[cc-by-shield]: https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg
