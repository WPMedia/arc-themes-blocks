function SmallPromoStyles(position = 'above', element = 'headlineMargin') {
  const imagePositionClassMapping = {
    above: {
      headlineMargin: 'margin-md-top',
    },
    below: {
      headlineMargin: 'margin-md-bottom',
    },
  };
  const promoClasses = imagePositionClassMapping?.[position]?.[element] || '';
  return promoClasses;
}
export default SmallPromoStyles;
