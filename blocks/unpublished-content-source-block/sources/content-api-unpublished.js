export default {
  resolve({ _id, 'arc-site': arcSite }) {
    return `content/v4?_id=${_id}&website=${arcSite}&published=false`;
  },
  params: {
    _id: 'text',
  },
};
