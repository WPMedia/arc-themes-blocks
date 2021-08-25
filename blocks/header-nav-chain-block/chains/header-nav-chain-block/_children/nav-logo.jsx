import React, { useEffect, useState } from 'react';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import { useDebouncedCallback } from 'use-debounce';

const NavLogo = ({ alignment }) => {
  const { arcSite, deployment, contextPath } = useFusionContext();
  const {
    primaryLogo, primaryLogoAlt,
    breakpoints = { small: 0, medium: 768, large: 992 },
  } = getProperties(arcSite);
  const [isLogoVisible, setLogoVisibility] = useState(false);

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
    <div className={`nav-logo nav-logo-${alignment} ${isLogoVisible ? 'nav-logo-show' : 'nav-logo-hidden'} ${isLogoSVG ? 'svg-logo' : ''}`}>
      <a href="/" title={primaryLogoAlt}>
        {!!primaryLogoPath && (
          <img
            src={primaryLogoPath}
            alt={primaryLogoAlt || ''}
          />
        )}
      </a>
    </div>
  );
};

export default NavLogo;
