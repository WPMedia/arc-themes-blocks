---
# helper funcs https://www.hygen.io/docs/templates/#helpers-and-inflections
to: blocks/<%= h.inflection.dasherize(block_name) %>-block/index.story.jsx
---
import React from 'react';
import <%= h.changeCase.pascal(block_name) %> from './features/<%= h.inflection.dasherize(block_name) %>/default';

export default {
  title: 'Blocks/<%= h.changeCase.title( block_name ) %>',
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};

export const Basic = () => <%= h.changeCase.pascal(block_name) %>;