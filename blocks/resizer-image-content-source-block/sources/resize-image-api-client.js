import { allowedImageDomains as ALLOWED_IMAGE_DOMAINS } from 'fusion:environment';
import getResizedImageData from '@wpmedia/resizer-image-block';

const ARCDomain = ['images.arcpublishing.com'];

const params = {
  // has to be an external image
  raw_image_url: 'text',
};

const getAllowedDomains = () => {
  if (ALLOWED_IMAGE_DOMAINS) {
    return ARCDomain.concat(ALLOWED_IMAGE_DOMAINS.split(','));
  }
  return ARCDomain;
};

const getDomainHostname = (domain) => {
  try {
    return new URL(domain).hostname;
  } catch (e) {
    return '';
  }
};

const isAnAllowedDomain = (imageUrl) => {
  const inputHost = getDomainHostname(imageUrl);

  if (inputHost === '') {
    return false;
  }

  const matcher = (domain) => inputHost.endsWith(domain) || inputHost === getDomainHostname(domain);

  return getAllowedDomains().some(matcher);
};

// input: raw image url
// output: object with dimensions and image keys
const fetch = (query) => {
  const {
    raw_image_url: rawImageUrl,
    respect_aspect_ratio: respectAspectRatio = false,
  } = query;

  if (!isAnAllowedDomain(rawImageUrl)) {
    return {};
  }

  // last param designates only url -- not data ans object
  return getResizedImageData(
    rawImageUrl,
    null,
    true,
    respectAspectRatio,
    query['arc-site'],
  );
};

export default {
  params,
  fetch,
};
