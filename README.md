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

### Testing a package

As of writing, current pattern is to write your unit tests alongside the files you're testing. If you're testing `default.jsx`, your tests would be in the same directory in a file called `default.test.jsx`.

We're using Jest as our test runner and Enzyme as our testing tool for testing React components. Not only will you have the standard Jest assertion available to you. You'll also have all of assertion matchers provided by [jest-enzyme](https://github.com/FormidableLabs/enzyme-matchers/tree/master/packages/jest-enzyme).

### Creating a new package

#### New block

If we wanted to create a new block for our theme called `new-footer-block` the command we'd run with lerna would look something like this.

```sh
npx lerna create @arc-test-org/new-footer-block blocks/new-footer-block
```

The CLI will go through a bunch of questions, can accept all of them for now because we're going to replace most of what it'll generate. In fact the above command can be run with a `--yes` arg to just accept the default for each prompt automatically.

From there we need to update our `package.json` for our new block since the lerna-generated `package.json` is almost entirely useless for blocks. For example, the generated `package.json` includes several references to a `lib` directory. We do not typically have such a directory for blocks.

The structure of blocks is largely incompatible with what lerna generates in this init process, we'll want our `package.json` to look something like this:

```json
{
  "name": "@arc-test-org/header-nav-block",
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
3. There is a `lint` script in the `scripts`. This script is run with `npx lerna run lint` at the root although it can also be run with `npm run lint` if the package root is your working directory.

### Installing `node_modules`

Installing the dependencies for a package is slightly different in lerna, since lerna tracks what dependencies each subpackage uses (including subpackages depending on other subpackages).

When you clone or pull the monorepo, you'll want to run this:

```sh
npx lerna bootstrap
```

This command does all the installing and linking we need to have access to our dependencies.

### Adding a new dependency

Much like installing existing dependencies, we'll want to rely on lerna commands for adding new dependecies and linking subpackages together as well.

[We'll want to use lerna's 'add' command to install new dependencies.](https://github.com/lerna/lerna/tree/master/commands/add#readme) It's unlikely any of our usage will end up deviating from that doc.

### Publishing a subpackage

Knowing the quirks of publishing a subpackage of this monorepo to a registry is very important. Please, please [read the documentation for lerna's 'publish' command before trying to publish anything](https://github.com/lerna/lerna/tree/master/commands/publish#readme).

A few key things to know:

* This repo manages each package version _independently_ meaning you'll need to know the right semver choice for each version change.
* If you want to publish one of our subpackages and there's another subpackage in the repo that has committed and unpublished changes, you will be _required_ to publish a new version of those other subpackages. So do not start a `lerna publish` unless you are in a place where you can publish all of those other unpublished subpackages.
* You'll need to specify the name of the package scope in the `name` field of the `package.json` order for the package to be published for that scope.

### Deploying a block

Once we have completed our new block and merged it to master, we want to get it ready for QA.
To do this there is a few steps we need to follow.

Notes:
* Before deploying a block, we should make sure it works properly when tested locally.
* Our pull request to merge our new block must have been reviewed by at least one person.
* Both blocks and bundles repos should have a .npmrc file with the same token.

1. On Fusion-News-Theme (bundles repo) we will pull from master, update `blocks.json` with our new block (f.e. "@arc-test-org/overline-block"), and commit to master with the change.
2. Run `npx fusion zip` to generate the bundle zip file under /dist.
3. Once the zip file has be generated, go Pagebuilder Editor on [Core Components](https://corecomponents.arcpublishing.com).
4. Under Pagebuilder editor go to Deployer and upload your zipped bundle with the name `blocks-$month-$day-$version`.
5. There can only be four builds running concurrently, so we will need to select one of them and terminate it to leave room for your uploaded build. 
6. Once the new build has uploaded, we will select it and deploy it and use the latest version (f.e. `2.3.8-hydraterc.0`), or ask for the most recent version if it's not being displayed and enter it under "Other".
7. Once we have deployed our build, it will show up under running, but will have a grey circle on the left. We will then select our build and promote it to make sure it's live and your new block shows in the Pagebuilder editor.

## License

TODO
