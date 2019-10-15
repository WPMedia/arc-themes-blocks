import React from 'react';
import getThemeStyle from 'fusion:themes';

import navHamburger from './images/hamburger.svg';
import navSearch from './images/search.svg';
import placeholderLogo from './images/arc-placeholder-logo.svg';

import './navigation.scss';

export default ({ arcSite }) => (
  <nav className="news-theme-navigation">
    <button className="nav-search" type="button"><img src={navSearch} alt="Navigation bar search" /></button>
    <button className="nav-sections" type="button">
      <span>Sections</span>
      <img src={navHamburger} alt="Navigation bar sections" />
    </button>
    <img src={getThemeStyle(arcSite).primaryLogo || placeholderLogo} alt={getThemeStyle(arcSite).primaryLogoAlt || 'Navigation bar logo'} />
  </nav>
);
