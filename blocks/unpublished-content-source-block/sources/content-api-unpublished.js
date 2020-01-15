export default {
  resolve({ _id, website }) {
    return `content/v4?_id=${_id}&website=${website}&published=false`;
  },
  params: {
    _id: 'text',
    website: 'text',
  },
};
