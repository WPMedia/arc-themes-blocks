import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getThemeStyle from 'fusion:themes';
import getTranslatedPhrases from 'fusion:intl';
import FocusTrap from 'focus-trap-react';
import {
  generateNavComponentPropTypes,
} from './nav-helper';
import SectionNav from './_children/section-nav';
import NavLogo from './_children/nav-logo';
import HorizontalLinksBar from './_children/horizontal-links/default';
import NavSection from './_children/nav-section';
import MenuWidgets from './_children/menu-widgets';
// shares styles with header nav block
// can modify styles in shared styles block
import '@wpmedia/shared-styles/scss/_header-nav.scss';

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
  position: sticky;
  top: 0;
  margin-bottom: 0;
  z-index: 1;

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
  }

  .nav-logo {
    img {
      height: auto;
      width: auto;
      transition: 0.5s;

      @media screen and (max-width: ${(props) => props.breakpoint}px) {
        max-height: 40px;
      }
      @media screen and (min-width: ${(props) => props.breakpoint}px) {
        max-height: ${(props) => (props.scrolled ? (standardNavHeight - 16) : (props.navHeight - 16))}px;
      }
    }
  }
`;

const StyledSectionDrawer = styled.div`
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
    breakpoints = { small: 0, medium: 768, large: 992 },
    navBarBackground,
    locale = 'en',
  } = getProperties(arcSite);

  const phrases = getTranslatedPhrases(locale);

  const {
    'primary-color': primaryColor = '#000',
  } = getThemeStyle(arcSite);

  let backgroundColor = '#000';

  if (navBarBackground === 'primary-color') {
    backgroundColor = primaryColor;
  } else if (navColor === 'light') {
    backgroundColor = '#fff';
  }

  const {
    children = [],
    customFields,
  } = props;
  const {
    hierarchy,
    signInOrder,
    logoAlignment = 'center',
    horizontalLinksHierarchy,
    desktopNavivationStartHeight,
    shrinkDesktopNavivationHeight,
    showHorizontalSeperatorDots,
    ariaLabel,
    ariaLabelLink,
  } = customFields;

  const displayLinks = horizontalLinksHierarchy && logoAlignment === 'left';

  const navHeight = desktopNavivationStartHeight || 56;

  const showDotSeparators = showHorizontalSeperatorDots ?? true;

  const mainContent = useContent({
    source: 'site-service-hierarchy',
    query: {
      hierarchy,
      feature: 'header-nav-chain',
    },
    filter: `{
      children {
        _id
        node_type
        display_name
        name
        url
        children {
          _id
          node_type
          display_name
          name
          url
        }
      }
    }`,
  });

  const sections = (mainContent && mainContent.children) ? mainContent.children : [];

  const [isSectionDrawerOpen, setSectionDrawerOpen] = useState(false);
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

  const menuButtonClickAction = () => {
    setSectionDrawerOpen(!isSectionDrawerOpen);
    document.body.classList.toggle('nav-open');
  };

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
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    if (!shrinkDesktopNavivationHeight || vw < breakpoints.medium) {
      return undefined;
    }
    const handleScroll = () => {
      const pageOffset = window.pageYOffset;
      if (pageOffset > shrinkDesktopNavivationHeight) {
        setScrolled(true);
      } else if (pageOffset < (shrinkDesktopNavivationHeight - desktopNavivationStartHeight)) {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [shrinkDesktopNavivationHeight, desktopNavivationStartHeight, breakpoints]);

  // 56 pixels nav height on scroll
  const scrollAdjustedNavHeight = (scrolled) ? 56 : navHeight;

  return (
    <StyledNav
      id="main-nav"
      className={`${navColor === 'light' ? 'light' : 'dark'}`}
      navBarBackground={backgroundColor}
      navHeight={navHeight}
      scrolled={scrolled}
      breakpoint={breakpoints.medium}
      aria-label={ariaLabel || phrases.t('header-nav-chain-block.sections-element-aria-label')}
    >
      <div className={`news-theme-navigation-container news-theme-navigation-bar logo-${logoAlignment} ${displayLinks ? 'horizontal-links' : ''}`}>
        <NavSection
          customFields={customFields}
          menuButtonClickAction={menuButtonClickAction}
          side="left"
          signInOrder={signInOrder}
        >
          {children}
        </NavSection>
        <NavLogo alignment={logoAlignment} />
        {displayLinks && (
        <HorizontalLinksBar
          hierarchy={horizontalLinksHierarchy}
          navBarColor={navColor}
          showHorizontalSeperatorDots={showDotSeparators}
          ariaLabel={ariaLabelLink}
        />
        )}
        <NavSection
          customFields={customFields}
          menuButtonClickAction={menuButtonClickAction}
          side="right"
          signInOrder={signInOrder}
        >
          {children}
        </NavSection>
      </div>

      <StyledSectionDrawer
        id="nav-sections"
        className={`nav-sections ${isSectionDrawerOpen ? 'open' : 'closed'}`}
        navHeight={navHeight}
        scrolled={scrolled}
        breakpoint={breakpoints.medium}
        onClick={closeDrawer}
      >
        <FocusTrap
          active={isSectionDrawerOpen}
          focusTrapOptions={{
            allowOutsideClick: true,
            returnFocusOnDeactivate: true,
            onDeactivate: () => {
              // Focus the next focusable element in the navbar
              // Workaround for issue where 'nav-sections-btn' wont programatically focus
              const focusElement = document.querySelector(`
                  #main-nav a:not(.nav-sections-btn),
                  #main-nav button:not(.nav-sections-btn)
                `);
                // istanbul ignore next
              if (focusElement) {
                focusElement.focus();
                focusElement.blur();
              }
            },
          }}
        >
          <div className="inner-drawer-nav" style={{ zIndex: 10 }}>
            <SectionNav
              sections={sections}
              isHidden={!isSectionDrawerOpen}
              navHeight={scrollAdjustedNavHeight}
            >
              <MenuWidgets
                customFields={customFields}
                menuButtonClickAction={menuButtonClickAction}
              >
                {children}
              </MenuWidgets>
            </SectionNav>
          </div>
        </FocusTrap>
      </StyledSectionDrawer>

      {(horizontalLinksHierarchy && logoAlignment !== 'left' && isAdmin) && (
      <StyledWarning>
        In order to render horizontal links, the logo must be aligned to the left.
      </StyledWarning>
      )}
    </StyledNav>
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
      description: 'Select the height of the navigation bar (in px) when the user first opens a page on desktop. Must be between 56 and 200.',
      group: 'Logo',
      max: 200,
      min: 56,
      defaultValue: 56,
    }),
    shrinkDesktopNavivationHeight: PropTypes.number.tag({
      label: 'Shrink navigation bar after scrolling',
      description: 'How far should the user scroll (in px) until the navigation height shrinks back to standard size (56px) on desktop? Must be greater than the value configured for "Starting desktop navigation bar height".',
      group: 'Logo',
      min: 56,
    }),
    showHorizontalSeperatorDots: PropTypes.bool.tag({
      label: 'Display dots between horizontal links',
      group: 'Display',
      defaultValue: true,
    }),
    ariaLabel: PropTypes.string.tag({
      label: 'Aria-label',
      defaultValue: 'Sections Menu',
      description: 'The label is provided to assistive technologies to provide it with a unique name for the header nav landmark - defaults to "Sections Menu" if left blank',
    }),
    ariaLabelLink: PropTypes.string.tag({
      label: 'Links Bar - Aria-label',
      defaultValue: 'Top Links',
      description: 'The label is provided to assistive technologies to provide it with a unique name for the header links nav landmark - defaults to "Top Links" if left blank',
    }),
    ...generateNavComponentPropTypes(),
  }),
};

Nav.label = 'Navigation - Arc Chain';

Nav.icon = 'arc-navigation';

export default Nav;
