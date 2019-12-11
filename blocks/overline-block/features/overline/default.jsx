import React from 'react';
import styled from 'styled-components';
import { useComponentContext, useAppContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import './overline.scss';

const StyledLink = styled.a`
  font-family: ${props => props.primaryFont};
  font-weight: bold;
  text-decoration: none;
`;

const Overline = () => {
  const { arcSite } = useAppContext();
  const { globalContent: content } = useComponentContext();

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
        dangerouslySetInnerHTML={{
          __html: content.websites[arcSite].website_section.name,
        }}
      />
    )
  );

};

export default Overline;
