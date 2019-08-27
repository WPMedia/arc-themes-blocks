import React from 'react';
import { useComponentContext } from 'fusion:context';
import PropTypes from 'prop-types';
import './subheadline.scss';

const SubHeadline = ({ customFields }) => {
  const { globalContent: content } = useComponentContext();
  const { includeSubHeadline = true } = customFields;

  return (
    !!(includeSubHeadline && content && content.subheadlines && content.subheadlines.basic) && (
      <h2 className="sub-headline" dangerouslySetInnerHTML={{ __html: content.subheadlines.basic }} />
    )
  );
};

SubHeadline.propTypes = {
  customFields: PropTypes.shape({
    includeSubHeadline: PropTypes.bool,
  }),
};

export default SubHeadline;
