import React from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import { PrimaryFont } from '@wpmedia/shared-styles';

import './subheadline.scss';

const SubHeadline = () => {
  const { globalContent: content, customFields = {} } = useFusionContext();
  const { valueToDisplay = 'Subheadline' } = customFields;
  const value = (valueToDisplay === 'Description') ? content?.description?.basic
    : content?.subheadlines?.basic;
  return (
    !!value && (
      <PrimaryFont
        as="h2"
        className="h4-primary sub-headline"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    )
  );
};

SubHeadline.propTypes = {
  customFields: PropTypes.shape({
    valueToDisplay: PropTypes.oneOf([
      'Subheadline', 'Description',
    ]).tag({
      label: 'Value to display',
      group: 'Content Configuration',
      defaultValue: 'Subheadline',
    }),
  }),
};

SubHeadline.label = 'Subheadline – Arc Block';

export default SubHeadline;
