import React from 'react';
import PropTypes from 'prop-types';

const OverlineComponent = ({ text }) => (
  <div className="c-overline">{text}</div>
);

OverlineComponent.propTypes = {
  text: PropTypes.any.isRequired,
};

export default OverlineComponent;
