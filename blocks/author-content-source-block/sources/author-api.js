export default {
  resolve({ slug }) {
    return `/author/v2/author-service?slug=${slug}`;
  },
  params: {
    slug: 'text',
  },
};
