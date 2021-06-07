import React from 'react';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import { useFusionContext } from 'fusion:context';

const PrimaryFontStyles = styled.div.attrs((props) => ({
  arcSite: props.arcSite,
}))`
  font-family: ${({ arcSite }) => getThemeStyle(arcSite)['primary-font-family']};
  color: var(--colors-primary);
  background-color: var(--colors-background);
`;

const PrimaryFont = (props) => {
  const { arcSite } = useFusionContext();

  return (
    <PrimaryFontStyles {...props} arcSite={arcSite} />
  );
};

export default PrimaryFont;
