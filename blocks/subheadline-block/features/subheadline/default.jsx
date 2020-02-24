import React from 'react';
import { useAppContext, useComponentContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import './subheadline.scss';
import styled from 'styled-components';

const SubheadH2 = styled.h2`
  font-family: ${(props) => props.primaryFont};
`;

const SubHeadline = () => {
  const { arcSite } = useAppContext();
  const { globalContent: content } = useComponentContext();

  return (
    !!(content && content.subheadlines && content.subheadlines.basic) && (
      <SubheadH2 className="h4-primary sub-headline" primaryFont={getThemeStyle(arcSite)['primary-font-family']} dangerouslySetInnerHTML={{ __html: content.subheadlines.basic }} />
    )
  );
};

SubHeadline.label = 'Subheadline – Arc Block';

export default SubHeadline;
