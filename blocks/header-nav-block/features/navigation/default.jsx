import React from 'react';
import styled from 'styled-components';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';

import navHamburger from './images/hamburger.svg';
import navSearch from './images/search.svg';
import placeholderLogo from './images/arc-placeholder-logo.svg';
import './navigation.scss';

const StyledNav = styled.nav`
  * {
    font-family: ${props => props.primaryFont};
  }
`;

const NavButton = styled.button`
  background-color: ${props => props.primaryColor};
`;

export default () => {
  const { arcSite } = useAppContext();
  const primaryColor = "lime";

  return (
    <StyledNav className="news-theme-navigation" primaryFont="Georgia, Times, serif">
      <NavButton className="nav-search" type="button" primaryColor={primaryColor}><img src={navSearch} alt="Navigation bar search" /></NavButton>
      <NavButton className="nav-sections" type="button" primaryColor={primaryColor}>
        <span>Sections</span>
        <img src={navHamburger} alt="Navigation bar sections" />
      </NavButton>
      <img src={getProperties(arcSite).primaryLogo || placeholderLogo} alt={getProperties(arcSite).primaryLogoAlt || 'Navigation bar logo'} />
    </StyledNav>
  );
};
