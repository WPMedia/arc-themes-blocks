import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getThemeStyle from 'fusion:themes';
import getTranslatedPhrases from 'fusion:intl';
import { useDebouncedCallback } from 'use-debounce';
import {
  NAV_BREAKPOINTS,
  NAV_SLOT_COUNTS,
  getNavComponentPropTypeKey,
  getNavComponentIndexPropTypeKey,
  generateNavComponentPropTypes,
  getNavComponentDefaultSelection,
} from './nav-helper';
import SectionNav from './_children/section-nav';
import SearchBox from './_children/search-box';
import NavLogo from './_children/nav-logo';
import NavWidget from './_children/nav-widget';
// shares styles with header nav block
// can modify styles in shared styles block
import '@wpmedia/shared-styles/scss/_header-nav.scss';
import HorizontalLinksBar from './_children/horizontal-links/default';

/* Global Constants */
// Since these values are used to coordinate multiple components, I thought I'd make them variables
// so we could just change the vars instead of multiple CSS values
const standardNavHeight = 56;
const navZIdx = 9;
const sectionZIdx = navZIdx - 1;

/* Styled Components */
const StyledNav = styled.nav`
  align-items: center;
  width: 100%;
  position: fixed;
  top: 0px;

  .news-theme-navigation-bar {
    @media screen and (max-width: ${(props) => props.breakpoint}px) {
      height: ${standardNavHeight}px;
    }
    @media screen and (min-width: ${(props) => props.breakpoint}px) {
      height: ${(props) => (props.scrolled ? standardNavHeight : props.navHeight)}px;
    }
    background-color: ${(props) => props.navBarBackground};
    transition: 0.5s;
    z-index: ${navZIdx};

    &.nav-logo, & > .nav-logo {
      img {
        height: auto;
        max-width: 240px;
        width: auto;
        transition: 0.5s;
        @media screen and (max-width: ${(props) => props.breakpoint}px) {
          max-height: 40px;
          min-width: 40px;
        }
        @media screen and (min-width: ${(props) => props.breakpoint}px) {
          max-height: ${(props) => (props.scrolled ? (standardNavHeight - 16) : (props.navHeight - 16))}px;
          min-width: ${(props) => (props.scrolled ? (standardNavHeight - 16) : (props.navHeight - 16))}px;
        }
      }
    }
  }

  * {
    font-family: ${(props) => props.font};
  }

  & + * {
    
    @media screen and (max-width: ${(props) => props.breakpoint}px) {
      margin-top: ${standardNavHeight}px;
    }
    @media screen and (min-width: ${(props) => props.breakpoint}px) {
      margin-top: ${(props) => (props.scrolled ? standardNavHeight : props.navHeight)}px;
    }
  }

`;

const StyledSectionDrawer = styled.div`
  font-family: ${(props) => props.font};
  z-index: ${sectionZIdx};

  @media screen and (max-width: ${(props) => props.breakpoint}px) {
    margin-top: ${standardNavHeight}px;
  }
  @media screen and (min-width: ${(props) => props.breakpoint}px) {
    margin-top: ${(props) => (props.scrolled ? standardNavHeight : props.navHeight)}px;
  }
`;

const StyledWarning = styled.div`
  background-color: #c30;
  color: #fff;
  display: flex;
  align-self: flex-start;
  padding: 6px;
`;

