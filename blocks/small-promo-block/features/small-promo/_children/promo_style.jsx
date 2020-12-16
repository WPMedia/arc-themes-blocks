function getPromoStyle(position = 'right', element = 'container') {
  const imagePositionClassMapping = {
    right: {
      container: 'row',
      margin: 'image-right',
      headlineMargin: 'margin-md-right',
    },
    left: {
      container: 'row',
      margin: 'image-left',
      headlineMargin: 'margin-md-left',
    },
    above: {
      container: '',
      margin: ' image-above',
      headlineMargin: 'margin-md-top',
    },
    below: {
      container: '',
      margin: 'margin-sm-bottom image-below',
      headlineMargin: 'margin-md-bottom',
    },
  };
  const promoClasses = imagePositionClassMapping[position][element];
  return promoClasses;
}
export default getPromoStyle;
