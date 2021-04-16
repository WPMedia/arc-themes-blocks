import React from 'react';
import { formatURL } from '@wpmedia/engine-theme-sdk';

const Link = ({
  href, name, child, isHidden = false,
}) => {
  const externalUrl = /(http(s?)):\/\//i.test(href);
  const linkAttributes = isHidden ? { tabIndex: -1 } : {};
  return (
    externalUrl ? (
      <a href={formatURL(href)} target="_blank" rel="noopener noreferrer" {...linkAttributes}>
        {name}
        <span className="sr-only">(Opens in new window)</span>
        {child}
      </a>
    ) : (
      <a href={formatURL(href)} {...linkAttributes}>
        {name}
        {child}
      </a>
    )
  );
};

export default Link;
