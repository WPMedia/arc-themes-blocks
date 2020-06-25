import PropTypes from 'prop-types';

const imageRatioLabels = {
  '16:9': '16:9',
  '3:2': '3:2',
  '4:3': '4:3',
};

const imageRatiosKeys = Object.keys(imageRatioLabels);

/**
 * Helper to create imageRatio properties to be used on CustomFields
 *
 * @param element Base name of the element.
 * @param group Group to witch the element belong to
 * @param defaultValue Default value to use for this property
 *
 * @return A property object to be use on CustomFields
 */
export const imageRatioProps = (element, group, defaultValue) => {
  const elementTextProp = {
    [`${element}`]: PropTypes.oneOf(imageRatiosKeys).tag({
      labels: imageRatioLabels,
      name: 'Image ratio',
      defaultValue,
      group,
    }),
  };
  return { ...elementTextProp };
};

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
      { kind: 'small', width: 274 },
      { kind: 'medium', width: 274 },
      { kind: 'large', width: 400 },
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
 * @param ratioValue Ratio to use for the calc
 *
 * @return an object with all the sizes
 */
export const ratiosPropsFor = (size, ratioValue) => {
  const { options, defaultRatio } = sizes[size];
  const ratio = ratios[ratioValue] || ratios[defaultRatio];

  return options.reduce((acc, ele) => {
    acc[`${ele.kind}Width`] = ele.width;
    acc[`${ele.kind}Height`] = Math.round(ele.width * ratio);
    return acc;
  }, {});
};
