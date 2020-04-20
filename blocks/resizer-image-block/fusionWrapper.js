import getProperties from 'fusion:properties';
import { resizerURL as RESIZER_URL, resizerKey as RESIZER_SECRET_KEY } from 'fusion:environment';
import getResizedImageData from './helpers';
// take in properties, env variables
// if no properties found
// then return data back without changing it
const fusionWrapper = (data) => {
  const { breakpoints, imageWidths } = getProperties();

  if (
    typeof breakpoints === 'undefined'
    || typeof imageWidths === 'undefined'
    || typeof RESIZER_URL === 'undefined'
    || typeof RESIZER_SECRET_KEY === 'undefined'
  ) {
    return data;
  }

  const filterQuality = 70;

  return getResizedImageData(data, {
    resizerSecret: RESIZER_SECRET_KEY,
    resizerUrl: RESIZER_URL,
    breakpoints,
    imageWidths,
  }, filterQuality);
};

export default fusionWrapper;
