import resizerImageBlock from '@wpmedia/resizer-image-block';

// named import doesn't seem to be working as expected
const { getResizerParams } = resizerImageBlock;

const params = {
  // has to be an external image
  raw_image_url: 'text',
};

// input: raw image url
// output: object with dimensions and image keys
const fetch = (query) => {
  const { raw_image_url: rawImageUrl } = query;

  return getResizerParams(rawImageUrl);
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
