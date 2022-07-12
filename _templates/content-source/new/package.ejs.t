---
# helper funcs https://www.hygen.io/docs/templates/#helpers-and-inflections
to: blocks/<%= h.inflection.dasherize(block_name) %>-content-source-block/package.json
---
{
  "name": "@wpmedia/<%= h.inflection.dasherize(block_name) %>-content-source-block",
  "version": "0.1.0",
  "description": "<%= h.changeCase.title( block_name ) %> Content Source Block",
  "homepage": "https://github.com/WPMedia/arc-themes-blocks",
  "license": "CC-BY-NC-ND-4.0",
  "main": "index.js",
  "files": [
    "sources"
  ],
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/",
    "access": "public"
  },
  "repository": {
    "type": "git",
    "url": "ssh://git@github.com/WPMedia/arc-themes-blocks.git",
    "directory": "blocks/<%= h.inflection.dasherize(block_name) %>-content-source-block"
  },
  "dependencies": {
    "axios": "^0.26.0"
  }
}
