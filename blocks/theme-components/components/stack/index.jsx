import React from 'react';
import PropTypes from 'prop-types';

const Stack = ({
  children, className, direction, alignment, gap,
}) => (
  <div
    className={`l-stack ${className}`}
    direction={direction}
    alignment={alignment}
    style={{ '--c-stack-gap': gap }}
  >
    {children}
  </div>
);

Stack.defaultProps = {
  direction: 'vertical',
  alignment: 'start',
  className: '',
};

Stack.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  alignment: PropTypes.oneOf(['start', 'center', 'end']),
  gap: PropTypes.string,
};

export default Stack;
