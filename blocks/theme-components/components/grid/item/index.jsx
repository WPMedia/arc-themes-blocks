import React from 'react';
import PropTypes from 'prop-types';

const GridItem = ({ children, columns }) => (
  <div
    className="l-grid-item"
    style={{ gridColumnStart: columns }}
  >
    {children}
  </div>
);

GridItem.defaultProps = {
};

GridItem.propTypes = {
  children: PropTypes.any.isRequired,
  columns: PropTypes.string,
};

export default GridItem;
