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

### Creating a new package

#### New block

If we wanted to create a new block for our theme called `new-footer-block` the command we'd run with lerna would look something like this.

```sh
npx lerna create @arc-test-org/new-footer-block blocks/new-footer-block
```

The CLI will go through a bunch of questions, can accept all of them for now because we're going to replace most of it. In fact the above command can be run with a `--yes` arg to just accept everything automatically.

From there we need to update our `package.json` for our new block since the lerna-generated `package.json` is almost entirely useless for blocks. For example, the generated `package.json` includes several references to a `lib` directory. We do not typically have such a directory for blocks.
