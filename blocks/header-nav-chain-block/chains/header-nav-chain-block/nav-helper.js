import PropTypes from 'prop-types';

const NAV_COMPONENT_OPTIONS = ['search', 'menu', 'none', 'custom'];
const NAV_SECTIONS = ['left', 'right'];
const NAV_BREAKPOINTS = ['mobile', 'desktop'];
const NAV_SLOT_COUNTS = { mobile: 1, desktop: 2 };
const DEFAULT_SELECTIONS = {
  leftComponentDesktop1: 'search',
  leftComponentDesktop2: 'menu',
  leftComponentMobile1: 'menu',
};

const capitalize = (string) => (
  !string ? string : [
    String(string).charAt(0).toUpperCase(),
    String(string).substring(1),
  ].join('')
);

const getNavComponentLabel = (section, breakpoint, position) => (
  `${capitalize(section)} Component ${position} - ${capitalize(breakpoint)}`
);

const getNavComponentPropTypeKey = (section, breakpoint, position) => (
  `${section}Component${capitalize(breakpoint)}${position}`
);

const getNavComponentIndexPropTypeKey = (section, breakpoint, position) => (
  `${section}ComponentCustomIndex${capitalize(breakpoint)}${position}`
);

const getNavComponentDefaultSelection = (propTypeKey) => (
  (propTypeKey && DEFAULT_SELECTIONS[propTypeKey]) || 'none'
);

const generateNavComponentPropType = (section, breakpoint, position) => ({
  name: getNavComponentLabel(section, breakpoint, position),
  group: `${capitalize(breakpoint)} Components`,
  labels: {
    search: 'Search',
    menu: 'Site Menu',
    none: 'None',
    custom: 'Custom',
  },
  defaultValue: getNavComponentDefaultSelection(
    getNavComponentPropTypeKey(section, breakpoint, position),
  ),
  required: false,
  hidden: false,
});

const generateNavComponentIndexPropType = (section, breakpoint, position) => ({
  name: `If custom, position of ${getNavComponentLabel(section, breakpoint, position)}`,
  group: `${capitalize(breakpoint)} Components`,
  required: false,
  hidden: false,
});

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

export const generateNavComponentMap = (navComponentProps) => {
  const navComponentMap = {};
  NAV_SECTIONS.forEach((navSection) => {
    navComponentMap[navSection] = {};
    NAV_BREAKPOINTS.forEach((navBreakpoint) => {
      navComponentMap[navSection][navBreakpoint] = [];
      let userHasMadeSelection = false;
      const navComponentKeys = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 1; i <= NAV_SLOT_COUNTS[navBreakpoint]; i++) {
        const customFieldKey = getNavComponentPropTypeKey(navSection, navBreakpoint, i);
        const customFieldIndexKey = getNavComponentIndexPropTypeKey(navSection, navBreakpoint, i);
        const customFieldValue = navComponentProps[customFieldKey];
        const customFieldIndexValue = navComponentProps[customFieldIndexKey];
        if (customFieldValue !== getNavComponentDefaultSelection(customFieldKey)) {
          userHasMadeSelection = true;
        }
        let navComponentKey = customFieldValue;
        if (navComponentKey === 'custom' && customFieldIndexValue) {
          navComponentKey = `${navComponentKey}_${customFieldIndexValue}`;
        }
        navComponentKeys.push(navComponentKey);
      }

      const { useSignInButton = false } = navComponentProps;
      if (navSection === 'right' && !userHasMadeSelection && !!useSignInButton) {
        navComponentMap[navSection][navBreakpoint].push('signin');
      } else {
        navComponentKeys.forEach((currKey) => {
          navComponentMap[navSection][navBreakpoint].push(currKey);
        });
      }
    });
  });
  return navComponentMap;
};
