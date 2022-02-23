---
# helper funcs https://www.hygen.io/docs/templates/#helpers-and-inflections
to: blocks/<%= h.inflection.dasherize(block_name) %>-content-source-block/jest.config.js
---
const base = require('../../jest/jest.config.base');

module.exports = {
  ...base,
};
