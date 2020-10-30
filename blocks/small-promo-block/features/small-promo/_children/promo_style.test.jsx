import getPromoStyle from './promo_style';

describe('return class name based on the image position', () => {
  it('default to right row element if no params pass in', () => {
    const result = getPromoStyle();
    expect(result).toEqual('row');
  });
});
