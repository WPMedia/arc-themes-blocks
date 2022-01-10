---
# helper funcs https://www.hygen.io/docs/templates/#helpers-and-inflections
to: blocks/<%= h.inflection.dasherize(block_name) %>-block/index.story.jsx
---
import React from 'react';
import <%= h.changeCase.pascal(block_name) %> from './chains/<%= h.inflection.dasherize(block_name) %>/default';

// for more info on storybook and using the component explorer
// https://storybook.js.org/
export default {
  title: 'Chains/<%= h.changeCase.title( block_name ) %>',
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};

const styles = {
  backgroundColor: 'rgb(240 240 240)',
};

const Comp1 = () => <div style={styles}>1</div>;
const Comp2 = () => <div style={styles}>2</div>;

export const oneChild = () => {
  return (
    <<%= h.changeCase.pascal(block_name) %>>
      <Comp1 />
    </<%= h.changeCase.pascal(block_name) %>>
  );
};

export const twoChildren = () => {
  return (
    <<%= h.changeCase.pascal(block_name) %>>
      <Comp1 />
      <Comp2 />
    </<%= h.changeCase.pascal(block_name) %>>
  );
};
