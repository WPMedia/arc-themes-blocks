---
# helper funcs https://www.hygen.io/docs/templates/#helpers-and-inflections
to: blocks/<%= h.inflection.dasherize(block_name) %>-content-source-block/index.story.jsx
unless_exists: true
---
import React from 'react';
import <%= h.changeCase.pascal(feature_name) %> from './features/<%= h.inflection.dasherize(feature_name) %>/default';

// for more info on storybook and using the component explorer
// https://storybook.js.org/
export default {
  title: 'Blocks/<%= h.changeCase.title(block_name) %> Content Source',
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};

export const ShowIcon = () => <<%= h.changeCase.pascal(feature_name) %> customFields={{ showIcon: true }} />;

export const HideIcon = () => <<%= h.changeCase.pascal(feature_name) %> customFields={{ showIcon: false }} />;
