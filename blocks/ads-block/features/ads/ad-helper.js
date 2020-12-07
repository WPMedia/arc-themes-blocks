/* eslint-disable object-curly-newline */
import getProperties from 'fusion:properties';
import adMap from './ad-mapping';

export const getBreakpoints = (arcSite) => {
  const siteProps = getProperties(arcSite);
  return siteProps?.breakpoints;
};

export const getSizemapBreakpoints = ({ arcSite }) => {
  const breakpoints = getBreakpoints(arcSite);
  return !breakpoints ? [] : [
    [breakpoints.large, 0],
    [breakpoints.medium, 0],
    [breakpoints.small, 0],
  ];
};

export const getType = (globalContent = {}) => globalContent?.type;

export const isContentPage = ({ globalContent } = {}) => {
  const type = getType(globalContent);
  return (type && (
    type === 'story'
    || type === 'gallery'
    || type === 'video'
  )) || false;
};

export const isSectionPage = ({ globalContent } = {}) => (
  (globalContent?.node_type || '') === 'section'
);

export const getAdName = ({ adType }) => (
  adMap[adType]?.adName
);

export const getAdClass = ({ adType }) => (
  adMap[adType]?.adClass
);

export const getDimensions = ({ adType }) => (
  adMap[adType]?.dimensionsArray
);

export const getCategory = (sectionPath) => (
  sectionPath && sectionPath.split('/')[1]
);

export const getID = ({ globalContent } = {}) => (
  globalContent?._id
);

export const getTags = ({ globalContent } = {}) => (
  (globalContent?.taxonomy?.tags || [])
    .map((tagObj) => (tagObj?.slug || null))
    .filter((tag) => tag)
    .join(',')
);

export const getPageType = (props = {}) => {
  const { metaValue } = props;
  return (metaValue && metaValue('page-type')) || '';
};

export const getAdPath = (props) => {
  const { metaValue } = props;
  let adPath = (metaValue && metaValue('ad-path')) || '';
  if (adPath && adPath.charAt(0) === '/') {
    adPath = adPath.substring(1);
  }
  return adPath || undefined;
};

export const getPrimarySectionId = ({ globalContent, arcSite } = {}) => (
  globalContent?.websites[arcSite]?.website_section?._id || ''
);

export const formatSectionPath = (sectionPath) => {
  let fmtPath = '';
  if (sectionPath) {
    fmtPath = sectionPath.replace(/-/g, '_');
    const endIdx = fmtPath.length - 1;
    if (fmtPath.charAt(endIdx) === '/') {
      fmtPath = fmtPath.substring(0, endIdx);
    }
    fmtPath = fmtPath.replace(/\//, '');
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

export const getSlotName = (props = {}) => {
  const { arcSite = '' } = props;
  const { websiteAdPath = '' } = getProperties(arcSite);
  console.log('websiteAdPath', websiteAdPath);
  console.log('section id', getSectionID(props));
  if (websiteAdPath) {
    return `${websiteAdPath}/${getSectionID(props)}`;
  }
  return getSectionID(props);
};

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
  ad_type: props?.adType,
});

/* Expects a 'props' object containing feature props, FusionContext, AppContext */
export const getAdObject = (props) => {
  const { instanceId = '' } = props;
  const adName = getAdName(props);
  const display = adName === 'right_rail_cube'
    ? 'desktop' : (props?.display || 'all');
  const adObj = {
    id: `arcad_${instanceId}`,
    slotName: getSlotName(props),
    adType: adName,
    adClass: getAdClass(props),
    dimensions: getDimensions(props),
    sizemap: {
      breakpoints: getSizemapBreakpoints(props),
      refresh: true,
    },
    display,
  };
  adObj.targeting = getSlotTargeting(adObj);
  return adObj;
};
