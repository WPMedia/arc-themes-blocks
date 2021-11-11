import React from 'react';
import PropTypes from 'prop-types';

import LevelContext from '../context';

const HeadingSection = (props) => (
  <LevelContext.Consumer>
    {(level) => (
      <LevelContext.Provider value={level + 1}>
        {props.children}
      </LevelContext.Provider>
    )}
  </LevelContext.Consumer>
);

HeadingSection.propTypes = {
  children: PropTypes.any,
};

export default HeadingSection;
