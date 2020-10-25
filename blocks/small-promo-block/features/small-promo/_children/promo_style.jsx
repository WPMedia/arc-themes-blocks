function getPromoStyle(position = 'right', element = 'container') {
  const imagePositionClassMapping = {
    right: {
      container: 'row',
      margin: 'image-right',
      headlineMargin: '',
    },
    left: {
      container: 'row',
      margin: 'image-left',
      headlineMargin: 'margin-sm-left',
    },
    above: {
      container: '',
      margin: ' image-above margin-sm-top margin-sm-bottom',
      headlineMargin: '',
    },
    below: {
      container: '',
      margin: 'image-below',
      headlineMargin: '',
    },
  };
  const promoClasses = imagePositionClassMapping[position][element];
  return promoClasses;
}
export default getPromoStyle;
