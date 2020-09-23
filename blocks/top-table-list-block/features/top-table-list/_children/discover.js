function discoverPromoType(content) {
  if (!content) {
    return undefined;
  }

  let rc = '';

  switch (content.type) {
    case 'video':
      rc = 'Video';
      break;
    case 'gallery':
      rc = 'Gallery';
      break;
    default:
      // eslint-disable-next-line camelcase
      if (content.promo_items?.lead_art?.type) {
        rc = discoverPromoType(content.promo_items.lead_art);
      } else {
        rc = 'other';
      }
  }

  return rc;
}

export default discoverPromoType;
