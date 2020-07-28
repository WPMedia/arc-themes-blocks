const resolve = (key = {}) => {
  const { 'arc-site': site } = key;

  return `content/v4/collections?content_alias=alert-bar${site ? `&website=${site}` : ''}&from=0&size=1&published=true`;
};

// when a collection as a unpublished elements, the content_elements has a
// reference to the data without being expanded, and need to be removed
export default {
  ttl: 120,
  resolve,
  transform: (data) => {
    const source = data;
    const elements = source.content_elements.reduce((acc, ele) => (
      (!ele.referent) ? acc.concat(ele) : acc
    ), []);
    source.content_elements = elements;
    return source;
  },
};
