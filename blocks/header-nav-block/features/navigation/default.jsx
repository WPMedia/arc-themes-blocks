import React from 'react';
import styled from 'styled-components';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getThemeStyle from 'fusion:themes';

import navHamburger from './images/hamburger.svg';
import navSearch from './images/search.svg';
import navUser from './images/user.svg';
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


const HeaderNav = () => {
  const { arcSite } = useAppContext();
  const primaryColor = getThemeStyle(arcSite)['primary-color'];

  return (
    <StyledNav className="news-theme-navigation" primaryFont={getThemeStyle(arcSite)['secondary-font-family']}>
      <button className="nav-search border" type="button"><img src={navSearch} alt="Navigation bar search" /></button>
      <button className="nav-sections border" type="button">
        <span>Sections</span>
        <img src={navHamburger} alt="Navigation bar sections" />
      </button>
      <div className="logo">
        <img src={getProperties(arcSite).primaryLogo || placeholderLogo} alt={getProperties(arcSite).primaryLogoAlt || 'Navigation bar logo'} />
      </div>
      <NavButton className="nav-sections" type="button" primaryColor={primaryColor}>
        <span>Sign In</span>
        <img src={navUser} alt="Navigation bar sections" />
      </NavButton>
    </StyledNav>
  );
};

HeaderNav.label = 'Navigation – Arc Block';

export default HeaderNav;
