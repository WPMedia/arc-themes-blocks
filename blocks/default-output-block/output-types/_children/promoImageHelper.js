import { resizerURL, resizerKey } from 'fusion:environment';

export const getImgURL = (metaValue, metaType = 'og:image', globalContent) => {
  const buildURL = (_url) => {
    if (typeof window === 'undefined') {
      // eslint-disable-line global-require,@typescript-eslint/no-var-requires
      const Thumbor = require('thumbor-lite');
      const thumbor = new Thumbor(resizerKey, resizerURL);
      let imgSrc = _url.replace(/^http[s]?:\/\//, '')
        .replace(' ', '%20');
      if (imgSrc.includes('?')) {
        imgSrc = imgSrc.replace('?', '%3F');
      }

      return thumbor.setImagePath(imgSrc)
        .resize(1200, 630)
        .buildUrl();
    }
    return null;
  };

  if (metaValue(metaType)) {
    return buildURL(metaValue(metaType));
  }

  if (globalContent.promo_items
    && globalContent.promo_items.basic
    && globalContent.promo_items.basic.url) {
    return buildURL(globalContent.promo_items.basic.url);
  }

  return '';
};

export const getImgAlt = (metaValue, metaType = 'og:image:alt', globalContent) => {
  if (metaValue(metaType)) {
    return metaValue(metaType);
  }

  if (globalContent.promo_items
    && globalContent.promo_items.basic
    && globalContent.promo_items.basic.alt_text) {
    if (globalContent.promo_items.basic.alt_text) {
      return globalContent.promo_items.basic.alt_text;
    }
  }

  return null;
};
