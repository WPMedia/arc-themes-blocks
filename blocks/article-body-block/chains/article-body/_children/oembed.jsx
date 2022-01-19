import React from 'react';
import PropTypes from '@arc-fusion/prop-types';
import EmbedContainer from 'react-oembed-container';

const Oembed = ({
  element,
}) => (
  <div className="block-margin-bottom">
    <EmbedContainer markup={element.raw_oembed.html}>
      <div dangerouslySetInnerHTML={{ __html: element.raw_oembed.html }} />
    </EmbedContainer>
  </div>
);

Oembed.propTypes = {
  element: PropTypes.object,
};

export default Oembed;
