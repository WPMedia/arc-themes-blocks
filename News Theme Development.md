# News Theme Developers Guide
**Note:** *This is a living document.  Please check back for updates.  Also, comments are very much appreciated to make this documentation better!*

## Introduction


Themes are a new way for clients to rapidly build their website through
the selection of pre-built "blocks" which are a collection of features,
chains, layouts and output types. Instead of the traditional client
onboarding process where all components for the site are custom made, a
themes client onboarding process is exponentially reduced as the need
for custom components are significantly reduced or even eliminated.

This document will go over the overall architecture of themes, a more
detailed look at the various code repositories, how to develop for
them and along the way dicover how everything comes together.

## Theme Architecture


The image below shows the four repositories that go into building out
the News theme. We will describe each repository and the role it plays.

<img src="data:image/png;base64,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" alt="diagram" />

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
<https://github.com/WPMedia/news-theme-css/blob/master/readme.md>

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

1.  Create a branch off master for what you want to work on.
2.  Once changes are completed, run: `npm run build` then add, commit,
    push all changes to your branch on GitHub.
3.  Create a PR and ask for it to be reviewed.
4.  When approved, merge into master.
5.  Pull down master on your system.
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
<https://github.com/WPMedia/fusion-news-theme-blocks/blob/master/README.md>

Note: When publishing, you will need a .npmrc file that gives you access
to the private NPM repo. Reach out to a team member to get this.

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

| **Property**   |  **Description** |
|---|---|
| **org** |  The organization name of the NPM repo. Used internally by Fusion i.e. "@arc-test-org/" |
|  **useLocal**   | true \| false. Used in local development (see the local dev section below). This will soon be replaced by a more conventual npm link process, so this property will eventually be removed.  |
| **blocks**   |  This array lists all the blocks that are to be made available to the site. Any block that is in the fusion-news-theme-blocks repo, but not listed here will not be available and will also not be included in the client bundle. |
| **cssFramework**    |  The CSS framework package being used. For News theme, it is the news-theme-css package. |
|  **cssImport**   |  Specifies the main Sass file entry point into the framework. This is leveraged by fusion to automatically import the framework into each of the block's source file in fusion-news-theme-blocks during build time. So, in other words, you do not have to explicitly import the css framework in your blocks source code. |
| **sassVariableOverrides**   | In addition to using styled components to set theme properties, we also want the css framework to pick up on the custom settings and over-ride the appropriate Sass default properties. Fusion handles the override process internally.  |
|   **values** | This is where we set the custom theme values for the site. There are two main areas: default and per site.  |


To see a configured blocks.json, go to
<https://github.com/WPMedia/Fusion-News-Theme/blob/master/blocks.json>

Since this is the feature pack there is no publishing process. In fact,
when you build and deploy, this just like a traditional feature pack:
i.e. `npx fusion zip`. 

For staging we are currently using this environment:
<https://corecomponents.arcpublishing.com/pf/admin/app/browse/pages.html>.

Unless you are adding new resources or custom components in this repo,
you do not need to follow a PR process. Usually, you will be creating a new
block in fusion-news-theme-blocks and once that has gone through the PR
process and pushed to master and published, all you'll need to do here is make sure its
listed in the blocks section of `blocks.json`. If it's not listed, cause
it new for example, then feel free to add it and commit immediately to
master. Then, create a build and deploy to the environment for design
and general testing. If, however, you are doing something more custom
then follow these procedures:

1.  First create a branch off master for what you want to work on.
2.  Once changes are completed, then add, commit, push all changes to
    your branch on GitHub.
3.  Request a PR review.
4.  When the PR is approved, merge into master.
5.  Next build using npx fusion zip and deploy to the core components
    environment for testing.

**Note:** When running or creating a build bundle, you will need a .npmrc
file that gives you access to the private NPM repo. Reach out to a team
member to get this.

## Local Development Process


There are 4 main repos that are actively being developed on and three of
them are NPM packages. As you can imagine, a proper local dev
environment is paramount. We certainly don't want to have to publish an
untested, incomplete block in fusion-news-theme-blocks just to see how
it looks and behaves on Fusion! We are currently wrapping up development
on providing npm link functionality for themes through the Fusion CLI.
We anticpate this to be ready by the time your are ready for
development. If however, it is not, we have a current solution for you
to follow:

1)  Clone the Fusion repo:` git clone git@github.com:WPMedia/fusion.git`

2)  Checkout the branch: `bmiller-2.3-hydrate-extended-theme-dev`

3)  Create an env file at the root your local fusion repository.

Your .env file should look something like this:

	FUSION_REPO=/Users/millerb/work/Fusion-News-Theme
	THEMES_BLOCKS_REPO=/Users/millerb/work/fusion-news-theme-blocks/blocks
	CONTENT_BASE=[get from dev]
	CONTEXT_PATH=pf
	DEFAULT_ARC_SITE=the-sun
	resizerURL=https://corecomponents-the-prophet-prod.cdn.arcpublishing.com/resizer
	resizerKey=[get the key from a dev]

**FUSION\_REPO** should point to your local repo of fusion-news-theme and
the **THEMES\_BLOCKS\_REPO** should point to the /blocks directory of your
local fusion-news-theme-blocks repo.

4)  Then run fusion with the command: `npm run start:admin:theme-dev`

5)  If you would also like to run local code for engine-theme-sdk, then
    extend the .env file to look like this:

	FUSION_REPO=/Users/millerb/work/Fusion-News-Theme
	THEMES_BLOCKS_REPO=/Users/millerb/work/fusion-news-theme-blocks/blocks
	THEMES_ENGINE_SDK_REPO=/Users/millerb/work/engine-theme-sdk
	THEMES_ENGINE_SDK_NAME=@arc-test-org/engine-theme-sdk
	CONTENT_BASE=[get from dev]
	CONTEXT_PATH=pf
	DEFAULT_ARC_SITE=the-sun
	resizerURL=https://corecomponents-the-prophet-prod.cdn.arcpublishing.com/resizer
	resizerKey=[get the key from a dev]

**THEMES\_ENGINE\_SDK\_REPO** should point to your local repo of
engine-theme-sdk and **THEMES\_ENGINE\_SDK\_NAME** is the NPM package name
so Fusion will now to exclude it from the npm install procedures.


6)  Then run this command to start Fusion: `npm run
    start:admin:theme-and-engine-dev`
