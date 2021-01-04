import React from 'react';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from '@wpmedia/intl-block';
import HamburgerMenuIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/HamburgerMenuIcon';
import SearchBox from './search-box';

const ICON_SIZE = 16;

const NavWidget = ({
  type,
  position = 0,
  children = [],
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
        iconSize={ICON_SIZE}
        navBarColor={navColor}
        placeholderText={phrases.t('header-nav-chain-block.search-text')}
        customSearchAction={customSearchAction}
      />
    )) || (type === 'menu' && (
      <button
        type="button"
        onClick={menuButtonClickAction}
        className={`nav-btn nav-sections-btn border transparent ${navColor === 'light' ? 'nav-btn-light' : 'nav-btn-dark'}`}
      >
        <span>{phrases.t('header-nav-chain-block.sections-button')}</span>
        <HamburgerMenuIcon fill={null} height={ICON_SIZE} width={ICON_SIZE} />
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
