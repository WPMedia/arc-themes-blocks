import React from 'react';
import { useComponentContext } from 'fusion:context';
import PropTypes from 'prop-types';
import './headline.scss';

const Headline = ({ customFields }) => {
  const { globalContent: content } = useComponentContext();
  const { includeHeadline = true } = customFields;

  return (
    !!(includeHeadline && content && content.headlines && content.headlines.basic) && (
      <h1 className="headline" dangerouslySetInnerHTML={{ __html: content.headlines.basic }} />
    )
  );
};

Headline.propTypes = {
  customFields: PropTypes.shape({
    includeHeadline: PropTypes.bool,
  }),
};

export default Headline;
