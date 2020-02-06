const params = {
  _id: 'text',
  from: 'text',
  size: 'text',
};

const resolve = (key = {}) => {
  const site = key['arc-site'];
  const { _id, from, size } = key;
  return `/content/v4/collections?_id=${_id}${site ? `&website=${site}` : ''}${from ? `&from=${from}` : ''}${size ? `&from=${size}` : ''}`;
};

export default {
  params,
  resolve,
};
