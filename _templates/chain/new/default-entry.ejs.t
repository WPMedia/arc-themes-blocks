---
# helper funcs https://www.hygen.io/docs/templates/#helpers-and-inflections
to: blocks/<%= h.inflection.dasherize(block_name) %>-block/chains/<%= h.inflection.dasherize(block_name) %>/default.jsx
---
import React from 'react';
import PropTypes from '@arc-fusion/prop-types';

const <%= h.changeCase.pascal(block_name) %> = ({ children }) => {
  return children;
};

<%= h.changeCase.pascal(block_name) %>.label = '<%= h.changeCase.title( block_name ) %> - Arc Block';

<%= h.changeCase.pascal(block_name) %>.icon = 'layout-none';

<%= h.changeCase.pascal(block_name) %>.propTypes = {
  children: PropTypes.array,
};

export default <%= h.changeCase.pascal(block_name) %>;
