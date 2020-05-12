import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getThemeStyle from 'fusion:themes';
import HamburgerMenuIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/HamburgerMenuIcon';
import ArcLogo from '@wpmedia/engine-theme-sdk/dist/es/components/ArcLogo';
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

/* Main Component */
const Nav = (props) => {
  const { arcSite } = useAppContext();

  const { primaryLogo, primaryLogoAlt } = getProperties(arcSite);

  const {
    'primary-font-family': primaryFont,
  } = getThemeStyle(arcSite);

  const { children = [], customFields: { hierarchy, signInOrder, navColor } = {} } = props;

  // signInOrder is 1-based instead of 0-based, so we subtract 1
  const signInButton = (Number.isInteger(signInOrder) && children[signInOrder - 1])
    ? children[signInOrder - 1]
    : null;

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

  useEffect(() => {
    window.addEventListener('keydown', handleEscKey, true);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  });

  return (
    <>
      <StyledNav className={`news-theme-navigation-chain ${navColor === 'light' ? 'light' : 'dark'}`} font={primaryFont} navBarColor={navColor}>

        <div className="nav-left">
          <SearchBox iconSize={20} navBarColor={navColor} />
          <button onClick={() => setSectionDrawerOpen(!isSectionDrawerOpen)} className={`nav-btn nav-sections-btn border transparent ${navColor === 'light' ? 'nav-btn-light' : 'nav-btn-dark'}`} type="button">
            <span>Sections</span>
            <HamburgerMenuIcon fill={null} height={iconSize} width={iconSize} />
          </button>
        </div>

        <div className="nav-logo">
          <a href="/" title={primaryLogoAlt}>
            {primaryLogo
              ? <img src={primaryLogo} alt={primaryLogoAlt || 'Navigation bar logo'} />
              : <ArcLogo />}
          </a>
        </div>

        <div className="nav-right">
          {signInButton}
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
    signInOrder: PropTypes.number,
    navColor: PropTypes.oneOf(['dark', 'light']).tag({
      defaultValue: 'dark',
      label: 'Color',
      labels: {
        dark: 'Dark',
        light: 'Light',
      },
    }),
  }),
};

Nav.label = 'Header Nav Chain – Arc Block';

export default Nav;
