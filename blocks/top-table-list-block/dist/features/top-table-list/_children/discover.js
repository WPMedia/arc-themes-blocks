"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function discoverPromoType(content) {
  var _content$promo_items, _content$promo_items$;

  if (!content) {
    return undefined;
  }

  let promoType = '';

  switch (content.type) {
    case 'video':
      promoType = 'Video';
      break;

    case 'gallery':
      promoType = 'Gallery';
      break;

    default:
      // eslint-disable-next-line camelcase
      if ((_content$promo_items = content.promo_items) !== null && _content$promo_items !== void 0 && (_content$promo_items$ = _content$promo_items.lead_art) !== null && _content$promo_items$ !== void 0 && _content$promo_items$.type) {
        promoType = discoverPromoType(content.promo_items.lead_art);
      } else {
        promoType = 'other';
      }

  }

  return promoType;
}

var _default = discoverPromoType;
exports.default = _default;