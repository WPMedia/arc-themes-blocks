---
# helper funcs https://www.hygen.io/docs/templates/#helpers-and-inflections
to: blocks/<%= h.inflection.dasherize(block_name) %>-block/features/<%= h.inflection.dasherize(block_name) %>/default.jsx
---
import React from 'react';
import PropTypes from '@arc-fusion/prop-types';

import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';

// icons and other utilities can be found in the engine theme sdk storybook
// https://beta--5eed0506faad4f0022fedf95.chromatic.com/
import {
  EnvelopeIcon,
} from '@wpmedia/engine-theme-sdk';

function <%= h.changeCase.pascal(block_name) %>({ customFields }) {
  // for intro material on consuming react props
  // https://reactjs.org/docs/components-and-props.html
  const { showIcon } = customFields;

  // get properties from context for using translations in intl.json
  // See document for more info https://arcpublishing.atlassian.net/wiki/spaces/TI/pages/2538275032/Lokalise+and+Theme+Blocks
  const { arcSite } = useFusionContext();
  const { locale } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);

  return (
    <div>
      <p>{phrases.t('<%= h.inflection.dasherize(block_name) %>-block.hello-text')}</p>
      {showIcon && <EnvelopeIcon />}
    </div>
  );
}

<%= h.changeCase.pascal(block_name) %>.label = '<%= h.changeCase.title( block_name ) %> – Arc Block';

// find matching icon in https://redirector.arcpublishing.com/pagebuilder/block-icon-library
<%= h.changeCase.pascal(block_name) %>.icon = 'shopping-bag-smile';

<%= h.changeCase.pascal(block_name) %>.propTypes = {
  customFields: PropTypes.shape({
    showIcon: PropTypes.boolean.tag({
      name: 'Show icon?',
      defaultValue: false,
    }),
  }),
};

export default <%= h.changeCase.pascal(block_name) %>;
