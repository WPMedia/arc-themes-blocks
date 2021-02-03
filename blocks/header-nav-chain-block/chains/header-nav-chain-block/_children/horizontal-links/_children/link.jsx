import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function getLocation(uri) {
  let url;
  if (typeof window === 'undefined') {
    url = new URL(uri, 'http://example.com');
  } else {
    url = document.createElement('a');
    // IE doesn't populate all link properties when setting .href with a relative URL,
    // however .href will return an absolute URL which then can be used on itself
    // to populate these additional fields.
    url.href = uri;
    if (url.host === '') {
      url.href = `${url.href}`;
    }
  }
  return url;
}

function fixTrailingSlash(item) {
  const url = getLocation(item);

  if (url.hash || url.search || url.pathname.match(/\./)) {
    return item;
  }

  if (item && (item[item.length - 1] !== '/')) {
    return `${item}/`;
  }
  return item;
}

/* Styled Components */
const StyledLink = styled.a`
    color: ${(props) => (props.navBarColor === 'light' ? '#000' : '#fff')};
    font-family: ${(props) => props.font};
`;

const Link = ({
  href, name, navBarColor,
}) => {
  const externalUrl = /(http(s?)):\/\//i.test(href);

  return (
    externalUrl ? (
      <StyledLink
        href={fixTrailingSlash(href)}
        target="_blank"
        rel="noopener noreferrer"
        navBarColor={navBarColor}
      >
        {`${name}`}
        <span className="sr-only">(Opens in new window)</span>
      </StyledLink>
    ) : (
      <StyledLink href={fixTrailingSlash(href)} navBarColor={navBarColor}>
        {`${name}`}
      </StyledLink>
    )
  );
};

Link.propTypes = {
  href: PropTypes.string,
  name: PropTypes.string,
  navBarColor: PropTypes.string,
};

export default Link;
