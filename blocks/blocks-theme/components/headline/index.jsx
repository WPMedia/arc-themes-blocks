import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Headline = (props) => {
  const {
    text,
    className = '',
  } = props;

  const classNames = ['xpmedia-headline', ...className].join(' ');

  return <h2 className={classNames}>{text}</h2>;
};

Headline.propTypes = {
  text: PropTypes.string,
};

export default Headline;
