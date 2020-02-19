import React from 'react';
import styled from 'styled-components';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getThemeStyle from 'fusion:themes';

import HamburgerMenuIcon from '@arc-test-org/engine-theme-sdk/dist/es/components/icons/HamburgerMenuIcon';
import SearchIcon from '@arc-test-org/engine-theme-sdk/dist/es/components/icons/SearchIcon';
import UserIcon from '@arc-test-org/engine-theme-sdk/dist/es/components/icons/UserIcon';
import ArcLogo from '@arc-test-org/engine-theme-sdk/dist/es/components/ArcLogo';
import './navigation.scss';

const StyledNav = styled.nav`
  * {
    font-family: ${(props) => props.primaryFont};
  }
`;

const NavButton = styled.button`
  background-color: ${(props) => props.primaryColor};
`;


const HeaderNav = () => {
  const { arcSite } = useAppContext();
  const primaryColor = getThemeStyle(arcSite)['primary-color'];

  return (
    <StyledNav className="news-theme-navigation" primaryFont={getThemeStyle(arcSite)['secondary-font-family']}>
      <button className="nav-search border" type="button"><SearchIcon fill="white" /></button>
      <button className="nav-sections border" type="button">
        <span>Sections</span>
        <HamburgerMenuIcon fill="white" />
      </button>
      <div className="logo">
        {
          getProperties(arcSite).primaryLogo
            ? <img src={getProperties(arcSite).primaryLogo} alt={getProperties(arcSite).primaryLogoAlt || 'Navigation bar logo'} />
            : <ArcLogo />
        }
      </div>
      <NavButton className="nav-sections" type="button" primaryColor={primaryColor}>
        <span>Sign In</span>
        <UserIcon fill="white" />
      </NavButton>
    </StyledNav>
  );
};

HeaderNav.label = 'Navigation – Arc Block';

export default HeaderNav;
