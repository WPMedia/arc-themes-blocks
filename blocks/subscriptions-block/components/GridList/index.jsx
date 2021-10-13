import React from 'react';
import PropTypes from '@arc-fusion/prop-types';

import './styles.scss';

const GridList = ({ children }) => {
  const additionalClass = children.length > 3 ? `xpmedia-subscription-grid-list--${children.length}` : '';
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
