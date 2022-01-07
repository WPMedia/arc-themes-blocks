---
# helper funcs https://www.hygen.io/docs/templates/#helpers-and-inflections
to: blocks/<%= h.inflection.dasherize(block_name) %>-block/chains/<%= h.inflection.dasherize(block_name) %>/default.jsx
---
import React from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { Heading, HeadingSection } from '@wpmedia/shared-styles';

import '@wpmedia/shared-styles/scss/_chains.scss';

const <%= h.changeCase.pascal(block_name) %> = ({ children, customFields = {} }) => {
  const { heading = null } = customFields;

  if (!heading) {
    return <>{children}</>;
  }

  return (
    <HeadingSection>
      <Heading className="chain-heading">{heading}</Heading>
      {children}
    </HeadingSection>
  );
};

<%= h.changeCase.pascal(block_name) %>.label = '<%= h.changeCase.title( block_name ) %> - Arc Block';

<%= h.changeCase.pascal(block_name) %>.icon = 'layout-none';

<%= h.changeCase.pascal(block_name) %>.propTypes = {
  children: PropTypes.array,
  customFields: PropTypes.shape({
    heading: PropTypes.string.tag({
      label: 'Heading',
    }),
  }),
};

export default <%= h.changeCase.pascal(block_name) %>;
