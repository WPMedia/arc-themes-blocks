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
