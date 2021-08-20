/* eslint-disable react/no-children-prop */
import React from 'react';
import RightRailAdvancedLayout from './layouts/right-rail-advanced/default';

export default {
  title: 'Layouts/Right Rail Advanced',
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
  fullWidth1: {
    height: '200px',
  },
  'main-1': {
    height: '200px',
  },
  'main-2': {
    height: '200px',
  },
  'rightrail-top': {
    minHeight: '150px',
    textAlign: 'left',
  },
  'rightrail-middle': {
    minHeight: '75px',
    textAlign: 'left',
  },
  'rightrail-bottom': {
    minHeight: '150px',
    textAlign: 'left',
  },
  fullWidth2: {
    height: '200px',
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

const renderChildren = (name) => layoutItemStyles[name]?.children || null;

const layoutItem = (name) => (
  <div style={getStyles(name)}>
    {name}
    {renderChildren(name)}
  </div>
);

const layoutAreas = ['navigation', 'fullwidth1', 'main-1', 'main-2', 'rightrail-top', 'rightrail-middle', 'rightrail-bottom', 'fullwidth2', 'footer'];

export const basic = () => (
  <div id="fusion-app" className="layout-section">
    <RightRailAdvancedLayout
      children={layoutAreas.map((name) => layoutItem(name))}
    />
  </div>
);
