import React from 'react';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';

const NavLogo = ({ alignment, isVisible }) => {
  const { arcSite, deployment, contextPath } = useFusionContext();
  const { primaryLogo, primaryLogoAlt } = getProperties(arcSite);
  // Check if URL is absolute/base64
  const primaryLogoPath = primaryLogo && (
    primaryLogo.indexOf('http') === 0
    || primaryLogo.indexOf('base64') === 0
      ? primaryLogo : deployment(`${contextPath}/${primaryLogo}`)
  );
  const isLogoSVG = (
    !!primaryLogoPath
    && String(primaryLogoPath).endsWith('.svg')
  );
  return (
    <div className={`nav-logo nav-logo-${alignment} ${isVisible ? 'nav-logo-show' : 'nav-logo-hidden'} ${isLogoSVG ? 'svg-logo' : ''}`}>
      <a href="/" title={primaryLogoAlt}>
        {!!primaryLogoPath && (
          <img
            src={primaryLogoPath}
            alt={primaryLogoAlt || 'Navigation bar logo'}
          />
        )}
      </a>
    </div>
  );
};

export default NavLogo;
