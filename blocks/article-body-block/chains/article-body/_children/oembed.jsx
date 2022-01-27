import React from 'react';
import PropTypes from '@arc-fusion/prop-types';

const Oembed = ({
  element,
}) => (
  <div className="block-margin-bottom">
    <div dangerouslySetInnerHTML={{ __html: element.raw_oembed.html }} />
  </div>
);

Oembed.propTypes = {
  element: PropTypes.object,
};

export default Oembed;
