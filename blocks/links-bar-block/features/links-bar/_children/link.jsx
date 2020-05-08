import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ href, name }) => {
  const externalUrl = /(http(s?)):\/\//i.test(href);
  return (
    externalUrl ? (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {name}
        <span className="sr-only">(Opens in new window)</span>
      </a>
    ) : <a href={href}>{name}</a>
  );
};

Link.propTypes = {
  href: PropTypes.string,
  name: PropTypes.string,
};

export default Link;
