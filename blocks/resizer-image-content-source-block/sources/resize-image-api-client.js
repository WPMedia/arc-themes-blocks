import { allowedImageDomains as ALLOWED_IMAGE_DOMAINS } from 'fusion:environment';
import getResizedImageData from '@wpmedia/resizer-image-block';

const ARCDomains = [
  'images.arcpublishing.com',
  's3.amazonaws.com/arc-authors/',
  'static.themebuilder.aws.arc.pub',
  'themebuilder-api-uploads-ap-northeast-1.s3.amazonaws.com',
  'themebuilder-api-uploads-eu-central-1.s3.amazonaws.com',
  'themebuilder-api-uploads-us-east-1.s3.amazonaws.com',
  'themebuilder-api-uploads.s3.amazonaws.com',
];

const params = {
  // has to be an external image
  raw_image_url: 'text',
};

const getAllowedDomains = () => {
  if (ALLOWED_IMAGE_DOMAINS) {
    return ARCDomains.concat(ALLOWED_IMAGE_DOMAINS.split(','));
  }
  return ARCDomains;
};

const getURL = (domain) => {
  try {
    return new URL(domain);
  } catch (e) {
    return '';
  }
};

const getDomainHostname = (domain) => {
  const itemURL = getURL(domain);

  if (itemURL === '') {
    return '';
  }

  return itemURL.hostname;
};

const isAnAllowedDomain = (imageUrl) => {
  const inputHost = getDomainHostname(imageUrl);

  if (inputHost === '') {
    return false;
  }

  const matcher = (domain) => {
    if (domain.indexOf('/') !== -1 && !getURL(domain).protocol) {
      // If a domain in the allowedDomains has a / but no protocol (http://)
      // check hostname and pathname together to see if they match this
      // mainly accounts for the author-service image URL that use a generic
      // s3 URL that doesn't allow us to just check hostname alone.
      const iUrl = getURL(imageUrl);
      const imageURLAndPath = `${iUrl.hostname}/${iUrl.pathname.split('/')[1]}/`;

      return domain === imageURLAndPath;
    }
    return inputHost.endsWith(domain) || inputHost === getDomainHostname(domain);
  };

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
