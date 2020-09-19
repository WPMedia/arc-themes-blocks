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

export const getSizemapBreakpoints = () => {
  const breakpoints = {
    mobile: 0,
    tablet: 768,
    desktop: 992,
  };

  return [
    [breakpoints.desktop, 0],
    [breakpoints.tablet, 0],
    [breakpoints.mobile, 0],
  ];
};

export const getType = (globalContent = {}) => get(globalContent, 'type');

export const isContentPage = (globalContent) => {
  const type = get(globalContent, 'type');
  return (type && (
    type === 'story'
    || type === 'gallery'
    || type === 'video'
  )) || false;
};

export const getAdName = (adType) => get(adMap, `${adType}.adName`);

export const getAdClass = (adType) => get(adMap, `${adType}.adClass`);

export const getDimensions = (adType) => get(adMap, `${adType}.dimensionsArray`);

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
  }
  return fmtPath;
};

export const getSectionPath = (globalContent) => (
  formatSectionPath(
    (isContentPage(globalContent) && (
      getPrimarySectionId(globalContent) || getPrimarySiteId(globalContent)
    )) || getID(globalContent),
  )
);

export const getSlotName = (props) => {
  const sectionPath = get(props, 'sectionPath', '');
  const arcSite = get(props, 'arcSite');
  const { websiteAdPath } = getProperties(arcSite);
  return `${websiteAdPath || ''}${sectionPath || ''}`;
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
      .setTargeting('section_id', getSectionPath(globalContent));
    if (isContentPage(globalContent)) {
      window.googletag.pubads()
        .setTargeting('arc_id', getID(globalContent))
        .setTargeting('tags', getTags(globalContent));
    }
  });
};

export const getPageTargeting = (props) => ({
  ad_type: get(props, 'adType'),
  pos: getPosition(props),
});

export const getAdObject = (props) => {
  const {
    adType: type,
    display: displayProp,
    globalContent,
  } = props;
  const rand = Math.floor(Math.random() * 10000);
  const adType = getAdName(get(props, 'adType'));
  const display = adType === 'right_rail_cube' ? 'desktop' : displayProp;
  const adObj = {
    id: `arcad_${rand}`,
    slotName: getSlotName({
      ...props,
      sectionPath: getSectionPath(globalContent),
    }),
    adType,
    adClass: getAdClass(type),
    dimensions: getDimensions(type),
    sizemap: {
      breakpoints: getSizemapBreakpoints(),
      refresh: true,
    },
    targeting: getPageTargeting({ ...props, adType }),
    display,
  };
  logAdUnit(adObj);
  return adObj;
};
