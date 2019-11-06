import React from 'react';
import styled from 'styled-components';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import './headline.scss';

const HeadlineHeader = styled.h1`
  font-family: ${props => props.secondaryFont};
`;

const Headline = () => {
  const { globalContent: content, arcSite } = useFusionContext();

  return (
    !!(content && content.headlines && content.headlines.basic) && (
      <HeadlineHeader className="headline" dangerouslySetInnerHTML={{ __html: content.headlines.basic }} secondaryFont={getThemeStyle(arcSite)['secondary-font-family']} />
    )
  );
};

export default Headline;
