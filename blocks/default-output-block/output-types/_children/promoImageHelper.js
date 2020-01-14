import { resizerURL, resizerKey } from 'fusion:environment';

export const getImgURL = (metaValue, metaType = 'og:image', globalContent) => {
  let gcUrl = null;
  const metaURL = metaValue(metaType);
  const buildURL = (_url) => {
    if (typeof window === 'undefined') {
      // eslint-disable-line global-require,@typescript-eslint/no-var-requires
      const Thumbor = require('thumbor-lite');
      const thumbor = new Thumbor(resizerKey, resizerURL);
      const imgSrc = _url.replace(/^http[s]?:\/\//, '')
        .replace(' ', '%20');
      if (imgSrc.includes('?')) imgSrc.replace('?', '%3F');

      return thumbor.setImagePath(imgSrc)
        .resize(1200, 630)
        .buildUrl();
    }
    return '';
  };

  if (metaURL) {
    return buildURL(metaURL);
  }

  if (globalContent.promo_items
    && globalContent.promo_items.basic
    && globalContent.promo_items.basic.url) {
    gcUrl = globalContent.promo_items.basic.url;
    return buildURL(gcUrl);
  }

  return '';
};

export const getImgAlt = (metaValue, metaType = 'og:image:alt', globalContent) => {
  let gcAlt = null;
  const metaAlt = metaValue(metaType);
  if (metaAlt) {
    return metaAlt;
  }

  if (globalContent.promo_items
    && globalContent.promo_items.basic
    && globalContent.promo_items.basic.alt_text) {
    gcAlt = globalContent.promo_items.basic.alt_text;
  }

  if (gcAlt) {
    return gcAlt;
  }

  return '';
};
