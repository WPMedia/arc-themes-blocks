---
# helper funcs https://www.hygen.io/docs/templates/#helpers-and-inflections
to: blocks/<%= h.inflection.dasherize(block_name) %>-block/features/<%= h.inflection.dasherize(block_name) %>/default.jsx
---
import React from 'react';
import PropTypes from '@arc-fusion/prop-types';

// icons and other utilities can be found in the engine theme sdk storybook
// https://beta--5eed0506faad4f0022fedf95.chromatic.com/
import {
  EnvelopeIcon,
} from '@wpmedia/engine-theme-sdk';

function <%= h.changeCase.pascal(block_name) %>(props) {
  // for intro material on consuming react props
  // https://reactjs.org/docs/components-and-props.html
  const { customFields } = props;
  const { showIcon } = customFields;

  return (
    <div>
      <p>Hello</p>
      {showIcon && <EnvelopeIcon />}
    </div>
  );
}

// todo: update this example linked because the code is not valid
// PageBuilder Engine reads the block name from the label
// https://redirector.arcpublishing.com/alc/arc-products/pagebuilder/fusion/developer-documentation/feature-api/#Static-Values
<%= h.changeCase.pascal(block_name) %>.label = '<%= h.changeCase.title( block_name ) %> – Arc Block';

// find matching icon in https://redirector.arcpublishing.com/pagebuilder/block-icon-library
<%= h.changeCase.pascal(block_name) %>.icon = 'shopping-bag-smile';

<%= h.changeCase.pascal(block_name) %>.propTypes = {
  // custom fields syntax can be found in ALC
  // https://redirector.arcpublishing.com/alc/arc-products/pagebuilder/fusion/developer-documentation/custom-fields/
  customFields: PropTypes.shape({
    showIcon: PropTypes.boolean.tag({
      name: 'Show icon?',
      defaultValue: false,
    }),
  }),
};

export default <%= h.changeCase.pascal(block_name) %>;
