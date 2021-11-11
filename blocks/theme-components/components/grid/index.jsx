import React from 'react';
import PropTypes from 'prop-types';

const Grid = ({ children, className, gap }) => (
  <div
    className={`l-grid ${className}`}
    style={{ '--c-grid-gap': gap }}
  >
    {children}
  </div>
);

Grid.defaultProps = {
  className: '',
};

Grid.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  gap: PropTypes.string,
};

export default Grid;
