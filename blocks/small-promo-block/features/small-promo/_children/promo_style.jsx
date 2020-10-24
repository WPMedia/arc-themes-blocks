function getPromoStyle(position = 'right', element = 'container') {
  const imagePositionClassMapping = {
    right: {
      container: 'row',
      margin: '',
      headlineMargin: '',
    },
    left: {
      container: 'row',
      margin: '',
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
      headlineMargin: '',
    },
  };
  const promoClasses = imagePositionClassMapping[position][element];
  return promoClasses;
}
export default getPromoStyle;
