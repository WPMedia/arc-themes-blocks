# Arc Themes blocks

>**[Please See Wiki If You Can't Find What You're Looking For](https://github.com/WPMedia/arc-themes-blocks/wiki), Like [Rolling Back If You Have Publish Issues](https://github.com/WPMedia/arc-themes-blocks/wiki/How-To-%22Rollback%22-From-A-Published-Version)**

This is the lerna-managed monorepo for the blocks that make up the Fusion News Theme.

This monorepo is a collection of packages for blocks. Blocks are versioned together.

**if you're looking for local news theme block development, go to [news theme development markdown doc](/News%20Theme%20Development.md)**

**if you're looking for local blocks setup instructions with the arc-themes-feature-pack, go to [the prerequisites and 9-step quick guide](https://github.com/WPMedia/arc-themes-feature-pack#prerequisites)**
## `dist-tags`


This package has been published with a number of dist-tags meant for different purposes:

- `stable`: This tag should be equivalent to `latest` and the process for maintaining parity _should_ be automated with a [Github Action workflow found here](/.github/workflows/stable-dist-tag.yml). If that workflow doesn't work or the versions tagged by `latest` and `stable` do not match you can run `npm run latest-stable-parity` to fix that.
- `beta`: These are prerelease builds published with the `npx lerna publish --preid beta --pre-dist-tag beta` command from the `beta` branch. [More information can be found here.](/News%20Theme%20Development.md#arc-themes-blocks)
- `canary`: These builds are generated with [this Github Action](/.github/workflows/canary-build.yml) on every push to the `canary` branch. These builds don't follow the normal versioning scheme, instead they are published as version `0.0.0` appended with the short commit ID for the commit being built from (ex. `0.0.0-canary`).
- `rc`: This stands for release candidate. This is not client-facing.
- `hotfix`: As you may have guessed, these builds are meant for hotfixes. [More information about how these builds are made can be found here.](/News%20Theme%20Development.md#publish-hotfix)
- `latest`: This dist tag is deprecated. As with all other NPM packages, this is the default dist-tag. Whenever a non-prerelease block gets published, it is published with this tag.

## License

Shield: [![CC BY-NC-ND 4.0][cc-by-shield]][cc-by-nc-nd]

This work is licensed under a
[Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License][cc-by-nc-nd].

[![CC BY-NC-ND 4.0][cc-by-image]][cc-by-nc-nd]

[cc-by-nc-nd]: https://creativecommons.org/licenses/by-nc-nd/4.0/
[cc-by-image]: https://licensebuttons.net/l/by-nc-nd/3.0/88x31.png
[cc-by-shield]: https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg
