import React from 'react';
import SmallPromoContainer from './container';

describe('SmallPromoContainer', () => {
  const mockHeadline = (<h1>mockHeadline</h1>);
  const mockImage = (<img href="mocklink.jpg" alt="mock image" />);

  it('renders with no image', () => {
    const result = SmallPromoContainer(mockHeadline, null, 'above');
    expect(result).toMatchSnapshot();
  });

  it('default to headline first dom structure by default', () => {
    const result = SmallPromoContainer(mockHeadline, mockImage);
    expect(result).toMatchSnapshot();
  });

  it('render headline first if image position is below', () => {
    const result = SmallPromoContainer(mockHeadline, mockImage, 'below');
    expect(result).toMatchSnapshot();
  });

  it('render image first if image position is on left', () => {
    const result = SmallPromoContainer(mockHeadline, mockImage, 'left');
    expect(result).toMatchSnapshot();
  });

  it('render image first if image position is above', () => {
    const result = SmallPromoContainer(mockHeadline, mockImage, 'above');
    expect(result).toMatchSnapshot();
  });
});
