import PropTypes from 'prop-types';

export const NAV_BREAKPOINTS = ['mobile', 'desktop'];
export const NAV_LABELS = {
  left: 'Left',
  right: 'Right',
  menu: 'Sections Menu',
};

export const DEFAULT_SELECTIONS = {
  leftComponentDesktop1: 'search',
  leftComponentDesktop2: 'menu',
  leftComponentMobile1: 'menu',
  menuComponentMobile1: 'search',
};

export const WIDGET_CONFIG = {
  'nav-bar': {
    iconSize: 16,
    expandSearch: false,
    slotCounts: { mobile: 1, desktop: 2 },
    options: ['search', 'menu', 'none', 'custom'],
    sections: ['left', 'right'],
  },
  'section-menu': {
    iconSize: 21,
    expandSearch: true,
    slotCounts: { mobile: 2, desktop: 2 },
    options: ['search', 'none', 'custom'],
    sections: ['menu'],
  },
};

export const capitalize = (string) => (
  !string ? string : [
    String(string).charAt(0).toUpperCase(),
    String(string).substring(1),
  ].join('')
);

export const getNavComponentLabel = (section, breakpoint, position) => (
  `${NAV_LABELS[section]} Component ${position} - ${capitalize(breakpoint)}`
);

export const getNavComponentPropTypeKey = (section, breakpoint, position) => (
  `${section}Component${capitalize(breakpoint)}${position}`
);

export const getNavComponentIndexPropTypeKey = (section, breakpoint, position) => (
  `${section}ComponentCustomIndex${capitalize(breakpoint)}${position}`
);

export const getNavComponentDefaultSelection = (propTypeKey) => (
  (propTypeKey && DEFAULT_SELECTIONS[propTypeKey]) || 'none'
);

export const generateNavComponentPropType = (section, breakpoint, position) => ({
  name: getNavComponentLabel(section, breakpoint, position),
  group: `${capitalize(breakpoint)} Components`,
  labels: {
    search: 'Search',
    menu: 'Sections Menu',
    none: 'None',
    custom: 'Custom',
  },
  defaultValue: getNavComponentDefaultSelection(
    getNavComponentPropTypeKey(section, breakpoint, position),
  ),
  required: false,
  hidden: false,
});

export const generateNavComponentIndexPropType = (section, breakpoint, position) => ({
  name: `If custom, position of ${getNavComponentLabel(section, breakpoint, position)}`,
  group: `${capitalize(breakpoint)} Components`,
  required: false,
  hidden: false,
});

// istanbul ignore next
// eslint-disable-next-line import/prefer-default-export
export const generateNavComponentPropTypes = () => {
  const navComponentPropTypes = {};
  Object.keys(WIDGET_CONFIG).forEach((cfgKey) => {
    const cfg = WIDGET_CONFIG[cfgKey];
    const { sections, options, slotCounts } = cfg;
    sections.forEach((navSection) => {
      NAV_BREAKPOINTS.forEach((navBreakpoint) => {
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i <= slotCounts[navBreakpoint]; i++) {
          const itemSelectionKey = getNavComponentPropTypeKey(navSection, navBreakpoint, i);
          const itemIndexKey = getNavComponentIndexPropTypeKey(navSection, navBreakpoint, i);
          navComponentPropTypes[itemSelectionKey] = PropTypes.oneOf(options).tag(
            generateNavComponentPropType(navSection, navBreakpoint, i),
          );
          navComponentPropTypes[itemIndexKey] = PropTypes.number.tag(
            generateNavComponentIndexPropType(navSection, navBreakpoint, i),
          );
        }
      });
    });
  });
  return navComponentPropTypes;
};
