import PropTypes from 'prop-types';

export const NAV_COMPONENT_OPTIONS = ['search', 'menu', 'none', 'custom'];
export const NAV_SECTIONS = ['left', 'right'];
export const NAV_BREAKPOINTS = ['mobile', 'desktop'];
export const NAV_SLOT_COUNTS = { mobile: 1, desktop: 2 };
export const DEFAULT_SELECTIONS = {
  leftComponentDesktop1: 'search',
  leftComponentDesktop2: 'menu',
  leftComponentMobile1: 'menu',
};

export const capitalize = (string) => (
  !string ? string : [
    String(string).charAt(0).toUpperCase(),
    String(string).substring(1),
  ].join('')
);

export const getNavComponentLabel = (section, breakpoint, position) => (
  `${capitalize(section)} Component ${position} - ${capitalize(breakpoint)}`
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
  NAV_SECTIONS.forEach((navSection) => {
    NAV_BREAKPOINTS.forEach((navBreakpoint) => {
      // eslint-disable-next-line no-plusplus
      for (let i = 1; i <= NAV_SLOT_COUNTS[navBreakpoint]; i++) {
        navComponentPropTypes[
          getNavComponentPropTypeKey(navSection, navBreakpoint, i)
        ] = PropTypes.oneOf(NAV_COMPONENT_OPTIONS).tag(
          generateNavComponentPropType(navSection, navBreakpoint, i),
        );
        navComponentPropTypes[
          getNavComponentIndexPropTypeKey(navSection, navBreakpoint, i)
        ] = PropTypes.number.tag(
          generateNavComponentIndexPropType(navSection, navBreakpoint, i),
        );
      }
    });
  });
  return navComponentPropTypes;
};
