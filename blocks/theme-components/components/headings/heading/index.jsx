import React from 'react';
import PropTypes from 'prop-types';

import LevelContext from '../context';

const Heading = (props) => (
  <LevelContext.Consumer>
    {(level) => {
      const HeadingTag = `h${Math.min(level, 6)}`;
      return <HeadingTag {...props} className={`c-heading ${props.className}`} />;
    }}
  </LevelContext.Consumer>
);

Heading.defaultProps = {
  className: '',
};

Heading.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default Heading;
