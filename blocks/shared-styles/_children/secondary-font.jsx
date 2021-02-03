import React from 'react';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import { useFusionContext } from 'fusion:context';

const SecondaryFontStyles = styled.div`
  font-family: ${(props) => props.secondayFont};
`;

const SecondaryFont = (props) => {
  const { arcSite } = useFusionContext();

  return (
    <SecondaryFontStyles {...props} secondayFont={getThemeStyle(arcSite)['secondary-font-family']} />
  );
};

export default SecondaryFont;
