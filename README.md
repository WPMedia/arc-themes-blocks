# Fusion News Theme blocks

This is the lerna-managed monorepo for the blocks that make up the Fusion News Theme.

This monorepo is a collection of packages for blocks and SDK components, but they are all versioned separately for now so that they can be patched separately.

## Instructions

Lerna requires some setup and know-how, so be sure to read the instructions below to prevent any hiccups/accidents/incidents.

### Initial install

Lerna can be run with `npx` from the root repo directory once we've cloned it:

```sh
$ git clone git@github.com:WPMedia/fusion-news-theme-blocks.git
$ cd fusion-news-theme-blocks
$ npx lerna list
# lerna prints a list of all packages in our monorepo
```

### Step-by-Step Block Development Process
NOTE: This will be an ongoing work in progress as we fine tune the development process during and after the MVP release of the themes.

#### 0. Setup
As a prereq, you will need to make sure to have `fusion` and your bundle repos cloned onto your computer. Make sure to check out the latest hydrate version for `fusion` repo.

For `fusion`, you will need this `.env` file:
```sh
DEBUG=*
FUSION_REPO=/PATH/TO/BUNDLE
THEMES_BLOCKS_REPO=/PATH/TO/BLOCKS
```

On your bundle, you will also need a `.env` file with
```sh
CONTENT_BASE=https://<username>:<password>@api.corecomponents.arcpublishing.com
```
as well as `.npmrc` file with
```sh
//registry.npmjs.org/:_authToken=<authToken>
```
Both CONTENT_BASE username/password and .npmrc authToken can be given by your teammate. For more information on access tokens in PageBuilder, see the [documentation](https://redirector.arcpublishing.com/alc/arc-products/pagebuilder/fusion/user-documentation/pagebuilder-engine-how-access-tokens-work-in-pagebuilder/#How-are-access-tokens-used-in-PageBuilder-Engine). The CONTENT_BASE credentials may also be accessible through {your arc id}.arcpublishing.com/developer/access/tokens.

#### 1. Creating the Feature
At this time, local development will be easiest if you first create the feature in the bundle itself rather than part of this blocks repo, because local development using the variable `useLocal` in `blocks.json` will force you to restart fusion with each change. Follow the recipe [here](https://github.com/WPMedia/fusion/blob/master/documentation/recipes/creating-feature-component.md) if you need a refresher on how to do so.

#### 2. Testing the Feature
Test your bundle locally by running the command `npm run start:admin:theme-dev` in the root of the fusion directory. This will also import any existing blocks as defined in the bundle's blocks.json as well so you can see them working alongside your feature.

#### 3. Design QA
When you’re done with the feature initially (when you think you’ve covered what’s on the ticket), and the ticket is labeled for Design QA, go through the following so that the designer can check off on the designs:
1. Create a draft PR with your branch on the bundle repo
2. On that PR, put in all the information that’s needed to recreate what you’ve been testing with, as well as the link to the JIRA ticket
3. Send the link to the draft PR to the designer, move the ticket to the Design QA column
4. The designer will then git checkout that bundle repo branch, test the designs, and leave comments on that draft PR with any changes needed
5. Make edits to the code as necessary, push to the PR
6. Repeat steps 4 and 5 until Design QA is done
7. Move the feature into the blocks by following the next step, create the PR for it, and put the ticket to Code Review

#### 4. Creating/Setting up a new block
If we wanted to create a new block for our theme called `new-footer-block` the command we'd run with lerna would look something like this.

```sh
npx lerna create @wpmedia/new-footer-block blocks/new-footer-block
```

The CLI will go through a bunch of questions, can accept all of them for now because we're going to replace most of what it'll generate. In fact the above command can be run with a `--yes` arg to just accept the default for each prompt automatically.

From there we need to update our `package.json` for our new block since the lerna-generated `package.json` is almost entirely useless for blocks. For example, the generated `package.json` includes several references to a `lib` directory. We do not typically have such a directory for blocks.

The structure of blocks is largely incompatible with what lerna generates in this init process, we'll want our `package.json` to look something like this:

```json
{
  "name": "@wpmedia/header-nav-block",
  "version": "0.0.0",
  "description": "Fusion News Theme header nav block",
  "author": "Joe Grosspietsch <joe.grosspietsch@washpost.com>",
  "homepage": "https://github.com/WPMedia/fusion-news-theme-blocks",
  "license": "UNLICENSED",
  "main": "index.js",
  "files": [
    "features",
    "chains",
    "layouts"
  ],
  "publishConfig": {
    "access": "restricted"
  },
  "scripts": {
    "test": "echo \"Error: run tests from root\" && exit 1",
    "lint": "eslint --ext js --ext jsx features"
  }
}
```

Note three things here:

1. The initial version is set to `0.0.0`. This is because on your initial commit you are going to choose the first version you want to publish. Otherwise, it will default to `1.0.0` and then you'll need to bump up the package version no matter what once you publish.
2. The `files` consists of three directories: `features`, `chains`, and `layouts`. These are the three types of components blocks currently support. You'll want to delete the `lib` and `__tests__` directories from your repo as well as the `files` list.
3. There is a `lint` and `lint:fix` script in the `scripts`. Before your commits are pushed, the files need to be linted to [Airbnb code style](https://github.com/airbnb/javascript) and [React best practices](https://github.com/yannickcr/eslint-plugin-react). This is helpful for learning best practices as well as developer velocity. (Plus, it's more fun to worry about coding than code style!) First, have a clean `node_modules` folder. Run `sudo rm -rf node_modules/`. Then either `sudo npx lerna bootstrap` or `sudo npm i` to install dependencies. Next, from the top-level directory, run `npm run lint`. If there are eslint-fixable errors that you notice, you can run `npm run lint:fix` that will auto-fix them. If you have [VS Code eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) downloaded, then saving a file will auto-format. It will also notice linting errors as you type per airbnb rules. To see the linting rules, go to `.eslintrc.js`. Your `.vscode/settings.json` can be configured as follows for auto-format:

```
{
  "eslint.alwaysShowStatus": true,
  "eslint.format.enable": true,
  "eslint.lintTask.enable": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "eslint.enable": true
}
```

Make sure to reorganize the newly created directory in the same way as other blocks. Once that's created, copy the feature folder that you've created/developed from step 1 into the corresponding directory (<block-name>/<features/output-types/layouts/sources>).

##### Installing `node_modules`

Installing the dependencies for a package is slightly different in lerna, since lerna tracks what dependencies each subpackage uses (including subpackages depending on other subpackages).

When you clone or pull the monorepo, you'll want to run this:

```sh
npx lerna bootstrap
```

This command does all the installing and linking we need to have access to our dependencies.

##### Adding a new dependency

Much like installing existing dependencies, we'll want to rely on lerna commands for adding new dependecies and linking subpackages together as well.

[We'll want to use lerna's 'add' command to install new dependencies.](https://github.com/lerna/lerna/tree/master/commands/add#readme) It's unlikely any of our usage will end up deviating from that doc.

#### 5. Writing Unit Tests
Unit tests should be written alongside the feature before it is pushed to Code Review. We're using Jest as our test runner and Enzyme as our testing tool for testing React components. Not only will you have the standard Jest assertion available to you. You'll also have all of assertion matchers provided by [jest-enzyme](https://github.com/FormidableLabs/enzyme-matchers/tree/master/packages/jest-enzyme). The test files should be placed in the same directory as the main feature React file as well as be named the same. If you're testing `default.jsx`, your tests would be in the same directory in a file called `default.test.jsx`.

The tests can be run with the npm command `npm run test`. Make sure to watch out for coverage, because the coverage threshold is 80% for *all* blocks. Testing patterns and examples can be seen in other blocks that have been developed so far.

#### 5. Code Review
Now that the feature is in the right directory format, you can create a pull request so that it can be reviewed and merged. Make sure to move the JIRA ticket to `Code Review` section at this point. Once it is approved by the team member(s), you can merge the code into the master branch.

#### 6. Publishing the block
Before publishing any new blocks, make sure to check `git fetch --all` and `git pull` from master so that you can get the latest *published* version of the blocks and not accidentally publish any conflicting/outdated version of other blocks. Knowing the quirks of publishing a subpackage of this monorepo to a registry is very important. Please, please [read the documentation for lerna's 'publish' command before trying to publish anything](https://github.com/lerna/lerna/tree/master/commands/publish#readme).

Once you do so, you can publish the block by running `npx lerna publish` at the root of this repo.

A few key things to know:

* This repo manages each package version _independently_ meaning you'll need to know the right semver choice for each version change.
* If you want to publish one of our subpackages and there's another subpackage in the repo that has committed and unpublished changes, you will be _required_ to publish a new version of those other subpackages. So do not start a `lerna publish` unless you are in a place where you can publish all of those other unpublished subpackages.
* You'll need to specify the name of the package scope in the `name` field of the `package.json` order for the package to be published for that scope.

#### 7. Deploying a block to sandbox/production
Once the block is published, it is now ready to be deployed - we can include it in the bundle's `blocks.json` so that it can be used in sandbox/production.

Notes:
* Before deploying a block, we should make sure it works properly when tested locally. You can simulate how a block would work locally by following the guide [here](https://github.com/WPMedia/Fusion-News-Theme/blob/master/README.md)
* Our pull request to merge our new block must have been reviewed by at least one person.
* Both blocks and bundles repos should have a .npmrc file with the same token.

1. On Fusion-News-Theme (bundles repo) we will pull from master, update `blocks.json` with our new block (f.e. "@wpmedia/overline-block"), and commit to master with the change.
2. Run `npx fusion zip` to generate the bundle zip file under /dist.
3. Once the zip file has be generated, go Pagebuilder Editor on [Core Components](https://corecomponents.arcpublishing.com).
4. Under Pagebuilder editor go to Deployer and upload your zipped bundle with the name `blocks-$month-$day-$version`.
5. There can only be four builds running concurrently, so we will need to select one of them and terminate it to leave room for your uploaded build. 
6. Once the new build has uploaded, we will select it and deploy it and use the latest version (i.e. `2.3.8-hydraterc.0`), or ask for the most recent version if it's not being displayed and enter it under "Other".
7. Once we have deployed our build, it will show up under running, but will have a grey circle on the left. We will then select our build and promote it to make sure it's live and your new block shows in the Pagebuilder editor.

## License

TODO
