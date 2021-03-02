import getProperties from 'fusion:properties';

const constructHref = (websiteUrl, arcSite) => {
  const {
    websiteDomain,
  } = getProperties(arcSite);
  return (typeof window !== 'undefined' && window.location.hostname === 'localhost')
    ? `https://corecomponents-the-gazette-prod.cdn.arcpublishing.com/${websiteUrl}`
    : `${websiteDomain}/${websiteUrl}`;
};

const extractImage = (promo) => promo && promo.basic && promo.basic.type === 'image' && promo.basic.url;

const resolveDefaultPromoElements = (customFields = {}) => {
  const fields = {
    showHeadline: true,
    showImage: true,
    showDescription: true,
    showByline: true,
    showDate: true,
  };
  const fieldKeys = Object.keys(fields);
  return fieldKeys.reduce((acc, key) => {
    if (typeof customFields[key] === 'undefined') {
      acc[key] = fields[key];
    } else {
      acc[key] = customFields[key];
    }
    return acc;
  }, fields);
};

export { constructHref, extractImage, resolveDefaultPromoElements };
