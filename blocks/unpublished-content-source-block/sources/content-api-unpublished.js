export default {
  resolve(contentOptions) {
    const { _id, 'arc-site': arcSite } = contentOptions;
    return `content/v4?_id=${_id}&website=${arcSite}&published=false`;
  },
  params: {
    _id: 'text',
  },
};
