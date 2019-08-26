import React from 'react';
import { useComponentContext } from 'fusion:context';
import PropTypes from 'prop-types';
import './headline.scss';

const Headline = ({ customFields }) => {
  const componentContext = useComponentContext();
  const content = componentContext.globalContent;
  const { includeHeadline = true } = customFields;
  return (
    includeHeadline && (
    <h1 className="headline">
      {(content && content.headlines && content.headlines.basic) || ''}
    </h1>
    )
  );
};

Headline.propTypes = {
  customFields: PropTypes.shape({
    includeHeadline: PropTypes.bool,
  }),
};

export default Headline;
