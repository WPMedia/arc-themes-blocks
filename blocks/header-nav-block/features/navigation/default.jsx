import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getThemeStyle from 'fusion:themes';
import HamburgerMenuIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/HamburgerMenuIcon';
import UserIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/UserIcon';
import SectionNav from './_children/section-nav';
import SearchBox from './_children/search-box';
import './navigation.scss';

/* Global Constants */
// Since these values are used to coordinate multiple components, I thought I'd make them variables
// so we could just change the vars instead of multiple CSS values
const iconSize = 16;
const navHeight = '56px';
const navZIdx = 9;
const sectionZIdx = navZIdx - 1;

/* Styled Components */
const StyledNav = styled.nav`
  background-color: ${(props) => (props.navBarColor === 'light' ? '#fff' : '#000')};
  height: ${navHeight};
  z-index: ${navZIdx};

  * {
    font-family: ${(props) => props.font};
  }
`;

const StyledSectionDrawer = styled.div`
  font-family: ${(props) => props.font};
  position: fixed;
  top: ${navHeight};
  z-index: ${sectionZIdx};
`;

const NavButton = styled.button`
  background-color: ${(props) => props.bgColor || '#000'};
`;

/* Main Component */
const Nav = (props) => {
  const { arcSite, deployment, contextPath } = useFusionContext();

  const { primaryLogo, primaryLogoAlt, navColor = 'dark' } = getProperties(arcSite);
  let primaryLogoPath;

  const {
    'primary-color': primaryColor = '#000',
    'primary-font-family': primaryFont,
  } = getThemeStyle(arcSite);

  const { customFields: { hierarchy, showSignIn } = {} } = props;

  const mainContent = useContent({
    source: 'site-service-hierarchy',
    query: {
      site: arcSite,
      hierarchy,
    },
  });

  const sections = (mainContent && mainContent.children) ? mainContent.children : [];

  const [isSectionDrawerOpen, setSectionDrawerOpen] = useState(false);

  const handleEscKey = (event) => {
    if (event.keyCode === 27) {
      setSectionDrawerOpen(false);
    }
  };

  const hamburgerClick = () => {
    setSectionDrawerOpen(!isSectionDrawerOpen);
    document.body.classList.toggle('nav-open');
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscKey, true);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  });

  // Check if URL is absolute/base64
  if (primaryLogo && (primaryLogo.indexOf('http') === 0 || primaryLogo.indexOf('base64') === 0)) {
    primaryLogoPath = primaryLogo;
  } else {
    primaryLogoPath = deployment(`${contextPath}/${primaryLogo}`);
  }

  return (
    <>
      <StyledNav id="main-nav" className={`news-theme-navigation-feature ${navColor === 'light' ? 'light' : 'dark'}`} font={primaryFont} navBarColor={navColor}>

        <div className="nav-left">
          <SearchBox iconSize={20} navBarColor={navColor} />
          <button onClick={hamburgerClick} className={`nav-btn nav-sections-btn border transparent ${navColor === 'light' ? 'nav-btn-light' : 'nav-btn-dark'}`} type="button">
            <span>Sections</span>
            <HamburgerMenuIcon fill={null} height={iconSize} width={iconSize} />
          </button>
        </div>

        <div className="nav-logo">
          <a href="/" title={primaryLogoAlt}>
            {!!primaryLogo && <img src={primaryLogoPath} alt={primaryLogoAlt || 'Navigation bar logo'} />}
          </a>
        </div>

        <div className="nav-right">
          {showSignIn
            && (
            <NavButton className={`nav-btn nav-sections-btn ${navColor === 'light' ? 'nav-btn-light' : 'nav-btn-dark'}`} type="button" bgColor={primaryColor}>
              <span>Sign In</span>
              <UserIcon fill={null} height={iconSize} width={iconSize} />
            </NavButton>
            )}
        </div>
      </StyledNav>

      <StyledSectionDrawer id="nav-sections" className={isSectionDrawerOpen ? 'open' : 'closed'} font={primaryFont}>
        <SectionNav sections={sections}>
          <SearchBox alwaysOpen />
        </SectionNav>
      </StyledSectionDrawer>

      {isSectionDrawerOpen ? <div id="overlay" role="dialog" onKeyDown={handleEscKey} onClick={() => setSectionDrawerOpen(false)} /> : null}
    </>
  );
};

Nav.propTypes = {
  customFields: PropTypes.shape({
    hierarchy: PropTypes.string,
    showSignIn: PropTypes.bool,
  }),
};

Nav.label = 'Navigation – Arc Block';

export default Nav;
