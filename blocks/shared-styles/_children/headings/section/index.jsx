import React from 'react';

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
export default HeadingSection;
