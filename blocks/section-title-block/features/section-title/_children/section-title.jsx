import React from 'react';
import styled from 'styled-components';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import './section-title.scss';

const StyledTitle = styled.h1`
  font-family: ${(props) => props.primaryFont};
  font-weight: bold;
`;

const StyledLink = styled.a`
  font-family: ${(props) => props.primaryFont};
  text-decoration: none;
`;

const SectionTitle = (props) => {
  const { content } = props;
  const { arcSite } = useFusionContext();
  const showSeparator = !!(
    content
    && content.children
    && content.children.length > 1
  );

  return (
    !!(content && content.name) && (
      <>
        <StyledTitle
          primaryFont={getThemeStyle(arcSite)['primary-font-family']}
          className="section-title"
        >
          {content.name}
        </StyledTitle>
        <div className="section-container">
          {
            (content.children)
            && (content.children.map((child, index) => (
              <StyledLink
                primaryFont={getThemeStyle(arcSite)['primary-font-family']}
                href={child._id}
                key={child.id}
              >
                {`${child.name}${(content.children.length !== index + 1 && showSeparator) ? '  \u00a0 • \u00a0  ' : ''}`}
              </StyledLink>
            )))
          }
        </div>
      </>
    )
  );
};

export default SectionTitle;
