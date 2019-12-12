import React from 'react';
import styled from 'styled-components';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import './overline.scss';

const StyledLink = styled.a`
  font-family: ${props => props.primaryFont};
  font-weight: bold;
  text-decoration: none;
`;

const Overline = () => {
  const { globalContent: content, arcSite } = useFusionContext();

  return (
    !!(
      content
      && content.websites[arcSite].website_section
      && content.websites[arcSite].website_section.name
      && content.websites[arcSite].website_section._id
    ) && (
      <StyledLink
        href={content.websites[arcSite].website_section._id}
        primaryFont={getThemeStyle(arcSite)['primary-font-family']}
        className="overline"
      >
        {content.websites[arcSite].website_section.name}
      </StyledLink>
    )
  );
};

export default Overline;
