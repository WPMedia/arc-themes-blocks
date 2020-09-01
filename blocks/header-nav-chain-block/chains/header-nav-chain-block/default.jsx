import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getThemeStyle from 'fusion:themes';
import getTranslatedPhrases from 'fusion:intl';
import HamburgerMenuIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/HamburgerMenuIcon';
import { useDebouncedCallback } from 'use-debounce';
import SectionNav from './_children/section-nav';
import SearchBox from './_children/search-box';
// shares styles with header nav block
// can modify styles in shared styles block
import '@wpmedia/shared-styles/scss/_header-nav.scss';

/* Global Constants */
// Since these values are used to coordinate multiple components, I thought I'd make them variables
// so we could just change the vars instead of multiple CSS values
const iconSize = 16;
const navHeight = '56px';
const navZIdx = 9;
const sectionZIdx = navZIdx - 1;

/* Styled Components */
const StyledNav = styled.nav`
  align-items: center;
  position: relative;

  .news-theme-navigation-bar {
    background-color: ${(props) => (props.navBarColor === 'light' ? '#fff' : '#000')};
    height: ${navHeight};
    z-index: ${navZIdx};
  }

  * {
    font-family: ${(props) => props.font};
  }
`;

const StyledSectionDrawer = styled.div`
  font-family: ${(props) => props.font};
  margin-top: ${navHeight};
  z-index: ${sectionZIdx};
`;

/* Main Component */
const Nav = (props) => {
  const { arcSite, deployment, contextPath } = useFusionContext();
  const {
    primaryLogo, primaryLogoAlt, navColor, locale = 'en',
    breakpoints = { small: 0, medium: 768, large: 992 },
  } = getProperties(arcSite);
  let primaryLogoPath;

  const {
    'primary-font-family': primaryFont,
  } = getThemeStyle(arcSite);

  const phrases = getTranslatedPhrases(locale);

  const {
    children = [],
    customFields: { hierarchy, signInOrder } = {},
    customSearchAction = null,
  } = props;

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
  const [isLogoVisible, setLogoVisibility] = useState(false);

  const closeNavigation = () => {
    setSectionDrawerOpen(false);
    document.body.classList.remove('nav-open');
  };

  const handleEscKey = (event) => {
    if (event.keyCode === 27) {
      closeNavigation();
    }
  };

  const closeDrawer = (event) => {
    const ele = event.target;
    if (ele.closest('.inner-drawer-nav')) {
      return;
    }
    closeNavigation();
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
  }, []);

  // Check if URL is absolute/base64
  if (primaryLogo && (primaryLogo.indexOf('http') === 0 || primaryLogo.indexOf('base64') === 0)) {
    primaryLogoPath = primaryLogo;
  } else {
    primaryLogoPath = deployment(`${contextPath}/${primaryLogo}`);
  }

  const onScrollEvent = (evt) => {
    if (!evt) {
      return;
    }

    const scrollTop = evt.target?.documentElement?.scrollTop;
    if (typeof scrollTop === 'undefined') {
      return;
    }

    if (scrollTop > 150) {
      setLogoVisibility(true);
    }
    if (scrollTop < 30) {
      setLogoVisibility(false);
    }
  };

  const [onScrollDebounced] = useDebouncedCallback(onScrollEvent, 100);

  useEffect(() => {
    const mastHead = document.querySelector('.masthead-block-container .masthead-block-logo');
    if (!mastHead) {
      return undefined;
    }
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    // on small viewports we do not need this
    if (vw >= breakpoints.medium) {
      window.addEventListener('scroll', onScrollDebounced);
      return () => {
        window.removeEventListener('scroll', onScrollDebounced);
      };
    }
    return undefined;
  }, []);

  useEffect(() => {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    if (vw < breakpoints.medium) {
      setLogoVisibility(true);
      return undefined;
    }

    const timerID = setTimeout(() => {
      const mastHead = document.querySelector('.masthead-block-container .masthead-block-logo');
      if (!mastHead) {
        setLogoVisibility(true);
      }
    }, 1000);

    return () => {
      clearTimeout(timerID);
    };
  }, []);

  return (
    <>
      <StyledNav id="main-nav" className={`${navColor === 'light' ? 'light' : 'dark'}`} font={primaryFont} navBarColor={navColor}>
        <div className="news-theme-navigation-container news-theme-navigation-bar">
          <div className="nav-left">
            <SearchBox iconSize={20} navBarColor={navColor} placeholderText={phrases.t('header-nav-block.search-text')} customSearchAction={customSearchAction} />
            <button onClick={hamburgerClick} className={`nav-btn nav-sections-btn border transparent ${navColor === 'light' ? 'nav-btn-light' : 'nav-btn-dark'}`} type="button">
              <span>{phrases.t('header-nav-block.sections-button')}</span>
              <HamburgerMenuIcon fill={null} height={iconSize} width={iconSize} />
            </button>
          </div>

          <div className={`nav-logo ${isLogoVisible ? 'nav-logo-show' : 'nav-logo-hidden'}`}>
            <a href="/" title={primaryLogoAlt}>
              {!!primaryLogo && <img src={primaryLogoPath} alt={primaryLogoAlt || 'Navigation bar logo'} />}
            </a>
          </div>

          <div className="nav-right">
            {signInButton}
          </div>
        </div>

        <StyledSectionDrawer id="nav-sections" className={`nav-sections ${isSectionDrawerOpen ? 'open' : 'closed'}`} onClick={closeDrawer} font={primaryFont}>
          <div className="inner-drawer-nav" style={{ zIndex: 10 }}>
            <SectionNav sections={sections}>
              <SearchBox iconSize={21} alwaysOpen placeholderText={phrases.t('header-nav-block.search-text')} />
            </SectionNav>
          </div>
        </StyledSectionDrawer>

      </StyledNav>
    </>
  );
};

Nav.propTypes = {
  customFields: PropTypes.shape({
    hierarchy: PropTypes.string,
    signInOrder: PropTypes.number,
  }),
};

Nav.label = 'Header Nav Chain – Arc Block';

export default Nav;
