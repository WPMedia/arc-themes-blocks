function getPromoStyle(position = 'right', element = 'container') {
  const imagePositionClassMapping = {
    right: {
      container: 'row',
      margin: 'sm-promo-padding-btm',
      headlineMargin: '',
    },
    left: {
      container: 'row',
      margin: 'sm-promo-padding-btm',
      headlineMargin: 'margin-sm-left',
    },
    above: {
      container: '',
      margin: ' margin-sm-top margin-sm-bottom',
      headlineMargin: '',
    },
    below: {
      container: '',
      margin: '',
      headlineMargin: 'margin-sm-bottom',
    },
  };
  const promoClasses = imagePositionClassMapping[position][element];
  return promoClasses;
}
export default getPromoStyle;
