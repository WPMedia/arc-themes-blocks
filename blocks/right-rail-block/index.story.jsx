/* eslint-disable react/no-children-prop */
import React from 'react';
import RightRailBlock from './layouts/right-rail/default';

export default {
  title: 'Layouts/Right Rail',
  parameters: {
    // Set the viewports in Chromatic at a component level.
    chromatic: { viewports: [320, 960, 1200, 1600] },
  },
};

const layoutItemStyles = {
  navigation: {
    backgroundColor: 'rgb(236 155 223)',
    height: '100px',
  },
  footer: {
    height: '100px',
  },
  main: {
    height: '800px',
  },
  rightRail: {
    height: '600px',
  },
  default: {
    width: '100%',
    backgroundColor: 'rgb(230 230 230)',
    textAlign: 'center',
  },
};
const getStyles = (name) => {
  const defaults = layoutItemStyles.default;

  return { ...defaults, ...layoutItemStyles[name] } || defaults;
};

const layoutItem = (name) => <div style={getStyles(name)}>{name}</div>;

const layoutAreas = ['navigation', 'fullWidth1', 'main', 'rightRail', 'fullWidth2', 'footer'];

export const basic = () => (
  <div id="fusion-app" className="layout-section">
    <RightRailBlock
      children={layoutAreas.map((name) => layoutItem(name))}
    />
  </div>
);
