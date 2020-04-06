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

export { constructHref, extractImage };
