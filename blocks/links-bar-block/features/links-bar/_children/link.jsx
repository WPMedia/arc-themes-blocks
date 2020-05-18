import React from 'react';
import PropTypes from 'prop-types';

function fixTrailingSlash(item) {
  let fixedItem = item;
  if (fixedItem[fixedItem.length - 1] !== '/') {
    fixedItem += '/';
  }
  return fixedItem;
}

const Link = ({ href, name }) => {
  const externalUrl = /(http(s?)):\/\//i.test(href);
  return (
    externalUrl ? (
      <a href={fixTrailingSlash(href)} target="_blank" rel="noopener noreferrer">
        {name}
        <span className="sr-only">(Opens in new window)</span>
      </a>
    ) : <a href={fixTrailingSlash(href)}>{name}</a>
  );
};

Link.propTypes = {
  href: PropTypes.string,
  name: PropTypes.string,
};

export default Link;
