import React from 'react';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import { HamburgerMenuIcon } from '@wpmedia/engine-theme-sdk';
import { PrimaryFont } from '@wpmedia/shared-styles';
import SearchBox from './search-box';
import QuerylySearch from './queryly-search';
import { WIDGET_CONFIG, PLACEMENT_AREAS } from '../nav-helper';

const NavWidget = ({
  type,
  position = 0,
  children = [],
  placement = PLACEMENT_AREAS.NAV_BAR,
  customSearchAction,
  menuButtonClickAction,
}) => {
  const { arcSite } = useFusionContext();
  const { navColor, locale } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);
  if (!type || type === 'none') return null;

  const predefinedWidget = (
    (type === 'search' && (
      <SearchBox
        iconSize={WIDGET_CONFIG[placement]?.iconSize}
        navBarColor={navColor}
        placeholderText={phrases.t('header-nav-chain-block.search-text')}
        customSearchAction={customSearchAction}
        alwaysOpen={WIDGET_CONFIG[placement]?.expandSearch}
      />
    )) || (type === 'queryly' && (
      <QuerylySearch
        theme={
        placement === PLACEMENT_AREAS.SECTION_MENU
          ? 'dark' : navColor
        }
        label={phrases.t('header-nav-chain-block.search-text')}
      />
    )) || (type === 'menu' && (
      <button
        type="button"
        onClick={menuButtonClickAction}
        aria-label={phrases.t('header-nav-chain-block.sections-button')}
        className={`nav-btn nav-sections-btn border transparent ${navColor === 'light' ? 'nav-btn-light' : 'nav-btn-dark'}`}
      >
        <PrimaryFont as="span">{phrases.t('header-nav-chain-block.sections-button')}</PrimaryFont>
        <HamburgerMenuIcon
          fill={null}
          height={WIDGET_CONFIG[placement]?.iconSize}
          width={WIDGET_CONFIG[placement]?.iconSize}
        />
      </button>
    ))
  );

  return predefinedWidget || (
    children
    && children.length > 0
    && position
    && position > 0
    && Number.isInteger(position)
    && position <= children.length
      ? children[position - 1] : null
  );
};

export default NavWidget;
