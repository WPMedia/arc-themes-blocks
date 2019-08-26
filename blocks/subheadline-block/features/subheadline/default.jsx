import React from 'react';
import { useComponentContext } from 'fusion:context';
import PropTypes from 'prop-types';
import './subheadline.scss';

const SubHeadline = ({ customFields }) => {
  const { globalContent: content } = useComponentContext();
  const { includeSubHeadline = true } = customFields;
  return (
    includeSubHeadline && (
      <h2 className="sub-headline">
        {(content && content.subheadlines && content.subheadlines.basic) || ''}
      </h2>
    )
  );
};

SubHeadline.propTypes = {
  customFields: PropTypes.shape({
    includeSubHeadline: PropTypes.bool,
  }),
};

export default SubHeadline;
