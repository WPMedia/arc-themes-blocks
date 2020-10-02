# News Theme Developers Guide

**Note:** _This is a living document. Please check back for updates. Also, comments are very much appreciated to make this documentation better!_

## Setup

All of the themes-related packages reside in GitHub as GitHub Packages. This means that you are now able to manage the packages directly in GitHub (for example, this repo's packages reside [here](https://github.com/WPMedia/fusion-news-theme-blocks/packages)), as well as incorporate GitHub Actions. You also need to make sure that you are setup with enabling SSO if you're pushing to the repo. [Please follow](https://help.github.com/en/github/authenticating-to-github/authorizing-a-personal-access-token-for-use-with-saml-single-sign-on) GitHub docs. If you don't, you'll get errors that the blocks can't be installed when trying to run `npx fusion start-theme` in your local feature blocks repo.

To set up this repo for local development and deployment, you'll have to set up your .npmrc like so:

```
@arc-test-org:registry=https://registry.npmjs.org/
@wpmedia:registry=https://npm.pkg.github.com/
...
@<org name>:registry=<url to registry>
...
//registry.npmjs.org/:_authToken=<npm auth token>
//npm.pkg.github.com/:_authToken=<your personal access token>
...
//<url to registry>/:authToken=<auth token>
...
```

Note that for GitHub, you will have to provide your own personal access token for it to be able to properly find and install your GitHub packages. Please follow the instructions on these documentation to generate your GitHub token:
[Configuring your local authentication with npm](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages)
[Creating Auth Tokens (HTTPS)](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)
[Enable SSO for Auth Tokens](https://help.github.com/en/github/authenticating-to-github/authorizing-a-personal-access-token-for-use-with-saml-single-sign-on)
[Authorizing SSH Keys](https://help.github.com/en/github/authenticating-to-github/authorizing-an-ssh-key-for-use-with-saml-single-sign-on)

The Token you create on `Creating Auth Tokens (HTTPS)` will be the token you'll have to put in your `.npmrc` file. Please create a read-only token as well - when deploying, please switch this token to this one.

Finally, log into npm with `npm login --registry=https://npm.pkg.github.com`. The username will be your GitHub username, email will be your public email address, and the password will be the token that you've created above. This will be a one-time action as long as you don't log out. Please look at [this documentation](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages) for further details.

TODO: So that we don't have to have personal GitHub tokens out in the wild, we'll have to set up GitHub Actions to use GitHub Token: https://help.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token

## Introduction

Themes are a new way for clients to rapidly build their website through the selection of pre-built "blocks" which are a collection of features, chains, layouts and output types. Instead of the traditional client onboarding process where all components for the site are custom made, a themes client onboarding process is exponentially reduced as the need for custom components are significantly reduced or even eliminated.

This document will go over the overall architecture of themes, a more detailed look at the various code repositories, how to develop for them and along the way discover how everything comes together.

## Theme Architecture

The image below shows the four repositories that go into building out the News theme. We will describe each repository and the role it plays.

![alt diagram](theme_architecture.png "diagram")

### news-theme-css

The news-theme-css repo is located at:
<https://github.com/WPMedia/news-theme-css>. This Sass based repository
provides the foundation CSS for the news theme and also holds some of
the styling for components in the other news theme repositories. The
main responsibilities, however, are:

1.  A CSS grid layout framework (with flexbox fallback for older
    browsers)
2.  CSS reset
3.  Typography
4.  Breakpoints and spacing
5.  Utility Sass functions (i.e. convert px to rems, etc.)

The grid layout part of the framework is a simple row/column grid. It
uses CSS Grid, but defaults to using flexbox when grid is not supported
in the browser. While the grid framework can be nested, its recommended
to use the grid framework for overall page layouts and then use flexbox
(or other CSS) for the layouts inside columns. If, however, you feel a
nested grid is warranted, you'll probably want to use `.container-fluid`
over `.container` for your nested grid wrapper element as it has its
margins set to auto.

The majority of the framework is documented using KSS
(<https://github.com/kss-node/kss-node>). This allows for a style guide to be generated and to show markup
examples in the compiled CSS (which may be hard to infer from the Sass
alone---especially for the grid column classes). This is stored in the
/styleguide folder of the project. Opening up
/news-theme-css/styleguide/index.html in a browser will show you the
main page of the documentation.

While the style guide will provide a good overview, it's advisable to
review the Sass files as well to have a proper understanding of its
usage. For example, if you look in scss/\_variables.scss you will see
variables such as `$primary-font-family` and `$secondary-font-family`.
These variables use the Sass notation `!default` at the end so that they
can be over-ridden in the themes file, `blocks.json`, located in the
fusion-news-theme repository. (We will talk about `blocks.json` more in the
fusion-news-theme section.). Also, if you look in
scss/\_breakpoints.scss you will see Sass maps for breakpoints and
spacing. These maps are leveraged with the Sass function, `map-get`, in
component Sass code to set spacing and media queries.

news-theme-css is provided to the other parts of the system as an NPM
package. For more information on the build and publishing process for this repository,
please see the readme.md for the project:
<https://github.com/WPMedia/news-theme-css/blob/stable/readme.md>

**Note:** When publishing, you will need a .npmrc file that gives you access
to the private NPM repo. Reach out to a team member to get this.

### engine-theme-sdk

The engine-theme-sdk is located at:
<https://github.com/WPMedia/engine-theme-sdk>. The purpose of this
repository is to store basic React components and utilities that are not
tied to one specific theme. So, for example, there is a lightbox and
image component. We also store React based svg icons in here as well.
Unlike the other repos in the system, this repo uses TypeScript, so its
important to build the repo and commit the generated source before
committing changes and publishing. Originally, this repo was a
multi-package using Lerna (<https://lerna.js.org/>), however, it has since changed into a mono-repo (like news-theme-css).
Here are the steps and commands you need to know to build and publish.

1.  Create a branch off stable for what you want to work on.
2.  Once changes are completed, run: `npm run build` then add, commit,
    push all changes to your branch on GitHub.
3.  Create a PR and ask for it to be reviewed.
4.  When approved, merge into stable.
5.  Pull down stable on your system.
6.  Look at the package.json for the project and note the version. Your
    will want to increment the version in the next step
7.  If, for example, the current version says 0.4.3, then run the
    following command: `npm version 0.4.4`. This will bump up the version
    in package.json
8.  Push the change up to Github.
9.  Once the version has been updated you can publish with the command:
    `npm publish`.
10. You will then want to create a new bundle of fusion-news-theme (see
    the fusion-news-theme section) and deploy to our environment for design and general
    testing.

**Notes:**

1.  We have an issue where Sass in this repository is not getting
    included into the Fusion build process. Until we can get this
    resolved, we are placing any Sass for these components in the
    news-theme-css repository.
2.  When publishing, you will need a .npmrc file that gives you access
    to the private NPM repo. Reach out to a team member to get this.

### fusion-news-theme-blocks

The fusion-news-theme-blocks repo is located at:
<https://github.com/WPMedia/fusion-news-theme-blocks>. In a typical
client setup, you have a feature pack repository and inside you have a
components directory where you store your code for feature, chains, etc.
In our theme's environment, the majority of these components will be
stored in this repo instead. We refer to these external components as
"blocks." The components directory in the feature pack will be reserved
for custom components that the client might build. This separation from
the feature pack will allow the customer to pick and choose the
components that they want added in their site. Also, because
fusion-news-them-blocks is a multi-repo (using Lerna), any unused
components will not be part of the client bundle.

As indicated from the diagram above, fusion-news-theme-blocks is
dependent on the engine-theme-sdk and news-theme-css packages. As you
will see in the fusion-news-theme section, we have a way to set theming properties
(color, font-family, etc). To set these properties, we are using styled
components to inject these values into the component.

The development process is similar engine-theme-sdk, except when it
comes time to publish, you need to follow the Lerna publish procedure.
For more information, see the repo's read me:
<https://github.com/WPMedia/fusion-news-theme-blocks/blob/stable/README.md>

Note: When publishing, you will need a .npmrc file that gives you access
to the private NPM repo. Reach out to a team member to get this.

### Development Process

1. Pull the latest `canary` branch:

```sh
git checkout canary
git fetch -a
```

2. Branch off the `canary` branch:

```sh
git checkout -b PEN-[jira ticket num]-[brief description of feature]
```

3. Do the work (heh). Commit as you go, which will run the linter and tests.
4. Make pull request using Github against the `canary` branch. Get approval for your pr on your feature branch.
5. Merge the PR into the `canary` branch. At this point a release with the dist-tag of `canary` will be built automatically. This means that if you want to verify your changes in a deployed environment, you need to make sure you're using the `canary` dist-tag in whatever environment that is by setting the `BLOCK_DIST_TAG` environment variable in your environment file(s).

#### How To Publish

Before publishing, make sure a Pull Request has been made and merged from the `canary` branch against the `beta` branch. This PR should only include features that belong to the current release, so make sure to merge as soon as the features for the release have been completed to avoid including further features from `canary` belonging to a later release.

---

NOTE: Any time before publishing, make sure you've removed nested node modules and installed updated top-level dependencies. This will ensure there's no halfway publish if the tags for publishing are pushed but the packages are not actually published. This is a known bug in lerna.

`rm -rf node_modules/`

`npm i`

`npx lerna clean`

If this does happen, you can use `from-package` syntax in lerna [docs](https://github.com/lerna/lerna/tree/master/commands/publish#bump-from-package). Everything will be alright.

To double check yourself, please use `npm view [package name]` or `npm view [package name]@[desired tag]` to view your work.

WARNING: If you need help rolling back publish, please see the wiki [How A Dev Can Rollback Published Version](https://github.com/WPMedia/fusion-news-theme-blocks/wiki/How-To-%22Rollback%22-From-A-Published-Version)

---

1. Pull the latest `beta` branch:

```sh
git checkout beta
git fetch -a
```

2. When you're ready to start the production release process, you'll want to make prerelease (`beta`) builds of the blocks. Start by running the below command to publish packages with the `beta` dist-tag:

```sh
npx lerna publish --force-publish --preid beta --pre-dist-tag beta
```

3. Select either `prepatch`, `preminor`, or `premajor` if this is the first prerelease build for this production release (e.g. `-beta.0`). If this is a prerelease that makes changes on top of a prior prerelease then select the `Custom Prerelease` option and accept the default, this should result in the version having only an incremented prerelease number instead of an incremented major, minor, or patch number (e.g `-beta.1`). Note that this will publish all packages to aid our block installer process.
4. Deploy a bundle with the `BLOCK_DIST_TAG` environment variable set as `beta` in your environment file(s).
5. After either design QA or product QA approval of that deployed bundle, checkout `stable` and pull down the latest from that branch. Then run `git merge vX.X.X-beta.X` (where `X.X.X-beta.X` is the beta release we're releasing to production) to get the changes from `beta` into `stable`.
6. Then, in `stable`, you can publish a production release with the following command:

```sh
npx lerna publish --conventional-commits --conventional-graduate
```

7. After publishing from the `stable` branch, merge `stable` into `beta` and `beta` into `canary` so that the changes related to the publish we just did end up in both of those branches.

Merging `beta`

```sh
# Ensure we're on the stable branch
git checkout stable
# Ensure we have the latest from stable
git pull origin stable
# Checkout beta
git checkout beta
# Ensure we have the latest from beta
git pull origin beta
# Rebase beta onto stable
git rebase stable
# Push the updated beta branch (--force is required or else it will fail)
git push --force origin beta
```

Merging `canary`

```sh
# Ensure we're on the beta branch
git checkout beta
# Ensure we have the latest from beta
git pull origin beta
# Checkout canary
git checkout canary
# Ensure we have the latest from canary
git pull origin canary
# Rebase canary onto beta
git rebase beta
# Push the updated canary branch (--force is required or else it will fail)
git push --force origin canary
```

#### Publish hotfix

1. Branch off of stable.

2. merge feature branch into stable.

3. release feature branch changes as `@hotfix` from stable.

`npx lerna publish --force-publish --preid hotfix --pre-dist-tag hotfix`

4. Create feature pack with @hotfix blocks to test
5. Upon successful QA, graduate the “hotfix” release to latest in the same publish workflow

`npx lerna publish --conventional-commits --conventional-graduate`

6. Go back to beta packages and look into handling changes.

7. After publishing, follow the rebasing instructions in step 9 of the non-hotfix release process.

For info on hotfix background, see [hotfix section](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) and/or [diagram](<https://wac-cdn.atlassian.com/dam/jcr:61ccc620-5249-4338-be66-94d563f2843c/05%20(2).svg?cdnVersion=1013>).

For info on rebasing, see [tutorial](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase).

For background on lerna conventional graduate and diffing, see [lerna versioning docs](https://github.com/lerna/lerna/blob/master/commands/version/README.md).

### fusion-news-theme

The fusion-news-theme repo is located at:
<https://github.com/WPMedia/Fusion-News-Theme>.

It is like a typical feature pack in regards that it has the same
directory structure; you can add assets in the resource directory, etc.
However as mentioned above, currently there are no components residing
in this repo. The way this feature pack knows what components to use is
through a new special file in the root of the repo called `blocks.json`.
blocks.json is a special file that Fusion (Hydrate versions) knows to
look for and run specific internal build commands to bring everything
together. blocks.json is the glue that brings it altogther.

Below describes the various properties that are in blocks.json and their
purpose:

| **Property**              | **Description**                                                                                                                                                                                                                                                                                                           |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **org**                   | The organization name of the NPM repo. Used internally by Fusion i.e. "@wpmedia/"                                                                                                                                                                                                                                         |
| **useLocal**              | true \| false. Used in local development (see the local dev section below). This will soon be replaced by a more conventual npm link process, so this property will eventually be removed.                                                                                                                                |
| **blocks**                | This array lists all the blocks that are to be made available to the site. Any block that is in the fusion-news-theme-blocks repo, but not listed here will not be available and will also not be included in the client bundle.                                                                                          |
| **cssFramework**          | The CSS framework package being used. For News theme, it is the news-theme-css package.                                                                                                                                                                                                                                   |
| **cssImport**             | Specifies the main Sass file entry point into the framework. This is leveraged by fusion to automatically import the framework into each of the block's source file in fusion-news-theme-blocks during build time. So, in other words, you do not have to explicitly import the css framework in your blocks source code. |
| **sassVariableOverrides** | In addition to using styled components to set theme properties, we also want the css framework to pick up on the custom settings and over-ride the appropriate Sass default properties. Fusion handles the override process internally.                                                                                   |
| **values**                | This is where we set the custom theme values for the site. There are two main areas: default and per site.                                                                                                                                                                                                                |

To see a configured blocks.json, go to
<https://github.com/WPMedia/Fusion-News-Theme/blob/master/blocks.json>

Since this is the feature pack there is no publishing process. In fact,
when you build and deploy, this just like a traditional feature pack:
i.e. `npx fusion zip`.

For canary we are currently using this environment:
<https://corecomponents.arcpublishing.com/pf/admin/app/browse/pages.html>.

Unless you are adding new resources or custom components in this repo,
you do not need to follow a PR process. Usually, you will be creating a new
block in fusion-news-theme-blocks and once that has gone through the PR
process and pushed to stable and published, all you'll need to do here is make sure its
listed in the blocks section of `blocks.json`. If it's not listed, cause
it new for example, then feel free to add it and commit immediately to
stable. Then, create a build and deploy to the environment for design
and general testing. If, however, you are doing something more custom
then follow these procedures:

1.  First create a branch off stable for what you want to work on.
2.  Once changes are completed, then add, commit, push all changes to
    your branch on GitHub.
3.  Request a PR review.
4.  When the PR is approved, merge into stable.
5.  Next build using npx fusion zip and deploy to the core components
    environment for testing. If you want to deploy with all the blocks with
    a certain version, you can run `npx fusion zip <version>`. This will
    release with all of the blocks tagged with that version,
    i.e. `npx fusion zip beta` will tag all of the blocks with `@beta` tag
    before zipping

**Note:** When running or creating a build bundle, you will need a .npmrc
file that gives you access to the private NPM repo. Reach out to a team
member to get this.

##Developing Custom Blocks for use with Themes
In addition to using platform-built and maintained Arc Blocks to construct your site in
PageBuilder, you can also build Custom Blocks that are custom to your website.
The process is similar to developing features on Fusion –
you'll build components in the components directory
(https://staging.arcpublishing.com/alc/arc-products/pagebuilder/fusion/documentation/recipes/intro.md?version=2.4).
However, you can utilize the Theme CSS and SDK components within your Custom Block,
so that it has the same look-and-feel as the rest of the Theme website.

- To leverage the CSS Framework, you do not need to do anything. Fusion will automatically inject
  it into your source files when `cssImport`, `cssFramework` and `sassVariableOverrides` (as they should be) are defined
  in your `blocks.json` file

- To leverage the components in `engine-theme-sdk`, simply add `@wpmedia/engine-theme-sdk`
  as a dependency in `packages.json` and import in your files like any other 3rd party package.

- If you plan on creating a custom default output-type, you must remove `@wpmedia/default-output-block`
  from the blocks list in `blocks.json` to prevent a Fusion error because of the name collision.

- When developing locally and you want to run your feature pack, please see the next section.

## Event Listening

The EventEmitter object, located in @wpmedia/engine-theme-sdk can be used to
publish and subscribe to events. This can be useful for adding analytic tracking for a custom block.
In fact, the Gallery component sends off events for when the next or previous image is viewed and when the autoplay mode is enabled.

These Gallery events are:

|                      |                                                                                                                                                           |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| galleryImageNext     | When the next button is pressed. If the autoplay property of the event is true, the gallery is executing in autoplay mode                                 |
| galleryImagePrevious | When the next button is pressed.                                                                                                                          |
| galleryAutoplayStart | When the autoplay button is pressed                                                                                                                       |
| galleryAutoplayStop  | When the autoplay button is pressed and the autoplay mode was enabled. If the gallery reach the end of the playlist will stop and generate this event too |
| galleryExpandEnter   | When the expand button is pressed                                                                                                                         |
| galleryExpandExit    | When the close button on the lightbox is pressed                                                                                                          |

If you wanted to listen to these events, the first thing is to import the EventEmitter object into the block:

```jsx
import { EventEmitter } from "@wpmedia/engine-theme-sdk";
```

Then create a callback function such as:

```jsx
const myGalleryImageNext = event => {
  console.log("Here is the event: ", event);
};
const myGalleryImagePrevious = event => {
  console.log("Here is the event: ", event);
};
```

Then use you use your callback in subscribing to the event:

```jsx
EventEmitter.subscribe("galleryImageNext", event => myGalleryImageNext(event));
EventEmitter.subscribe("galleryImagePrevious", event =>
  myGalleryImagePrevious(event)
);
```

## Local Development Process

### Basic Local Development

If you are only creating custom components for a specific client and/or only using published
packages of `@wpmedia/engine-theme-sdk`, `@wpmedia/fusion-news-theme-blocks`, and
`@wpmedia/news-theme-css`, you can simply run the feature pack using `npx fusion start`.  
If however your are actively developing for engine-theme-sdk, fusion-news-theme-blocks and
news-theme-css, see the next section for a more advanced options.

### Advanced Local Development

There are 4 main repos that are actively being developed on and three of
them are NPM packages. As you can imagine, a proper local dev
environment is paramount. We certainly don't want to have to publish an
untested, incomplete block in fusion-news-theme-blocks just to see how
it looks and behaves on Fusion! We are currently wrapping up development
on providing npm link functionality for themes through the Fusion CLI.
We anticipate this to be ready by the time your are ready for
development. Below are the instructions for setting this up. If however, this feature is not
working at the time you read this or not meeting your needs for a specific issue,
please see the next classic dev environment.

#### NPM Link Local Development Instructions

1. Add `FUSION_RELEASE=2.4.2-themesDev.5` (or whatever the version of fusion this will be included in) and
   `THEMES_BLOCKS_REPO=<path/to/the/root/of/blocks/repo>` to the `.env` file of the bundle. Also make sure to include `.npmrc`
   on the bundle so everything installs properly as well

2. These key/value pairs should be included on your `blocks.json` depending on what you are developing:

```json
{
  ...
  "useLocal": true/false,
  "useLocalEngineSDK": true/false,
  "useLocalCSSFramework": true/false,
  "blocks": [...],
  "devBlocks": [...],
  ...
}
```

These are what each of these variables do:

- `useLocal`: Decides whether it should use locally linked modules or install public versions of the blocks
- `useLocalEngineSDK`: Decides whether it should use locally linked engine SDK or install public version. _NOTE_: The Engine SDK should be manually linked
- `useLocalCSSFramework`: Decides whether it should use locally linked CSS Framework or install public version. _NOTE_: The CSS Framework should be manually linked
- `blocks`: Contains the list of blocks to be linked/installed. Each string should be in the format of `"<@org>/<blockName>/<@version, if necessary>"`, i.e. `"@wpmedia/alert-bar-block@beta"`
- `devBlocks`: You should use this if you don't want to link all of the blocks (which may considerably slow down the local environment booting up) - the CLI will only link the blocks provided in this array if one exists. This is just a convenience tool to narrow down the `blocks` array without having to manually revert the changes every time you commit. Each string should be in the same format as `blocks` array. Keep in mind that you should still include the minimum block needed to start up the local environment (an output type, a layout, a content source). This does NOT replace the `blocks` array.

  Another use case for `devBlocks` is if you want to only locally develop certain blocks but want to bring in production versions of all the others. You can do this by setting `useLocal` to false and including the blocks you want to develop inside `devBlocks`, and when you run the `npx fusion start theme --links` it will link all the blocks inside the `devBlocks` array but also install all the production versions of blocks in `blocks` array, and Fusion will take the linked blocks as higher priority. This will work with the CLI version `1.0.13-alpha.0`, but currently (accidentally) removed on the `1.0.13-versioning.0`

3. Boot up the local environment with the command `npx fusion start theme` at the root of the bundle. If you want to link the blocks as specified in `blocks/devBlocks` array, either run it with `--links` or `-l` flag or run `npx fusion link` command before running the start command

4. Fusion will start up the bundle as normal. Once it fully boots up and the local editor is loaded, go to the blocks
   and make a change and save, and observe that the change is reflected on the local editor.

Note: It also looks like the webpack watch now requires more CPUs (in testing with Jason Young, who went from 2 - 4
CPUs) - otherwise the real-time webpack watch might not work.

#### Classic Local Development Instructions

1.  Clone the Fusion repo:`git clone git@github.com:WPMedia/fusion.git`

2.  Checkout the branch: `bmiller-2.3-hydrate-extended-theme-dev`

3.  Create an env file at the root your local fusion repository.

Your .env file should look something like this:

        FUSION_REPO=/Users/millerb/work/Fusion-News-Theme
        THEMES_BLOCKS_REPO=/Users/millerb/work/fusion-news-theme-blocks/blocks
        CONTENT_BASE=[get from dev]
        CONTEXT_PATH=pf
        DEFAULT_ARC_SITE=the-sun
        resizerURL=https://corecomponents-the-prophet-prod.cdn.arcpublishing.com/resizer
        resizerKey=[get the key from a dev]

**FUSION_REPO** should point to your local repo of fusion-news-theme and
the **THEMES_BLOCKS_REPO** should point to the /blocks directory of your
local fusion-news-theme-blocks repo.

4.  Then run fusion with the command: `npm run start:admin:theme-dev`

5.  If you would also like to run local code for engine-theme-sdk, then
    extend the .env file to look like this:


        FUSION_REPO=/Users/millerb/work/Fusion-News-Theme
        THEMES_BLOCKS_REPO=/Users/millerb/work/fusion-news-theme-blocks/blocks
        THEMES_ENGINE_SDK_REPO=/Users/millerb/work/engine-theme-sdk
        THEMES_ENGINE_SDK_NAME=@wpmedia/engine-theme-sdk
        CONTENT_BASE=[get from dev]
        CONTEXT_PATH=pf
        DEFAULT_ARC_SITE=the-sun
        resizerURL=https://corecomponents-the-prophet-prod.cdn.arcpublishing.com/resizer
        resizerKey=[get the key from a dev]

**THEMES_ENGINE_SDK_REPO** should point to your local repo of
engine-theme-sdk and **THEMES_ENGINE_SDK_NAME** is the NPM package name
so Fusion will now to exclude it from the npm install procedures.

6.  Then run this command to start Fusion: `npm run start:admin:theme-and-engine-dev`

7.  The major disadvantage of the classic development environment is that every change in either `fusion-news-theme-blocks`
    or `engine-theme-sdk` will require you stop and restart Fusion.

### Secure Image Resizing Quickstart

1. In your local env, make sure you have a plaintext resizer key in the bundle repo. That plaintext resizer should be the decrypted from the hash in the environment folder `resizerKey`. Decryption cannot happen locally. This local .env file will live in the `[feature pack]/environment/index.json` -- it can be decrypted using admin with `[https://yoursite.arcpublishing.com]/deployment/fusion/secrets`.

_Fusion-News-Theme/.env_

```
resizerKey=[no brackets, should be decrypted resizer key in the env index]
```

fusion-news-theme-blocks/environment/index.json\*

```json

{
  ...
  "resizerKey": "%{ladjfklkdfjldsjlkfjldkjf}"
}

```

2. Ensure you have your corresponding resizer url for the resizer key for your org. This can also be managed on a per site basis.

_fusion-news-theme-blocks/environment/index.json_

```json

{
   ...
  "resizerURL": "https://corecomponents-the-prophet-prod.cdn.arcpublishing.com/resizer",
}

```

3. If you are creating a custom block using the engine-theme-sdk Image component, you will need to import and pass in the resizerURL so that the thumbor url can be recreated.

_fusion-news-theme-blocks/blocks/custom-image-block/index.js_

```jsx
import getProperties from "fusion:properties";
import { useContent } from "fusion:content";
import { Image } from "@wpmedia/engine-theme-sdk";

const CustomImageBlock = ({ rawImageURL }) => {
  const resizedImageOptions = useContent({
    source: "resize-image-api",
    query: { raw_image_url: rawImageURL }
  });

  return (
    <Image
      resizerURL={getProperties().resizerURL}
      resizedImageOptions={resizedImageOptions}
      url={rawImageURL}
      alt={"This is a placeholder placeholder"}
      // 16:9 aspect ratio
      smallWidth={274}
      smallHeight={154}
      mediumWidth={274}
      mediumHeight={154}
      largeWidth={400}
      largeHeight={225}
    />
  );
};

export default CustomImageBlock;
```

_Fusion-News-Theme/blocks.json_

```json
  "blocks": [
    "@wpmedia/resizer-image-block",
    "@wpmedia/resizer-image-content-source-block",
    "@yourorg/custom-image-block"
  ],
  "values": {
      "default": {
          "siteProperties": {
            "imageWidths": [
                274,
                400
            ],
            "aspectRatios": [
                "16:9"
            ]
          }
      }
  }
```

4. Ensure that your existing content sources are using the `resizer-image-block` if you want to utilize engine-theme-sdk secure resizer image. That transform takes in items and transforms via ans schema.

There's also a helper in the package to extract the `resized_params` values.

```js
import getResizedImageData from "@wpmedia/resizer-image-block";

export default {
  resolve: params => `/content/v4/search/published?q=${params.query || "*"}`,
  schemaName: "ans-feed",
  params: {
    query: "text",
    size: "number",
    offset: "number"
  },
  // other options null use default functionality, such as filter quality
  // need query arcsite if resizer is utilizes different resizer urls per site
  transform: (data, query) =>
    getResizedImageData(data, null, null, null, query["arc-site"])
};
```

```jsx
import { Image } from "@wpmedia/engine-theme-sdk";
import { extractResizedParams } from "@wpmedia/resizer-image-block";

function extractImage(promo) {
  return (
    promo && promo.basic && promo.basic.type === "image" && promo.basic.url
  );
}

// ans schema content element
const ImageItem = ({ contentElement }) => (
  <Image
    // results list is 16:9 by default
    resizedImageOptions={extractResizedParams(element)}
    url={extractImage(element.promo_items)}
    alt={"This is a placeholder placeholder"}
    smallWidth={158}
    smallHeight={89}
    mediumWidth={274}
    mediumHeight={154}
    largeWidth={274}
    largeHeight={154}
    resizerURL={resizerURL}
  />
);
```

5. Add breakpoints based on expected device size (ie, mobile, tablet, desktop) for resizer image media queries.

_Fusion-News-Theme/blocks.json_

```json
  "values": {
      "default": {
          "siteProperties": {
                "breakpoints": {
                    "small": 0,
                    "medium": 768,
                    "large": 992
                }
          }
      }
  }
```

_fusion-news-theme-blocks/blocks/custom-image-block/index.js_

```jsx
import { Image } from "@wpmedia/engine-theme-sdk";
import getProperties from "fusion:properties";

const CustomImageBlock = ({ rawImageURL }) => {
  const resizedImageOptions = useContent({
    source: "resize-image-api",
    query: { raw_image_url: rawImageURL }
  });

  const { breakpoints } = getProperties(arcSite);

  return (
    <Image
      resizerURL={resizerURL}
      resizedImageOptions={resizedImageOptions}
      url={rawImageURL}
      alt={"This is a placeholder placeholder"}
      // 16:9 aspect ratio
      smallWidth={274}
      smallHeight={154}
      mediumWidth={274}
      mediumHeight={154}
      largeWidth={400}
      largeHeight={225}
      breakpoints={breakpoints}
    />
  );
};

export default CustomImageBlock;
```

Will translate to

```html
<picture class="Image__StyledPicture-sc-8yioqf-0 dRTDJJ">
  <source
    srcset="https://corecomponents-the-prophet-prod.cdn.arcpublishing.com/resizer/cHsSQh--J1kseMQKbpP8c5crG20=/400x225/filters:format(jpg):quality(70)/arc-anglerfish-arc2-prod-corecomponents.s3.amazonaws.com/public/4PUA6PJWEBEELOHMHMUUUB2WSM.JPG"
    media="screen and (min-width: 992px)"
  />
  <source
    srcset="https://corecomponents-the-prophet-prod.cdn.arcpublishing.com/resizer/cHsSQh--J1kseMQKbpP8c5crG20=/274x183/filters:format(jpg):quality(70)/arc-anglerfish-arc2-prod-corecomponents.s3.amazonaws.com/public/4PUA6PJWEBEELOHMHMUUUB2WSM.JPG"
    media="screen and (min-width: 768px)"
  />
  <source
    srcset="https://corecomponents-the-prophet-prod.cdn.arcpublishing.com/resizer/cHsSQh--J1kseMQKbpP8c5crG20=/274x183/filters:format(jpg):quality(70)/arc-anglerfish-arc2-prod-corecomponents.s3.amazonaws.com/public/4PUA6PJWEBEELOHMHMUUUB2WSM.JPG"
    media="screen and (min-width: 0px)"
  />

  <img
    alt="In Albania, age-old traditions and Mediterranean beaches on the cheap "
    src="https://corecomponents-the-prophet-prod.cdn.arcpublishing.com/resizer/cHsSQh--J1kseMQKbpP8c5crG20=/274x183/filters:format(jpg):quality(70)/arc-anglerfish-arc2-prod-corecomponents.s3.amazonaws.com/public/4PUA6PJWEBEELOHMHMUUUB2WSM.JPG"
    width="274"
    height="183"
  />
</picture>
```

---

Technical Side Note:

Both values `resizerURL` and `resizerKey` will be accessible via fusion getter methods. You can see how they are implemented in the content source image resizer. You will need to have `"@wpmedia/resizer-image-block"` in your `blocks` and, if using per-block linking, `devBlocks` arrays.

The resizerKey will only accessed via this helper. For security, this helper is accessed only server-side. To prevent possible misuse, this helper also has a window check to prevent client-side use.

_Fusion-News-Theme/blocks.json_

```json
    "blocks": [
        "@wpmedia/resizer-image-block"
    ],
    "devBlocks":[
        "@wpmedia/resizer-image-block"
    ]

```

_fusion-news-theme-blocks/blocks/resizer-image-block/index.js_

```js
import { resizerURL, resizerKey } from "fusion:environment";

const getResizerParam = (
  originalUrl,
  targetWidth,
  targetHeight,
  filterQuality,
  format
) => {
  if (typeof window === "undefined") {
    const Thumbor = require("thumbor-lite");

    const thumbor = new Thumbor(resizerKey, resizerURL);

    thumborParam = thumbor
      .setImagePath(originalUrl.replace(/(^\w+:|^)\/\//, ""))
      .filter(`format(${format})`)
      .filter(`quality(${filterQuality})`)
      .resize(targetWidth, targetHeight)
      .buildUrl();

    // url to securely access thumbor image
    return thumborParam;
  }

  return null;
};
```

### Images

- If images are not displaying, check that you have a resizerKey in your .env file
- Use the latest version of engine that uses a secure resizerKey
- If an image has an unknown src, check that your image aspect ratios and sizes are in the `blocks.json` file of feature pack
  - For instance, you can't have an image resized as 666 x 98999 because that size is not supported in blocks.json. But 100 x 0 is, for example. If unsure, use image sizes you see elsewhere. This is to ensure we're not making unnecessary resizes. These images are not actually being served; there's only crypto cost to making a string with a resizer key
  - Look at thumbor's documentation for help on filters and the link anatomy
- The placeholder image uses only the block.json fallback image field. That needs to be an external link for now. It can't be an svg (again, for now)
- See the readme for the resizer content source for details how to useContent query and how to use class @consumer
  - There's an example of @consumer usage in the placeholder image block
- For debugging image performance, use lighthouse
- Credit to other arc developers, including the Infobae team, for inspiration on the solution

## Troubleshooting Dependencies

### Finding Your Bearings

#### Check you're in top-level directory

`pwd`
-> /Users/user/sites/fusion-news-theme-blocks

#### Ensure you have latest version

`git branch`
-> should highlight with \* stable

if not,
`git checkout stable`

fetch latest
`git fetch`

pull those, updating your files
`git pull`

### Clearing House

Ensure all node modules are cleared:

#### Delete lingering top-level modules

`rm -rf node_modules/`

- should be a bit of a delay if they're there
- also will autocomplete if they're there and you press tab after `nod`

#### Clear out blocks level deps

`npx lerna clean`

- Deletes blocks' node modules
- Press y to confirm removing node modules

#### Install top-level

`npm i`

- Installs from top-level `package.json`

#### **DOM-PARSER NOT FOUND**

- That's something in default output type (so SangHee) that needs to be installed
  `cd blocks/default-output-block`
  `npm i`
- installs dom parser and others required to run using linking workflow

### See what's there

#### Check top-level deps

`npm ls react`

- Checks which version of react installed
- if there's issues with intersections, you'll see it there
- Search github for the version error, usually common

### Check published requirements

`npm view @wpmedia/video-player-block`

- Will show address and version

`npm view @wpmedia/video-player-block`

- Will show latest version, more concise

### Open Questions

- Why do we need top-level local file dependencies at all
  - Hoisting up the dependencies is something lerna does, but that yarn workspaces could help
- What license.md should we have?
- What about versioning block dependencies? Using `latest` may just be easiest for depending on other blocks

### LocalDev Tips/Playbook

- If your are running locally with `useLocal` set to true in `blocks.json` and you are noticing that webpack is not picking
  up your changes in the blocks repo and recompiling, try the following: 1) First ensure you do have `useLocal` set to true. 2) Remember in order for Fusion to link to your local working blocks repository, you need to start fusion with
  the `--links` or `-l` flag. Ex: `fusion start theme --links` or `fusion start theme -l` 3) Shut down Fusion. 4) Run `docker image prune` 5) Restart Docker 6) Restart Fusion.

- Before publishing, creating a bundle, or right after creating a new branch:
  1. Delete the @wpmedia folder inside your theme pack's node_modules directory.
  2. Remove npm links to engine-theme-sdk and news-theme-css.
- If you have set `useLocalEngineSDK` or `useLocalCSSFramework` to true and changes are not getting picked up
  1. First ensure you set the manual npm link. In the case of engine-theme-sdk, you first need to go to the root of your
     local copy on engine-theme-sdk and run `sudo npm link`, then in the root of you feature pack, run `npm link @wpmedia/engine-theme-sdk`.
     For news-theme-sdk, go to the root of your local copy on news-theme-sdk and run `sudo npm link`, then in the root of you feature pack,
     run `npm link @wpmedia/news-theme-sdk`.
  1. Note: Changes to these repos do not get picked up automatically by Fusion's webpack when its running.
  1. When a change is made to engine-theme-sdk or news-theme-css,
     you will need to shut down fusion, run the build command in either engine-theme-sdk or news-theme-css and then
     restart Fusion. Note: you do not need to reestablish the npm links after making changes (unless you explicitly unlinked).
- You want the latest Fusion CLI tool installed
  1. In the root of your theme pack directory run: `npm install -D @arc-fusion/cli@canary`

### Resources

https://explainshell.com/
