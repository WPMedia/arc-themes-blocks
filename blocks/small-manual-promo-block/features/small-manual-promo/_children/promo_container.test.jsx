import React from 'react';
import getPromoContainer from './promo_container';

describe('the promo container', () => {
  const mockHeadline = (<h1>mockHeadline</h1>);
  const mockImage = (<img href="mocklink.jpg" alt="mock image" />);
  const promoContainerStyle = {
    containerClass: 'mock-container-style-class',
    headlineClass: 'col-sm-xl-8',
    imageClass: 'col-sm-xl-4',
  };

  it('default to headline first dom structure by default', () => {
    const result = getPromoContainer(mockHeadline, mockImage, promoContainerStyle);
    expect(result).toMatchSnapshot();
  });

  it('render headline first if image position is right', () => {
    const result = getPromoContainer(mockHeadline, mockImage, promoContainerStyle, 'right');
    expect(result).toMatchSnapshot();
  });

  it('render headline first if image position is below', () => {
    const result = getPromoContainer(mockHeadline, mockImage, promoContainerStyle, 'below');
    expect(result).toMatchSnapshot();
  });

  it('render image first if image position is on left', () => {
    const result = getPromoContainer(mockHeadline, mockImage, promoContainerStyle, 'left');
    expect(result).toMatchSnapshot();
  });

  it('render image first if image position is above', () => {
    const result = getPromoContainer(mockHeadline, mockImage, promoContainerStyle, 'above');
    expect(result).toMatchSnapshot();
  });

  it('return empty dom value while no value pass in', () => {
    const result = getPromoContainer('', '', {}, 'above');
    expect(result).toMatchSnapshot();
  });
});
