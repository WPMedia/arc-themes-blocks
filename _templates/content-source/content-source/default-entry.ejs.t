---
# helper funcs https://www.hygen.io/docs/templates/#helpers-and-inflections
to: blocks/<%= h.inflection.dasherize(block_name) %>content-source-block/sources/<%= h.inflection.dasherize(content_source_name) %>/index.js
---
const params = {
  input: 'text',
};

const resolve = (key) => {
  const {
    input, 'arc-site': arcSite,
  } = key;

  return `${arcSite}-${input}`;
};

export default {
  resolve,
  params,
  transform: (data) => data,
};
