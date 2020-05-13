import getResizedImageData from '@wpmedia/resizer-image-block';

export default {
  resolve({ slug }) {
    return `/author/v2/author-service?slug=${slug}`;
  },
  params: {
    slug: 'text',
  },
  transform: (data) => {
    const authors = data.authors.map((authorObject) => ({
      ...authorObject,
      resized_params: getResizedImageData(authorObject.image, 70, true),
    }));

    return ({
      ...data,
      authors,
    });
  },
};
