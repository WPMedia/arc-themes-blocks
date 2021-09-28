const sizes = {
  XL: {
    options: [
      { kind: 'small', width: 400 },
      { kind: 'medium', width: 600 },
      { kind: 'large', width: 800 },
    ],
    defaultRatio: '4:3',
  },
  LG: {
    options: [
      { kind: 'small', width: 274 },
      { kind: 'medium', width: 274 },
      { kind: 'large', width: 377 },
    ],
    defaultRatio: '4:3',
  },
  MD: {
    options: [
      { kind: 'small', width: 274 },
      { kind: 'medium', width: 274 },
      { kind: 'large', width: 400 },
    ],
    defaultRatio: '16:9',
  },
  SM: {
    options: [
      { kind: 'small', width: 600 },
      { kind: 'medium', width: 800 },
      { kind: 'large', width: 600 },
    ],
    defaultRatio: '3:2',
  },
};
const ratios = {
  '4:3': 0.75,
  '3:2': 0.6668,
  '16:9': 0.5625,
};

/**
 * Helper to return the image sizes properties according to a ratio
 *
 * @param size Label to use to determine the size (XL, LG, MD, SM)
 * @param ratioValue Ratio to use for the calc
 *
 * @return an object with the sizes for each option
 */
const ratiosFor = (size, ratioValue) => {
  const validOptions = Object.keys(sizes);
  const imageSize = validOptions.some((e) => e === size) ? size : 'XL';
  const { options, defaultRatio } = sizes[imageSize];
  const ratio = ratios[ratioValue] || ratios[defaultRatio];

  return options.reduce((acc, ele) => {
    acc[`${ele.kind}Width`] = ele.width;
    acc[`${ele.kind}Height`] = Math.round(ele.width * ratio);
    return acc;
  }, {});
};

export default ratiosFor;
