import React, { useCallback } from 'react';

const usePromoElementLink = (customFields) => useCallback((element, props) => (
  <a
    href={customFields.linkURL || '#'}
    className={(props && props.className) || ''}
    title={customFields.headline}
    target={customFields.newTab ? '_blank' : '_self'}
    rel={customFields.newTab ? 'noreferrer noopener' : ''}
    onClick={!customFields.linkURL ? (evt) => {
      evt.preventDefault();
    } : undefined}
  >
    {element}
  </a>
), [customFields.linkURL, customFields.headline, customFields.newTab]);

export default usePromoElementLink;
