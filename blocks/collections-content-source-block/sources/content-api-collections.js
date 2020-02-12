const params = {
  _id: 'text',
  content_alias: 'text',
  from: 'text',
  size: 'text',
};

const resolve = (key = {}) => {
  const {
    'arc-site': site,
    _id,
    content_alias: contentAlias,
    from,
    size,
  } = key;
  return `content/v4/collections?${_id ? `_id=${_id}` : `content_alias=${contentAlias}`}${site ? `&website=${site}` : ''}${from ? `&from=${from}` : ''}${size ? `&size=${size}` : ''}&published=true`;
};

export default {
  params,
  resolve,
};
