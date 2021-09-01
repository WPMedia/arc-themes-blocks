import React from 'react';
import PropTypes from 'prop-types';
import { formatURL } from '@wpmedia/engine-theme-sdk';

import './styles.css';

const Overline = (props) => {
  const {
    text,
    url,
    className = '',
  } = props;

  const classNames = ['xpmedia-overline', ...className].join(' ');

  if (url) {
    return <a href={formatURL(url)} className={classNames}>{text}</a>;
  }

  return <span className={classNames}>{text}</span>;
};

Overline.propTypes = {
  text: PropTypes.string,
  url: PropTypes.string,
};

export default Overline;
