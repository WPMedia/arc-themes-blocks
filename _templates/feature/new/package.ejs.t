---
# helper funcs https://www.hygen.io/docs/templates/#helpers-and-inflections
to: blocks/<%= h.inflection.dasherize(block_name) %>-block/package.json
---
{
  "name": "@wpmedia/<%= h.inflection.dasherize(block_name) %>-block",
  "version": "0.1.0",
  "description": "<%= h.changeCase.title( block_name ) %> Block",
  "author": "Arc XP - Themes",
  "homepage": "https://github.com/WPMedia/arc-themes-blocks",
  "license": "CC-BY-NC-ND-4.0",
  "main": "",
  "files": [
    "_index.scss",
    "features",
    "intl.json"
  ],
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/",
    "access": "public"
  },
  "repository": {
    "type": "git",
    "url": "ssh://git@github.com/WPMedia/arc-themes-blocks.git",
    "directory": "blocks/<%= h.inflection.dasherize(block_name) %>-block"
  },
  "peerDependencies": {
    "@arc-fusion/prop-types": "^0.1.5",
    "@wpmedia/arc-themes-components": "*"
  }
}
