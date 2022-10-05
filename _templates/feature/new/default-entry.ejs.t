---
# helper funcs https://www.hygen.io/docs/templates/#helpers-and-inflections
to: blocks/<%= h.inflection.dasherize(block_name) %>-block/features/<%= h.inflection.dasherize(block_name) %>/default.jsx
---
import React from 'react';
import PropTypes from '@arc-fusion/prop-types';

// Arc Themes Components - Base set of components used to compose blocks
// https://github.com/WPMedia/arc-themes-components/
import {
  Heading,
  usePhrases,
} from '@wpmedia/arc-themes-components';

const BLOCK_CLASS_NAME = "b-<%= h.inflection.dasherize(block_name) %>";

function <%= h.changeCase.pascal(block_name) %>({ customFields }) {
  // for intro material on consuming react props
  // https://reactjs.org/docs/components-and-props.html
  const { showHeading } = customFields;

  // get properties from context for using translations in intl.json
  // See document for more info https://arcpublishing.atlassian.net/wiki/spaces/TI/pages/2538275032/Lokalise+and+Theme+Blocks
  const phrases = usePhrases();

  return (
    <div className={`${BLOCK_CLASS_NAME}`}>
      {showHeading ? <Heading>
        {phrases.t('<%= h.inflection.dasherize(block_name) %>-block.hello-text')}
      </Heading> : null}
    </div>
  );
}

<%= h.changeCase.pascal(block_name) %>.label = '<%= h.changeCase.title( block_name ) %> – Arc Block';

// find matching icon in https://redirector.arcpublishing.com/pagebuilder/block-icon-library
<%= h.changeCase.pascal(block_name) %>.icon = 'shopping-bag-smile';

<%= h.changeCase.pascal(block_name) %>.propTypes = {
  customFields: PropTypes.shape({
    showHeading: PropTypes.boolean.tag({
      name: 'Show Heading?',
      defaultValue: false,
    }),
  }),
};

export default <%= h.changeCase.pascal(block_name) %>;
