import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { formatURL } from '@wpmedia/engine-theme-sdk';

import './styles.css';

const StyledOverline = styled.span`
  --xpmedia-component-overline-text-color: var(--xpmedia-primary-color);
  --xpmedia-component-overline-font-size: var(--xpmedia-global-font-size-100, 1rem);
  --xpmedia-component-overline-font-weight: var(--xpmedia-global-font-weight-black);
  --xpmedia-component-overline-line-height: var(--xpmedia-global-font-line-height-medium);
  --xpmedia-component-overline-text-decoration: var(--xpmedia-global-text-decoration-none);
`;

const Overline = (props) => {
  const {
    text,
    url,
    className = '',
  } = props;

  const classNames = ['xpmedia-overline', ...className].join(' ');

  if (url) {
    return <StyledOverline as="a" href={formatURL(url)} className={classNames}>{text}</StyledOverline>;
  }

  return <StyledOverline className={classNames}>{text}</StyledOverline>;
};

Overline.propTypes = {
  text: PropTypes.string,
  url: PropTypes.string,
};

export default Overline;
