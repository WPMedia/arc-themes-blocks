import React from 'react';
import PropTypes from 'prop-types';

const Textfile = ({ customFields }) => {
  const { Text = '' } = customFields || {};
  return (
    <>{ Text }</>
  );
};

Textfile.label = 'Text File – Arc Block';

Textfile.propTypes = {
  customFields: PropTypes.shape({
    // eslint-disable-next-line react/no-typos
    Text: PropTypes.richtext,
  }),
};

export default Textfile;
