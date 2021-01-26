import React from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import './subheadline.scss';
import styled from 'styled-components';

const SubheadH2 = styled.h2`
  font-family: ${(props) => props.primaryFont};
`;

const SubHeadline = () => {
  const { globalContent: content, customFields = {}, arcSite } = useFusionContext();
  const { valueToDisplay = 'Subheadline' } = customFields;
  const value = (valueToDisplay === 'Description') ? content?.description?.basic
    : content?.subheadlines?.basic;
  return (
    !!value && (
      <SubheadH2
        className="h4-primary sub-headline"
        primaryFont={getThemeStyle(arcSite)['primary-font-family']}
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
