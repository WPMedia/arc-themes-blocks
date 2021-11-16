---
# helper funcs https://www.hygen.io/docs/templates/#helpers-and-inflections
to: blocks/<%= h.inflection.dasherize(block_name) %>-block/package.json
---
{
  "name": "@wpmedia/<%= h.inflection.dasherize(block_name) %>-block",
  "version": "0.1.0",
  "description": "<%= h.changeCase.title( block_name ) %> Block",
  "homepage": "https://github.com/WPMedia/fusion-news-theme-blocks",
  "license": "CC-BY-NC-ND-4.0",
  "main": "index.js",
  "files": [
    "features",
    "intl.json"
  ],
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/",
    "access": "public"
  },
  "repository": {
    "type": "git",
    "url": "ssh://git@github.com/WPMedia/fusion-news-theme-blocks.git",
    "directory": "blocks/<%= h.inflection.dasherize(block_name) %>-block"
  },
  "peerDependencies": {
    "@arc-fusion/prop-types": "^0.1.5"
  }
}

