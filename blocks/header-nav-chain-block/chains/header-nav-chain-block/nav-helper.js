import PropTypes from '@arc-fusion/prop-types';

export const PLACEMENT_AREAS = {
  NAV_BAR: 'nav-bar',
  SECTION_MENU: 'section-menu',
};

export const NAV_BREAKPOINTS = ['mobile', 'desktop'];
export const NAV_LABELS = {
  left: 'Left',
  right: 'Right',
  menu: 'Sections Menu',
};

export const WIDGET_OPTIONS = {
  none: 'None',
  search: 'Arc Search',
  queryly: 'Queryly Search',
  menu: 'Sections Menu',
  custom: 'Custom',
};

export const DEFAULT_SELECTIONS = {
  leftComponentDesktop1: 'search',
  leftComponentDesktop2: 'menu',
  leftComponentMobile1: 'menu',
  menuComponentMobile1: 'search',
};

export const WIDGET_CONFIG = {
  [PLACEMENT_AREAS.NAV_BAR]: {
    iconSize: 16,
    expandSearch: false,
    slotCounts: { mobile: 1, desktop: 2 },
    options: ['search', 'queryly', 'menu', 'none', 'custom'],
    sections: ['left', 'right'],
  },
  [PLACEMENT_AREAS.SECTION_MENU]: {
    iconSize: 21,
    expandSearch: true,
    slotCounts: { mobile: 2, desktop: 2 },
    options: ['search', 'queryly', 'none', 'custom'],
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
  labels: WIDGET_OPTIONS,
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
export const generateNavComponentPropTypes = () => {
  const navComponentPropTypes = {};
  Object.keys(WIDGET_CONFIG).forEach((cfgKey) => {
    const {
      sections, options, slotCounts,
    } = WIDGET_CONFIG[cfgKey];
    sections.forEach((navSection) => {
      NAV_BREAKPOINTS.forEach((navBreakpoint) => {
        for (let i = 1; i <= slotCounts[navBreakpoint]; i += 1) {
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

export const getNavWidgetType = (fieldKey, customFields) => (
  customFields[fieldKey] || getNavComponentDefaultSelection(fieldKey)
);

export const hasUserConfiguredNavItems = (customFields) => {
  let userHasConfigured = false;
  const {
    slotCounts,
    sections: navBarSections,
  } = WIDGET_CONFIG[PLACEMENT_AREAS.NAV_BAR];
  navBarSections.forEach((side) => {
    NAV_BREAKPOINTS.forEach((bpoint) => {
      for (let i = 1; i <= slotCounts[bpoint]; i += 1) {
        const cFieldKey = getNavComponentPropTypeKey(side, bpoint, i);
        const navWidgetType = getNavWidgetType(cFieldKey, customFields);
        const matchesDefault = navWidgetType !== getNavComponentDefaultSelection(cFieldKey);
        if (!userHasConfigured && matchesDefault) userHasConfigured = true;
      }
    });
  });
  return userHasConfigured;
};
