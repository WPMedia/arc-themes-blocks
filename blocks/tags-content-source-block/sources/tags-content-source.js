export default {
  resolve({ slug }) {
    return `/tags/v2/slugs?slugs=${slug}`;
  },
  params: {
    slug: 'text',
  },
};
