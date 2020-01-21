import React from 'react';
import styled from 'styled-components';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import './tag-title.scss';

const StyledName = styled.h1`
  font-family: ${props => props.primaryFont};
`;

const StyledDescription = styled.p`
  font-family: ${props => props.primaryFont};
`;

const TagTitle = () => {
  const { globalContent: content, arcSite } = useFusionContext();

  return (
    // Check if tag exists
    !!(content && content.Payload && content.Payload[0]) && (
      <>
        <StyledName
          primaryFont={getThemeStyle(arcSite)['primary-font-family']}
          className="tag-name"
        >
          {content.Payload[0].name}
        </StyledName>
        {
          // Only display description if present
          !!(content.Payload[0].description) && (
            <StyledDescription
              primaryFont={getThemeStyle(arcSite)['primary-font-family']}
              className="tag-description"
            >
              {content.Payload[0].description}
            </StyledDescription>
          )
        }
      </>
    )
  );
};

TagTitle.label = 'Tag Title - Arc Block';

export default TagTitle;