/* Main Component */
const Nav = (props) => {
  const {
    arcSite, isAdmin,
  } = useFusionContext();

  const {
    navColor,
    locale = 'en',
    breakpoints = { small: 0, medium: 768, large: 992 },
    navBarBackground,
  } = getProperties(arcSite);

  const {
    'primary-color': primaryColor = '#000',
    'primary-font-family': primaryFont,
  } = getThemeStyle(arcSite);

  let backgroundColor = '#000';

  if (navBarBackground === 'primary-color') {
    backgroundColor = primaryColor;
  } else if (navColor === 'light') {
    backgroundColor = '#fff';
  }

  const phrases = getTranslatedPhrases(locale);

  const {
    children = [],
    customFields = {},
  } = props;
  const {
    hierarchy,
    signInOrder,
    logoAlignment = 'center',
    horizontalLinksHierarchy,
    desktopNavivationStartHeight,
    shrinkDesktopNavivationHeight,

  } = customFields;

  const displayLinks = horizontalLinksHierarchy && logoAlignment === 'left';

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
  const [scrolled, setScrolled] = useState(false);

  const closeNavigation = () => {
    setSectionDrawerOpen(false);
    document.body.classList.remove('nav-open');
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

  // istanbul ignore next
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

  // istanbul ignore next
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.keyCode === 27) {
        closeNavigation();
      }
    };

    window.addEventListener('keydown', handleEscKey, true);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, []);

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
    // istanbul ignore next
    return undefined;
  }, [onScrollDebounced, breakpoints]);

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
  }, [breakpoints]);

  useEffect(() => {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    if (!shrinkDesktopNavivationHeight || vw < breakpoints.medium) {
      return undefined;
    }
    const handleScroll = () => {
      if (window.pageYOffset > shrinkDesktopNavivationHeight) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [shrinkDesktopNavivationHeight, breakpoints]);

  const NavSection = ({ side }) => {
    const renderWidgets = (bpoint) => {
      let widgetList = [];
      let userHasConfigured = false;
      // eslint-disable-next-line no-plusplus
      for (let i = 1; i <= NAV_SLOT_COUNTS[bpoint]; i++) {
        const cFieldKey = getNavComponentPropTypeKey(side, bpoint, i);
        const cFieldIndexKey = getNavComponentIndexPropTypeKey(side, bpoint, i);
        const navWidgetType = customFields[cFieldKey] || 'none';
        if (!!navWidgetType && navWidgetType !== 'none') {
          widgetList.push(
            <NavWidget
              {...props}
              key={`${side}_${bpoint}_${i}`}
              type={navWidgetType}
              position={customFields[cFieldIndexKey]}
              menuButtonClickAction={hamburgerClick}
            />,
          );
        }
        if (
          !userHasConfigured
          && navWidgetType !== getNavComponentDefaultSelection(cFieldKey)
        ) userHasConfigured = true;
      }
      // Support for deprecated 'signInOrder' custom field
      if (
        !userHasConfigured
        && signInOrder
        && Number.isInteger(signInOrder)
        && side === 'right'
        && children[signInOrder - 1]
      ) {
        widgetList = [children[signInOrder - 1]];
      }
      return widgetList;
    };
    return (
      !side ? null : (
        <div key={side} className={`nav-${side}`}>
          { NAV_BREAKPOINTS.map((breakpoint) => (
            <div key={breakpoint} className={`nav-components--${breakpoint}`}>
              { renderWidgets(breakpoint) }
            </div>
          ))}
        </div>
      )
    );
  };

  return (
    <>
      <StyledNav
        id="main-nav"
        className={`${navColor === 'light' ? 'light' : 'dark'}`}
        font={primaryFont}
        navBarBackground={backgroundColor}
        navHeight={desktopNavivationStartHeight}
        scrolled={scrolled}
        breakpoint={breakpoints.medium}
      >
        <div className={`news-theme-navigation-container news-theme-navigation-bar logo-${logoAlignment} ${displayLinks ? 'horizontal-links' : ''}`}>
          <NavSection side="left" />
          <NavLogo isVisible={isLogoVisible} alignment={logoAlignment} />
          {displayLinks && (
            <HorizontalLinksBar hierarchy={horizontalLinksHierarchy} navBarColor={navColor} />
          )}
          <NavSection side="right" />
        </div>

        <StyledSectionDrawer
          id="nav-sections"
          className={`nav-sections ${isSectionDrawerOpen ? 'open' : 'closed'}`}
          onClick={closeDrawer}
          font={primaryFont}
          navHeight={desktopNavivationStartHeight}
          scrolled={scrolled}
          breakpoint={breakpoints.medium}
        >
          <div className="inner-drawer-nav" style={{ zIndex: 10 }}>
            <SectionNav sections={sections}>
              <SearchBox iconSize={21} alwaysOpen placeholderText={phrases.t('header-nav-chain-block.search-text')} />
            </SectionNav>
          </div>
        </StyledSectionDrawer>

      </StyledNav>
      {(!displayLinks && isAdmin) && (
        <StyledWarning>
          In order to render horizontal links, the logo must be aligned to the left.
        </StyledWarning>
      )}
    </>
  );
};

/** Nav PropTypes */

Nav.propTypes = {
  customFields: PropTypes.shape({
    hierarchy: PropTypes.string.tag({
      label: 'Sections Menu hierarchy',
      defaultValue: '',
      group: 'Configure content',
    }),
    signInOrder: PropTypes.number.tag({
      hidden: true,
    }),
    logoAlignment: PropTypes.oneOf([
      'center', 'left',
    ]).tag({
      label: 'Logo alignment',
      group: 'Logo',
      defaultValue: 'center',
    }),
    horizontalLinksHierarchy: PropTypes.string.tag({
      label: 'Horizontal Links hierarchy',
      group: 'Configure content',
    }),
    desktopNavivationStartHeight: PropTypes.number.tag({
      label: 'Starting desktop navigation bar height',
      group: 'Logo',
      max: 200,
      min: 56,
      defaultValue: 56,
    }),
    shrinkDesktopNavivationHeight: PropTypes.number.tag({
      label: 'Shrink navigation bar after scrolling ',
      group: 'Logo',
      min: 56,
    }),
    ...generateNavComponentPropTypes(),
  }),
};

Nav.label = 'Navigation - Arc Chain';

export default Nav;
