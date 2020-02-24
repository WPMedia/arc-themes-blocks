import React from 'react';
import styled from 'styled-components';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import './overline.scss';

const StyledLink = styled.a`
  font-family: ${(props) => props.primaryFont};
  font-weight: bold;
  text-decoration: none;
`;

const Overline = () => {
  const { globalContent: content = {}, arcSite } = useFusionContext();

  const {
    display: labelDisplay,
    url: labelUrl,
    text: labelText,
  } = (content.label && content.label.basic) || {};
  const shouldUseLabel = !!(labelDisplay);

  const {
    _id: sectionUrl,
    name: sectionText,
  } = (content.websites
    && content.websites[arcSite]
    && content.websites[arcSite].website_section) || {};

  const [text, url] = shouldUseLabel ? [labelText, labelUrl] : [sectionText, sectionUrl];

  return text
    ? (
      <StyledLink
        href={url}
        primaryFont={getThemeStyle(arcSite)['primary-font-family']}
        className="overline"
      >
        {text}
      </StyledLink>
    )
    : null;
};

Overline.label = 'Overline – Arc Block';

export default Overline;
