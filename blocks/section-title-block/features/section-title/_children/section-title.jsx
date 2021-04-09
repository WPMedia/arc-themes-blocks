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

const Separator = '  \u00a0 • \u00a0  ';

// using the class twice to ensure the • and the text are both same font-size and
const styledLinkTmpl = (name, id, separator, arcSite) => (
  <span key={id} className="section-title--styled-link">
    <StyledLink
      primaryFont={getThemeStyle(arcSite)['primary-font-family']}
      href={id}
      className="section-title--styled-link"
    >
      {name}
    </StyledLink>
    {separator}
  </span>
);

const SectionTitle = (props) => {
  const { content } = props;
  const { arcSite } = useFusionContext();
  const showSeparator = !!(
    content
    && content.children
    && content.children.length > 1
  );

  return (
    !!(content && (content.name || content.display_name)) && (
      <>
        <StyledTitle
          primaryFont={getThemeStyle(arcSite)['primary-font-family']}
          className="section-title"
        >
          {content.name || content.display_name}
        </StyledTitle>
        <div className="section-container">
          {
            !!(content.children && content.children.length > 0)
            && (content.children.map((child, index) => (
              (child.node_type && child.node_type === 'link' && (
                styledLinkTmpl(child.display_name, child.url, ((content.children.length !== index + 1 && showSeparator) ? Separator : ''), arcSite)
              )) || (
                styledLinkTmpl(child.name, child._id, ((content.children.length !== index + 1 && showSeparator) ? Separator : ''), arcSite)
              )
            )))
          }
        </div>
      </>
    )
  );
};

export default SectionTitle;
