import React, { Children } from 'react';
import PropTypes from '@arc-fusion/prop-types';

import './styles.scss';

const GridList = ({ children }) => {
  const childCount = Children.toArray(children).length;
  const additionalClass = childCount ? `xpmedia-subscription-grid-list--${childCount}` : '';

  if (!children) {
    return null;
  }

  return (
    <div className={`xpmedia-subscription-grid-list ${additionalClass}`}>
      {children}
    </div>
  );
};

GridList.propTypes = {
  children: PropTypes.any,
};

export default GridList;
