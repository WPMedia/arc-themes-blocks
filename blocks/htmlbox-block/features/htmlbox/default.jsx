import React from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import Static from 'fusion:static';

const HTMLBox = () => {
  let htmlbox = null;
  const { customFields: { HTML, id = 'static' } } = useFusionContext();
  if (HTML) {
    htmlbox = (
      <Static id={id.replace(/\s/g, '')}>
        <div dangerouslySetInnerHTML={{ __html: HTML }} />
      </Static>
    );
  }
  return htmlbox;
};

HTMLBox.label = 'HTML Box – Arc Block';

HTMLBox.propTypes = {
  customFields: PropTypes.shape({
    id: PropTypes.string.isRequired,
    HTML: PropTypes.richtext,
  }),
};

export default HTMLBox;
