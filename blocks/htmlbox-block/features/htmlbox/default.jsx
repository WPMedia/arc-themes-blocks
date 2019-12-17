import React from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';

const HTMLBox = () => {
  let htmlbox = null;
  const { customFields: { HTML } } = useFusionContext();
  if (HTML) {
    htmlbox = <div dangerouslySetInnerHTML={{ __html: HTML }} />;
  }
  return htmlbox;
};

HTMLBox.propTypes = {
  customFields: PropTypes.shape({
    HTML: PropTypes.string,
  }),
};

export default HTMLBox;
