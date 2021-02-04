import React from 'react';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import { useFusionContext } from 'fusion:context';

const SecondaryFontStyles = styled.div.attrs((props) => ({
  arcSite: props.arcSite,
  fontColor: props.fontColor || null,
}))`
  font-family: ${({ arcSite }) => getThemeStyle(arcSite)['secondary-font-family']};

  ${({ arcSite, fontColor }) => fontColor && `
    color: ${getThemeStyle(arcSite)[fontColor]};
  `}
`;

const SecondaryFont = (props) => {
  const { arcSite } = useFusionContext();

  return (
    <SecondaryFontStyles {...props} arcSite={arcSite} />
  );
};

export default SecondaryFont;
