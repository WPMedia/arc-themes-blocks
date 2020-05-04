import { getResizerParams } from '@wpmedia/resizer-image-block';

const params = {
  raw_image_url: 'text',
};

// input: raw image url

/*
don't need the whole data object
currently a lot of unnec data is being passed into the resizer
  return resizer.getResizerParams(image.url);


*/

// output: object with dimensions and image keys

const fetch = (query) => {
  const { raw_image_url: rawImageUrl } = query;

  return getResizerParams(rawImageUrl);
};

export default {
  params,
  /*
  not exposing api
  If false, available to components during server-side rendering. Default is true
  */
  http: false,
  fetch,
};
