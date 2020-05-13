import resizerImageBlock from '@wpmedia/resizer-image-block';

const params = {
  // has to be an external image
  raw_image_url: 'text',
};

// input: raw image url
// output: object with dimensions and image keys
const fetch = (query) => {
  const { raw_image_url: rawImageUrl, respect_aspect_ratio: respectAspectRatio = false } = query;

  // last param designates only url -- not data ans object
  return resizerImageBlock(rawImageUrl, 70, true, respectAspectRatio);
};

/*
not exposing api
http: false
If false, available to components during server-side rendering. Default is true
*/
export default {
  params,
  http: false,
  fetch,
};
