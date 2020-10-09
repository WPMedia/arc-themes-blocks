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
}

export const getSizemapBreakpoints = ({ arcSite }) => {
  const breakpoints = getBreakpoints(arcSite);
  return !breakpoints ? [] : [
    [breakpoints.large, 0],
    [breakpoints.medium, 0],
    [breakpoints.small, 0],
  ];
};

export const getType = (globalContent = {}) => get(globalContent, 'type');

export const isContentPage = (globalContent) => {
  const type = getType(globalContent);
  return (type && (
    type === 'story'
    || type === 'gallery'
    || type === 'video'
  )) || false;
};

export const isSectionPage = (globalContent) => (
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

export const getCategory = (sectionPath) => sectionPath && sectionPath.split('/')[1];

export const getID = (globalContent = {}) => (
  get(globalContent, '_id', undefined)
);

export const getTags = (globalContent) => (
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

export const getPrimarySectionId = (globalContent) => {
  const basePath = 'taxonomy.sections[0]';
  return get(globalContent, `${basePath}.referent.id`)
    || get(globalContent, `${basePath}._id`);
};

export const getPrimarySiteId = (globalContent) => {
  const basePath = 'taxonomy.sites[0]';
  return get(globalContent, `${basePath}.referent.id`)
    || get(globalContent, `${basePath}._id`);
};

export const formatSectionPath = (sectionPath) => {
  let fmtPath = '';
  if (sectionPath) {
    fmtPath = sectionPath.replace('-', '_');
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
  const globalContent = get(props, 'globalContent');
  return formatSectionPath(
    (isContentPage(globalContent) && (
      getPrimarySectionId(globalContent) || getPrimarySiteId(globalContent)
    )) || (isSectionPage(globalContent) && getID(globalContent)) || '',
  );
};

// TODO: Set default slot name logic for 'tag', 'author' and 'search' pages
export const getSlotName = (props) => {
  const arcSite = get(props, 'arcSite');
  const { websiteAdPath } = getProperties(arcSite);
  return getAdPath(props) || `${websiteAdPath || ''}${getSectionPath(props) || ''}`;
};

export const getPosition = ({ adType }) => (
  adUnitLog[adType] ? (adUnitLog[adType].length + 1) : 1
);

export const setPageTargeting = (props) => {
  const globalContent = get(props, 'globalContent');
  window.googletag = window.googletag || {};
  window.googletag.cmd = window.googletag.cmd || [];
  window.googletag.cmd.push(() => {
    window.googletag.pubads()
      .setTargeting('page_type', getPageType(props))
      .setTargeting('section_id', getSectionPath(props));
    if (isContentPage(globalContent)) {
      window.googletag.pubads()
        .setTargeting('arc_id', getID(globalContent))
        .setTargeting('tags', getTags(globalContent));
    }
  });
};

export const getSlotTargeting = (props) => ({
  ad_type: get(props, 'adName'),
  pos: getPosition(props),
});

/* Expects a 'props' object containing feature props, FusionContext, AppContext */
export const getAdObject = (props) => {
  console.log('ad-helper:getBreakpoints(): ', getBreakpoints(props.arcSite));
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
