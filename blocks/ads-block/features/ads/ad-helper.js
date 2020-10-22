/* eslint-disable object-curly-newline */
import get from 'lodash.get';
import getProperties from 'fusion:properties';
import adMap from './ad-mapping';

const adUnitLog = {};

const logAdUnit = (adConfig) => {
  const { adType } = adConfig;
  if (!adUnitLog[adType]) {
    adUnitLog[adType] = [];
  }
  adUnitLog[adType].push(adConfig);
};

export const getBreakpoints = (arcSite) => {
  const siteProps = getProperties(arcSite);
  return get(siteProps, 'breakpoints');
};

export const getSizemapBreakpoints = ({ arcSite }) => {
  const breakpoints = getBreakpoints(arcSite);
  return !breakpoints ? [] : [
    [breakpoints.large, 0],
    [breakpoints.medium, 0],
    [breakpoints.small, 0],
  ];
};

export const getType = (globalContent = {}) => get(globalContent, 'type');

export const isContentPage = ({ globalContent } = {}) => {
  const type = getType(globalContent);
  return (type && (
    type === 'story'
    || type === 'gallery'
    || type === 'video'
  )) || false;
};

export const isSectionPage = ({ globalContent } = {}) => (
  get(globalContent, 'node_type', '') === 'section'
);

export const getAdName = ({ adType }) => (
  get(adMap, `${adType}.adName`)
);

export const getAdClass = ({ adType }) => (
  get(adMap, `${adType}.adClass`)
);

export const getDimensions = ({ adType }) => (
  get(adMap, `${adType}.dimensionsArray`)
);

export const getCategory = (sectionPath) => (
  sectionPath && sectionPath.split('/')[1]
);

export const getID = ({ globalContent } = {}) => (
  get(globalContent, '_id', undefined)
);

export const getTags = ({ globalContent } = {}) => (
  get(globalContent, 'taxonomy.tags', [])
    .map((tagObj) => get(tagObj, 'slug', null))
    .filter((tag) => tag)
    .join(',')
);

export const getPageType = (props) => {
  const metaValue = get(props, 'metaValue');
  return (metaValue && metaValue('page-type')) || '';
};

export const getAdPath = (props) => {
  const metaValue = get(props, 'metaValue');
  let adPath = (metaValue && metaValue('ad-path')) || '';
  if (adPath && adPath.charAt(0) === '/') {
    adPath = adPath.substring(1);
  }
  return adPath || undefined;
};

export const getPrimarySectionId = ({ globalContent, arcSite } = {}) => (
  get(globalContent, `websites[${arcSite}].website_section._id`, '')
);

export const formatSectionPath = (sectionPath) => {
  let fmtPath = '';
  if (sectionPath) {
    fmtPath = sectionPath.replace(/-/g, '_');
    const endIdx = fmtPath.length - 1;
    if (fmtPath.charAt(endIdx) === '/') {
      fmtPath = fmtPath.substring(0, endIdx);
    }
    if (fmtPath.charAt(0) !== '/') {
      fmtPath = `/${fmtPath}`;
    }
  }
  return fmtPath;
};

export const getSectionPath = (props) => {
  const pageType = getPageType(props);
  return (
    pageType === 'tag'
    || pageType === 'author'
    || pageType === 'search'
      ? pageType : (
        (isContentPage(props) && getPrimarySectionId(props))
        || (isSectionPage(props) && getID(props)) || ''
      )
  );
};

export const getSectionID = (props) => (
  formatSectionPath(getAdPath(props) || getSectionPath(props))
);

export const getSlotName = (props) => {
  const arcSite = get(props, 'arcSite');
  const { websiteAdPath = '' } = getProperties(arcSite);
  return `${websiteAdPath}${getSectionID(props)}`;
};

// istanbul ignore next
export const getPosition = ({ adType }) => (
  adUnitLog[adType] ? (adUnitLog[adType].length + 1) : 1
);

export const setPageTargeting = (props) => {
  window.googletag = window.googletag || {};
  window.googletag.cmd = window.googletag.cmd || [];
  window.googletag.cmd.push(() => {
    // istanbul ignore next
    window.googletag.pubads()
      .setTargeting('page_type', getPageType(props))
      .setTargeting('section_id', getSectionID(props));
    // istanbul ignore next
    if (isContentPage(props)) {
      window.googletag.pubads()
        .setTargeting('arc_id', getID(props))
        .setTargeting('tags', getTags(props));
    }
  });
};

export const getSlotTargeting = (props) => ({
  ad_type: get(props, 'adName'),
  pos: getPosition(props),
});

/* Expects a 'props' object containing feature props, FusionContext, AppContext */
export const getAdObject = (props) => {
  const rand = Math.floor(Math.random() * 10000);
  const adName = getAdName(props);
  const display = adName === 'right_rail_cube'
    ? 'desktop' : get(props, 'display', 'all');
  const adObj = {
    id: `arcad_${rand}`,
    slotName: getSlotName(props),
    adType: adName,
    adClass: getAdClass(props),
    dimensions: getDimensions(props),
    sizemap: {
      breakpoints: getSizemapBreakpoints(props),
      refresh: true,
    },
    targeting: getSlotTargeting({ ...props, adName }),
    display,
  };
  logAdUnit(adObj);
  return adObj;
};
