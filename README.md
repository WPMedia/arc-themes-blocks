# Arc Themes Blocks

This is the lerna-managed monorepo for the blocks that make up the Arc Themes. This monorepo is a collection of packages for blocks. Blocks are tagged together.

Documentation is located in the Themes Internal confluence for internal themes developers.

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
