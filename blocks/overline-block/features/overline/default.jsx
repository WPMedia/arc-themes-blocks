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

function _get (obj, ...args) {
  return args.reduce((obj, level) => obj && obj[level], obj)
}

const Overline = () => {
  const { globalContent: content, arcSite } = useFusionContext();

  const shouldUseLabel = !!_get(content, 'label', 'basic', 'display')

  const labelText = _get(content, 'label', 'basic', 'text')
  const labelUrl = _get(content, 'label', 'basic', 'url')

  const sectionText = _get(content, 'websites', arcSite, 'website_section', 'name')
  const sectionUrl = _get(content, 'websites', arcSite, 'website_section', '_id')

  const [text, url] = shouldUseLabel ? [labelText, labelUrl] : [sectionText, sectionUrl]

  return text
    ? (
      <StyledLink
        href={url}
        primaryFont={getThemeStyle(arcSite)['primary-font-family']}
        className='overline'
      >
        {text}
      </StyledLink>
    )
    : null
}

Overline.label = 'Overline – Arc Block'

export default Overline
