---
# helper funcs https://www.hygen.io/docs/templates/#helpers-and-inflections
to: blocks/<%= h.inflection.dasherize(block_name) %>-block/features/<%= h.inflection.dasherize(block_name) %>/default.jsx
---
import React from 'react';
import PropTypes from '@arc-fusion/prop-types';

function <%= h.changeCase.pascal(block_name) %>(props) {
	return (
		<div>
			<p>Hello</p>
		</div>
	)
}

<%= h.changeCase.pascal(block_name) %>.label = '<%= h.changeCase.title( block_name ) %> – Arc Block';

// find matching icon in https://redirector.arcpublishing.com/pagebuilder/block-icon-library
<%= h.changeCase.pascal(block_name) %>.icon = 'shopping-bag-smile';

export default <%= h.changeCase.pascal(block_name) %>;
